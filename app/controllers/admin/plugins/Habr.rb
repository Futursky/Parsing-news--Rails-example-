#coding: utf-8
require 'time'
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
    @doc = Nokogiri::HTML(open(@article_url, "User-Agent" => "Mozilla/18.0"))
    self
  end

  def parseTitle
    @article.title = @doc.at_css(".post_title").text
    self
  end

  def parseImage
    image_item = @doc.at_css("img")
    image_item ? @article.image = image_item['src'] : @article.image = ""
    self
  end

  def parseContent
    content = @doc.at_css(".html_format")
    poll = content.at_css("div.polling")
    poll.remove if poll
    begin
      content.at_css("img").remove if @article.image != ""
    rescue
    end
    clear_div = content.at_css(".clear")
    clear_div.remove if clear_div
    @article.content = content.to_html
    self
  end

  def parseCreateTime
    def month_from_table (current_month)
      month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
      for i in 0...month.length
        if month[i] == current_month.to_s
          number = i + 1
          break
        end
      end
      number
    end

    def habr_time_parser(time)
      Time.now.month < 10 ? month = '0' + Time.now.month.to_s : month = Time.now.month
      Time.now.day < 10 ? day = '0' + Time.now.day.to_s : day = Time.now.day

      if time.to_s =~ /^сегодня в/
        fulltime = time.to_s.gsub(/^сегодня в/, "#{Time.now.year}-#{month}-#{day}")
      elsif time.to_s =~ /^вчера в/
        fulltime = time.to_s.gsub(/^вчера в/, "#{Time.now.year}-#{month}-#{day.to_i - 1}")
      elsif /\d{4}/ =~ time.to_s
        year = time.to_s.match(/\d{4}/)
        day = time.to_s.match(/^\d+/)[0]
        clock = time.to_s.match(/\d{1,2}:\d{2}/)
        month = time.to_s.match(/[А-Яа-я]{2,}/)
        number = month_from_table(month)
        day = '0' + day.to_s if day.to_i < 10
        number = '0' + number.to_s if number < 10 
        fulltime = year.to_s + '-' + number.to_s + '-' + day.to_s + ' ' + clock.to_s + ' +00:00'
      else
        day = time.to_s.match(/^\d+/)[0]
        clock = time.to_s.match(/\d{1,2}:\d{2}/)
        month = time.to_s.match(/[А-Яа-я]{2,}/)
        number = month_from_table(month)
        day = '0' + day.to_s if day.to_i < 10
        number = '0' + number.to_s if number < 10 
        fulltime = Time.now.year.to_s + '-' + number.to_s + '-' + day.to_s + ' ' + clock.to_s+ ' +00:00'
      end
      current_time = Time.parse(fulltime + ' +00:00')
    end
    @article.create_time = habr_time_parser(@doc.at_css(".published").text)
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

class Admin::HabrPlugin < Admin::ParserPlugin
  
  def load(feed)
    @all_articles = []
    #url = 'http://habrahabr.ru/'
    current_page = 1

    while current_page.to_i <= 2
      page_url = feed.url + 'posts/collective/page' + "#{current_page}" + '/'
      page = Nokogiri::HTML(open(page_url, "User-Agent" => "Mozilla/18.0"))

      page.css(".shortcuts_item").each do |item|
        begin
          article_page_url = item.at_css(".post_title")['href']
          @all_articles << Admin::ArticleParser.new(feed, article_page_url).parseArticle()
        rescue
        end
      end
      current_page += 1
    end
    @all_articles
  end   
end

Admin::HabrPlugin.createPlugin


