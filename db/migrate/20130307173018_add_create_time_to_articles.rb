class AddCreateTimeToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :create_time, :date, :null => false, :default => DateTime.now
  end
end
