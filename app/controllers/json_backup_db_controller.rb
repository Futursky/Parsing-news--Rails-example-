class JsonBackupDbController < ApplicationController
skip_before_filter :logined
  require 'json'
  def index

      
  		@feeds =  Feed.all
      
      for feed in @feeds
          
          article = Article.find(:all, :conditions => ["feed_id = ?", feed.id])
          feed['article'] = article.as_json(:only =>[:title, :image, :content, :url])
          
      end



  	  	respond_to do |format|
     		   format.html # index.html.erb
      		  format.json { render json: @feeds }
    end

    
  end
  def save 
=begin  
     @feeds =  Feed.all
      
      for feed in @feeds
          
          article = Article.find(:all, :conditions => ["feed_id = ?", feed.id])
          feed['article'] = article.as_json(:only =>[:title, :image, :content, :url])
          
      end
      @file_content = ""
      for feed in @feeds

        @file_content += feed.as_json(:only=>[:id, :name, :content, :url, :article]).
      
      end
=end  
  	 @json_content = params[:json_content]
    

		File.open("json_content.json", "w") { |file| file.write(@json_content) } 
    	   						
		  respond_to do |format|
     			format.html # save.html.erb
      			format.json { render json: @feeds }
    		end

    end
    def add_db



 	File.open("json_content.json", "r").each_line { |line| 
			
      record_hash = eval(line)
      articles_mass = record_hash["article"]  
      feed_hash =  record_hash.reject!{|k,v| v.is_a? Array }		

   	  @new_feed = Feed.new(feed_hash) 

      if articles_mass != nil
        i=0
        while i < articles_mass.count

            @new_feed.articles.new(articles_mass[i])
            i+=1
        end
      end
			@new_feed.save
		} 

    end


end
