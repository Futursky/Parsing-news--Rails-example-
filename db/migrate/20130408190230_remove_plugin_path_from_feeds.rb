class RemovePluginPathFromFeeds < ActiveRecord::Migration
  def up
    remove_column :feeds, :plugin_path
      end

  def down
    add_column :feeds, :plugin_path, :string
  end
end
