
class Admin::ArticlesController < ApplicationController
  
  require 'csv'
  # GET /articles
  # GET /articles.json
  layout 'admin_application'

  def index
    @feed = Feed.find(params[:feed_id])
    @articles = @feed.articles
    @articles = @feed.articles.order(:create_time)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @articles }
      format.csv { send_data @articles.as_csv }
    end
  end
  
  # GET /articles/1
  # GET /articles/1.json
  def show
    @article = Article.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @article }
    end
  end

  # GET /articles/new
  # GET /articles/new.json
  def new
    @feed = Feed.find(params[:feed_id])
    @article = @feed.articles.create

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @article }
    end
  end

  # GET /articles/1/edit
  def edit
    @article = Article.find(params[:id])
    @feed = @article.feed
  end

  # POST /articles
  # POST /articles.json
  def create
    @feed = Feed.find(params[:feed_id])

      @article = @feed.articles.create(params[:article])
      respond_to do |format|
        if @article.save
          format.html { redirect_to [:admin, @article.feed, @article], notice: 'Article was successfully created.' }
          format.json { render json: @feed, status: :created, location: @feed }
        else if @article.import
          format.html { redirect_to [:admin, @article.feed, @article], notice: 'Article was successfully created.' }
          format.json { render json: @feed, status: :created, location: @feed }
        else
          format.html { render action: "new" }
          format.json { render json: @article.errors, status: :unprocessable_entity }
        end
        end
      end
  end

  # PUT /articles/1
  # PUT /articles/1.json
  def update
    @feed = Feed.find(params[:feed_id])
    @article = @feed.articles.find(params[:id])

    respond_to do |format|
      if @article.update_attributes(params[:article])
        format.html { redirect_to [:admin, @article.feed, @article], notice: 'Article was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end  
  end

  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
    @feed = Feed.find(params[:feed_id])
    @article = @feed.articles.find(params[:id])
    @article.destroy

    respond_to do |format|
      format.html { redirect_to admin_feed_articles_url  }
      format.json { head :no_content }
    end
  end

  def import
    @article = Article.import(params[:file_a])
     
      respond_to do |format|
        format.html { redirect_to admin_csv_backup_index_url, notice: "Articles successfully  were imported!" }
      end
  end
end