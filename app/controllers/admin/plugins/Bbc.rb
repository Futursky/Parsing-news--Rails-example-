require 'open-uri'
require 'rubygems'
require 'digest/md5'
require 'feedzirra'
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
    @rss = Feedzirra::Feed.fetch_and_parse(feed.url)
    @doc = Nokogiri::HTML(open(@article_url))
    
    self
  end

  def parseTitle
    @article.title = @doc.css('h1.story-header').text
    self
    
  end

  def parseUrl
    @article_url = @rss.entries.first.url
    self
  end

  def parseImage
      if @doc.css('div.story-body img')[0]
         image = @doc.css('div.story-body img')[0][:src]
      else
         image = ""
      end
         @article.image = image
      self
  end
  
  def parseContent
        paragraph = @doc.css("div.warning p")
        paragraph.remove if paragraph
     if  @doc.css('div.story-body p')
          content = @doc.css('div.story-body p')
     else 
          content = ""
     end  
     @article.content = content.to_html
     self
  end
  
  def parseCreateTime
   create_time = @doc.css("span.date").text 
   @article.create_time = create_time
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

class Admin::BbcPlugin < Admin::ParserPlugin

     def load(feed)
        @all_articles = []
        rss = Feedzirra::Feed.fetch_and_parse(feed.url)    
     def getUrl(entry)
         url = entry.url
     end
      rss.entries.each do |entry|
      
          @all_articles << Admin::ArticleParser.new(feed, getUrl(entry)).parseArticle()

     end

      @all_articles
     end

end

Admin::BbcPlugin.createPlugin