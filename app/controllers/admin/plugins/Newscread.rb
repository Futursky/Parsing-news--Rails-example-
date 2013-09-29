require 'open-uri'
require 'rubygems'
require 'digest/md5'

class Admin::ArticleParse
  private
  @article 
  @article_to_parse
    
  public
  def initialize(feed, article)
    @article = Article.new()
    @article.feed_id = feed.id
    @article_to_parse = article
    self
  end

  def parseTitle
    title = @article_to_parse.css("title").first
    title ? @article.title = title.text : @article.title = "" 
    self
  end

  def parseImage
    image =  @article_to_parse.css("original_image").first
    image ? @article.image = image.text : @article.image = "" 
    self
  end

  def parseContent
    content = @article_to_parse.css("description").first
    content = content.text.gsub(/<br [\S\s]{0,}/, '')
    content ? @article.content = content : @article.content = "" 
    self
  end

  def parseCreateTime
    create_time = @article_to_parse.css("published_at").first
    create_time.text ? @article.create_time = create_time.text.to_time : @article.create_time = "" 
    self    
  end

  def parseHash
    @article.hash_code = Digest::MD5.hexdigest(@article.content.to_s)
    self
  end

  def parseArticleUrl
    begin_url_pos =  @article_to_parse.to_html.index("link>") + 5
    end_url_pos  =  @article_to_parse.to_html.rindex("<guid") - begin_url_pos
    url_article = @article_to_parse.to_html[begin_url_pos,end_url_pos]
    if url_article 
      @article.url = url_article
    else
      @article.url = ""
    end
    self
  end

  def parseArticle
    parseTitle().parseImage().parseContent().parseCreateTime().parseHash().parseArticleUrl()
    @article
  end

end

class Admin::NewscreadPlugin < Admin::ParserPlugin
  
  def getArticles(url)
    doc = Nokogiri::HTML(open(url))
    articles = doc.xpath("//article")
    return articles
  end

  def load(feed)
    #url = "http://api.newscred.com/category/u-s/articles?access_key=c4bcc3f7c9bf9ec159f51da0a86ca658"
    @all_articles = []
    @articles = getArticles(feed.url)
    article_num = 0
    while @articles.count > article_num do
      @all_articles << Admin::ArticleParse.new(feed, @articles[article_num]).parseArticle()
      article_num +=1;
    end
    @all_articles
  end
end 

Admin::NewscreadPlugin.createPlugin  