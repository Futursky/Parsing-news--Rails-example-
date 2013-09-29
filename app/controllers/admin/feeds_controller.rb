class Admin::FeedsController < ApplicationController
  require 'csv'
  # GET /feeds
  # GET /feeds.json
  layout 'admin_application'
  def index
    @feeds = Feed.order(:created_at)
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @feeds }
      format.csv { send_data @feeds.as_csv }
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

  # GET /feeds/new
  # GET /feeds/new.json
  def new
    @feed = Feed.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @feed }
    end
  end

  # GET /feeds/1/edit
  def edit
    @feed = Feed.find(params[:id])
  end

  # POST /feeds
  # POST /feeds.json
  def create
    @feed = Feed.new(params[:feed])
    
    respond_to do |format|
      if @feed.save
        format.html { redirect_to [:admin, @feed], notice: 'Feed was successfully created.' }
        format.json { render json: @feed, status: :created, location: @feed }
      elsif @feed.import 
        format.html { redirect_to [:admin, @feed], notice: 'Feed was successfully created.' }
        format.json { render json: @feed, status: :created, location: @feed }
      else
        format.html { render action: "new" }
        format.json { render json: @feed.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /feeds/1
  # PUT /feeds/1.json
  def update
    @feed = Feed.find(params[:id])

    respond_to do |format|
      if @feed.update_attributes(params[:feed])
        format.html { redirect_to [:admin, @feed], notice: 'Feed was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @feed.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /feeds/1
  # DELETE /feeds/1.json
  def destroy
    @feed = Feed.find(params[:id])
    @feed.destroy

    respond_to do |format|
      format.html { redirect_to admin_feeds_url }
      format.json { head :no_content }
    end
  end
  
  def import
    @feed = Feed.import(params[:file_f])
    
    respond_to do |format|
      format.html { redirect_to admin_csv_backup_index_url, notice: "Feeds were successfully imported!" }
      #format.json { render json: @feed, status: :created, location: @feed }
   end
  end
end