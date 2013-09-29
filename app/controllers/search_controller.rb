class SearchController < ApplicationController
	skip_before_filter :logined
  def search

    @search = Article.where("title LIKE ? OR content LIKE ?", "%#{params[:q]}%", "%#{params[:q]}%")

      respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @search }
      end
  end
end
