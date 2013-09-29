class Admin::ParserPlugin < ApplicationController
  
  def self.loadPlugins(path)
    load(path)
  end

  def self.createPlugin
    @@plugin = self.new
  end

  def self.getPlugin
    @@plugin
  end

  def load(url)
    raise "Abstract method"
  end
end