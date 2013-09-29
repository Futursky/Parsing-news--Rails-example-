class Admin::LoadArticlesController < ApplicationController
  layout 'admin_application'

  def loadAction
    feeds = Feed.all

    feeds.each do |f|
      begin
        fullname = 'Admin::' + f.plugin.name + 'Plugin'
        Admin::ParserPlugin.loadPlugins(f.plugin.path)
        plugin = Admin::ParserPlugin.getPlugin
        all_articles = plugin.load(f)

        all_articles.each do |a|
          a.save()
        end
      rescue
      end
    end
  end
end
