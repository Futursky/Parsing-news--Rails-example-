class AddPluginPathToFeeds < ActiveRecord::Migration
  def change
    add_column :feeds, :plugin_path, :string
  end
end
