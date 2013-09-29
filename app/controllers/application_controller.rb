class ApplicationController < ActionController::Base

    protect_from_forgery 
 	before_filter :logined, :theme 

    def theme
	 	if params[:theme]
	 		@theme = params[:theme]
	    else 
	    	if cookies[:theme]
		        @theme = cookies[:theme]
		     else 
	        	if session[:theme]
		        	@theme = session[:theme]
		        else
		            @theme = 'ThemeGrey'
		    	end	
	        end       
		end

		cookies[:theme] = @theme
		session[:theme] = @theme
			    
	end 
	 
	def logined
	    if !session[:status] 
	        redirect_to  :controller => :authentications, :action => :index 
	    end
	end
 end
