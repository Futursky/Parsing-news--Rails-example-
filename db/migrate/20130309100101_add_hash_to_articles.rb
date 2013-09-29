class AddHashToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :hash_code, :string, :unique => true
  end
end
