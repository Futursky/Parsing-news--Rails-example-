class ThemeController < ApplicationController
  skip_before_filter :logined

  def theme
    theme_file = []
    @theme_files = Dir.glob("app/assets/stylesheets/Theme*.scss")
    @theme_files.each do |theme|
      theme = File.basename(theme,".css.scss")       
      theme_file << theme
    end
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: theme_file }
    end
  end
end
