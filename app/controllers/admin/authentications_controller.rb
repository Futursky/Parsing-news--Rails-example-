class Admin::AuthenticationsController < ApplicationController
  skip_before_filter :logined, :only => [:index, :login]
  layout 'admin_application'

  def index
    check_session
  end

  def login
    check_session
    @wrong_data = false
    @wrong_recaptcha = false           
    until params_empty? params
      render 'index' 
      return
    end     
    @user_exist = Admin.where(:name => params[:name], :password => params[:password] )
    user_exist? params[:name], @user_exist[0]
  end

  def logout
    reset_session
    redirect_to :action => :index
  end

  def new
    @admin = Admin.new
  end

  def add
    @admin = Admin.new(params[:admin])
    if @admin.save
      render 'add'
    else
      render 'new'
    end
  end  

  private

  def check_session
    if session[:status]
      redirect_to '/admin/feeds/'
      return
    end 
    if session[:counter_wrong_login] == nil
      session[:counter_wrong_login] = 0
    end  
  end

  def params_empty? params
    if params[:name] == nil or params[:name] == "" or params[:password] == ""
      if params[:name] != nil          
        @wrong_data = true
        session[:counter_wrong_login]+=1
      end
      return false
    end     
    return true
  end

  def login_user! name
    session[:counter_wrong_login] = 0
    session[:status] = true   
    session[:name] = name                        
    redirect_to '/admin/feeds/'    
  end

  def user_exist? name, user_exist
    if session[:counter_wrong_login] > 3 and user_exist != nil 
      if verify_recaptcha()  
        login_user! name
      else
        @wrong_recaptcha = true
        @wrong_data = true
        session[:counter_wrong_login]+=1
        render 'index'
      end
    else
      if user_exist != nil 
       login_user! name
      else
        @wrong_data = true
        session[:counter_wrong_login]+=1
        render 'index'
      end
    end
  end

end
