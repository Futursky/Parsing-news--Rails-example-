class AddPluginIdToFeeds < ActiveRecord::Migration
  def change
    add_column :feeds, :plugin_id, :integer
  end
end
