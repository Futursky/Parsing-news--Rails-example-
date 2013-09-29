class CreatePlugins < ActiveRecord::Migration
  def change
    create_table :plugins do |t|
      t.string :name
      t.string :file_name
      t.string :path

      t.timestamps
    end
  end
end
