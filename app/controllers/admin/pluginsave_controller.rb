class Admin::PluginsaveController < ApplicationController
  skip_before_filter :logined, :only => [:saveFile]
  layout 'admin_application'
  require 'fileutils'

  def saveFile
    @plugin_file = request[:file]
    @file_name = @plugin_file.original_filename
    @file_name = @file_name.to_s.gsub(/.rb/, '')
    @temp_path = @plugin_file.tempfile.path
    @file_path = File.join('app/controllers/admin/plugins', @plugin_file.original_filename)
    @plugin_size = File.size(@plugin_file.tempfile.path)
    @created_plugin = Plugin.create(:name => @file_name, :file_name => @plugin_file.original_filename, :file_size => @plugin_size, :path => @file_path)
    
    if @created_plugin.valid?
      FileUtils.cp @temp_path, @file_path
      
      respond_to do |format|
        format.json { render json: @created_plugin }
      end
    elsif
      respond_to do |format|
        format.json { render json: @created_plugin.errors.messages}
      end
    end   
  end
end
