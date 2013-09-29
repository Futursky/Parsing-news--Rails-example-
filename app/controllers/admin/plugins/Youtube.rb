require 'open-uri'
require 'rubygems'
require 'digest/md5'
require 'nokogiri'

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
    @doc = Nokogiri::HTML(open(article_url))
    self
  end

  def parseTitle
    @article.title = @doc.css("span#eow-title")[0].text
    self
  end

  def parseImage
    image_url = 'http://img.youtube.com/vi/' + @article.url.split('=')[-1] + '/0.jpg'
    @article.image = image_url
    self
  end

  def parseContent
    content_video = '<div class="video-wrapper"><div class="video"><iframe width="800" height="450" align="middle" src="http://www.youtube.com/embed/' + @article.url.split('=')[-1] + '?rel=0" frameborder="0" allowfullscreen></iframe></div></div>'
    content_desc = @doc.css("div#watch-description-text p")
    content_desc = content_desc.to_html
    @article.content = content_video + content_desc 
    self
  end

  def parseHash
    @article.hash_code = Digest::MD5.hexdigest(@article.title.to_s)  
    self
  end

  def parseArticle
    parseTitle().parseImage().parseContent().parseHash()
    @article
  end
end

class Admin::YoutubePlugin < Admin::ParserPlugin

  def load(feed)
    @all_articles = []
    #url = "http://youtube.com/user/RubyOnRailsVideos/videos/"
    doc = Nokogiri::HTML(open(feed.url))
      doc.css(".channels-content-item").each do |post|
        begin 
          article_page_url = "http://youtube.com" + post.at_css("a")['href']           
          @all_articles << Admin::ArticleParser.new(feed, article_page_url).parseArticle()        
        rescue
        end
      end
    @all_articles
  end
end 

Admin::YoutubePlugin.createPlugin  