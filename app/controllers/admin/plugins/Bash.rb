#coding: utf-8
require 'time'
require 'open-uri'
require 'rubygems'
require 'nokogiri'
require 'digest/md5'
require 'date'

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
    @doc = Nokogiri::HTML(open(article_url),nil,'WINDOWS-1251')
    self
  end

  def parseTitle
    @article.title = @doc.css(".date")[0].text
    self
  end

  def parseContent
    @article.content = @doc.css(".text")[0].text  
    self
  end

  def parseHash
    @article.hash_code = Digest::MD5.hexdigest(@article.title.to_s + @article.content.to_s)
    self
  end

  def parseCreateTime
    @article.create_time = @doc.css(".date")[0].text 
    self    
  end

  def parseArticle
    parseTitle().parseCreateTime().parseContent().parseHash()
    @article
  end
end

class Admin::BashPlugin < Admin::ParserPlugin

  def load(feed)
    @all_articles = []
    #url = "http://bash.im"
    page_n=778
    doc = Nokogiri::HTML(open(feed.url))
    max_page = doc.css("a span , .page")[1].text
    
    while page_n < max_page.to_i do
      article_page_url = "http://bash.im/index/"+page_n.to_s
      @all_articles << Admin::ArticleParser.new(feed, article_page_url).parseArticle()    
      page_n+=1
    end
    @all_articles
  end
end 

Admin::BashPlugin.createPlugin