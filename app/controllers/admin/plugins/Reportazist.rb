require 'open-uri'
require 'rubygems'
require 'nokogiri'
require 'digest/md5'

class Admin::ArticleParser
  private
  @article 
  @feed
  @article_url

  public
  def initialize(feed, article_url)
    @article = Article.new()
    @article.feed_id = feed.id
    @article.url = article_url
    @feed = feed
    @article_url = article_url
    @doc = Nokogiri::HTML(open(@article_url))
    self
  end

  def parseTitle
    @article.title = @doc.css("div.post h1")[0].text
    self
  end

  def parseImage
    @article.image = @doc.css("div.wp-post-image-cont img")[0][:src]
    self
  end

  def parseContent
    content = @doc.css("div.entry p")
    @article.content = content.to_html
    self
  end

  def parseCreateTime
    @article.create_time = @doc.css("span.date").text
    self
  end

  def parseHash
    @article.hash_code = Digest::MD5.hexdigest(@article.title.to_s + @article.content.to_s)
    self
  end

  def parseArticle
    parseTitle().parseImage().parseContent().parseCreateTime().parseHash()
    @article
  end
end

class Admin::ReportazistPlugin < Admin::ParserPlugin
  

  def load(feed)
    @all_articles = []
    #url = "http://reportazhyst.com/"
    current_page = 1    

    while current_page <= 2
      reportazist_url = feed.url + "/page/" + "#{current_page}" + "/?s=+"
      doc = Nokogiri::HTML(open(reportazist_url))
      doc.css(".archiveposts").each do |post|           
        begin
          article_page_url = post.at_css("a")['href']       
          @all_articles << Admin::ArticleParser.new(feed, article_page_url).parseArticle()   
        rescue        
        end
      end
      current_page += 1
    end          
    @all_articles
  end
end 

Admin::ReportazistPlugin.createPlugin