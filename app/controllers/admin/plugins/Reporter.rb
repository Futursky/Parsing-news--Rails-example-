#coding: utf-8
  require 'time'
  require 'open-uri'
  require 'rubygems'
  require 'nokogiri'
  require 'digest/md5'
class Admin::ArticleParse
  private
  @article 
  @feed
  @url_domen

  public
  def initialize(feed, article_url, url_domen)
    @article = Article.new()
    @article.feed_id = feed.id
    @article.url = article_url
    @doc = Nokogiri::HTML(open(article_url))
    @url_domen = url_domen
    self
  end

  def parseTitle
    title = @doc.css("div.nodecontent h1.title")[0].text 
    title ? @article.title = title : @article.title = "" 
    self
  end

  def parseImage
    image_url = @url_domen + @doc.css("div.mainpic img")[0][:src].to_s
    image_url ? @article.image = image_url : @article.image = "" 
    self
  end

  def parseContent
    content = @doc.css("div.nodecontent div.content")[0].text  
    content ? @article.content = content : @article.content = "" 
    self
  end

  def parseCreateTime
    @article.create_time = @doc.css("span.time").text.to_time               
    self    
  end

  def parseHash
    @article.hash_code = Digest::MD5.hexdigest(@article.content.to_s)
    self
  end

  def parseArticle
    parseTitle().parseImage().parseContent().parseCreateTime().parseHash()
    @article
  end

end

class Admin::ReporterPlugin < Admin::ParserPlugin
  
  def getURLDomain(url)
    url_domen = url.match(/((http:\/\/|ftp:\/\/)?([a-z0-9\-\.]+)?[a-z0-9\-]+(!?\.[a-z]{2,4}))/)[0]
    return url_domen
  end 

  def getDoc(url)
   return Nokogiri::HTML(open(url))
  end

  def getPagesCount(doc)
      last_page_link = doc.css("li.pager-last.last a")[0][:href]
      begin_position = last_page_link.index('page=').to_i + 5
      end_position = last_page_link.index('&keys').to_i
      page_count = last_page_link[begin_position...end_position].to_i
      return page_count
  end

  def setCountPagesToParse(countPages)
    @countPagesToParse = countPages
  end

  def getCountPagesToParse
    @countPagesToParse
  end

  def getNextPageURL(url, current_page_number)
    url = url.gsub(/page=[\d]*/, 'page='+current_page_number.to_s)
    return  url
  end

  def getPageNews(doc)
    page_news = doc.css("dl.search-results dt.title a")
    return page_news
  end

  def getNewsURL(url, href, url_domen)
    href = url_domen +"/" + href.to_s
    return href
  end
  
  def load(feed)
    #url = "http://reporter-ua.com/search2?page=0&keys="
    url_domen = getURLDomain(feed.url)
    doc = getDoc(feed.url)
    pages_count = getPagesCount(doc)    
    setCountPagesToParse(1)
    @all_articles = []
    current_page_number = 0
    count_pages_to_parse = getCountPagesToParse()

    while current_page_number < count_pages_to_parse  do
      begin
        next_url = getNextPageURL(feed.url, current_page_number)
        doc = getDoc(next_url)
        page_news = getPageNews(doc)
        for news_item in page_news
          news_url = getNewsURL(feed.url, news_item[:href], url_domen)
          @all_articles << Admin::ArticleParse.new(feed, news_url, url_domen).parseArticle()
        end
      rescue
      end
      current_page_number+=1 
    end    
    @all_articles
  end
end 

Admin::ReporterPlugin.createPlugin