class MobileController < ApplicationController
  skip_before_filter :logined
  # GET /feeds
  # GET /feeds.json
  def index
    @feeds = Feed.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @feeds }
    end
  end

  # GET /feeds/1
  # GET /feeds/1.json
  def show
    @feed = Feed.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @feed }
    end
  end
end
