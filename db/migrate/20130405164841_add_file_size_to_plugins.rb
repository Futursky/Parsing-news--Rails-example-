class AddFileSizeToPlugins < ActiveRecord::Migration
  def change
    add_column :plugins, :file_size, :integer, :default => 0
  end
end
