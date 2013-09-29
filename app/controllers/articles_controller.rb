class ArticlesController < ApplicationController
  skip_before_filter :logined
  # GET /articles
  # GET /articles.json
  def index
    @feed = Feed.find(params[:feed_id])
    @pages = ( @feed.articles.count.to_f/5).ceil
    @cur_feed_id = params[:feed_id].to_i
    @articlesBackbone = @feed.articles.order("create_time DESC")
    @articles =  @feed.articles.order("create_time DESC").paginate(:page => params[:page], :per_page=> 5)
    @pages = ( @feed.articles.count.to_f/5).ceil
    gon.pages = @pages
    @cur_feed_id = params[:feed_id].to_i
    gon.cur_feed_id = @cur_feed_id
    if params[:only_list].blank?    
      respond_to do |format|
        format.html # index.html.erb
        format.json { render json: @articlesBackbone }
      end
    else
      render :layout=>false, :action=>"list"
    end
  end

  # GET /articles/1
  # GET /articles/1.json
  def show
    @feed = Feed.find(params[:feed_id])
    @article = Article.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @article }
    end
  end

end