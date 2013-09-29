class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title
      t.string :image
      t.text :content
      t.string :url
      t.integer :feed_id

      t.timestamps
    end
  end
end
