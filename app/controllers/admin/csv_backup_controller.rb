class Admin::CsvBackupController < ApplicationController
  layout 'admin_application'
  require 'csv'
  
  def index
    respond_to do |format|
      format.html # index.html.erb
      format.csv { render :layout => false }
    end
  end

  def export_feeds       
    @feeds = Feed.find(:all)
    csv_string = CSV.generate do |csv|
      csv << ["Name", "Url", "Content", "Plugin_id"]
      @feeds.each do |feed|
        csv << [feed.name, feed.url, feed.content, feed.plugin_id]
      end                                
    end
    
    send_data csv_string,
    :type => 'text/csv; charset=iso-8859-1; header=present',
    :disposition => "attachment; filename=feeds-#{Time.now.strftime('%d-%m-%y--%H-%M')}.csv" 
  end

    
  def export_articles
    @articles = Article.find(:all)
    csv_string = CSV.generate do |csv|
      csv << ["title",  "image", "content", "url", "feed_id", "create_time", "hash_code"]
      @articles.each do |article|
        csv << [article.title, article.image, article.content, article.url, article.feed_id, article.create_time, article.hash_code]
      end
    end
   
   send_data csv_string,
   :type => 'text/csv; charset=iso-8859-1; header=present',
   :disposition => "attachment; filename=articles-#{Time.now.strftime('%d-%m-%y--%H-%M')}.csv"
  end
  
  def export_plugins
    @plugins = Plugin.find(:all)
    csv_string = CSV.generate do |csv|
      csv << ["Name", "File_name", "Path", "File_size"]
      @plugins.each do |plugin|
        csv << [plugin.name, plugin.file_name, plugin.path, plugin.file_size]
      end
    end
   
   send_data csv_string,
   :type => 'text/csv; charset=iso-8859-1; header=present',
   :disposition => "attachment; filename=plugins-#{Time.now.strftime('%d-%m-%y--%H-%M')}.csv"
  end

end
