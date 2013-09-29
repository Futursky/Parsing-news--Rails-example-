class FeedsController < ApplicationController
  skip_before_filter :logined

  def index
    @feeds = Feed.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @feeds }
    end
  end

  def show
    @feed = Feed.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @feed }
    end
  end

  def lastArticles
    @last_articles = []
    @feeds = Feed.all
    @feeds.each do |feed| 
      last_article = Feed.sortArticle(feed) 
      if last_article
        @last_articles << last_article
      end
    end
    respond_to do |format|
       format.json { render json: @last_articles }
    end
  end  
end
