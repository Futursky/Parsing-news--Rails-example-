class Feed < ActiveRecord::Base
  attr_accessible :content, :name, :url, :plugin_id
  has_many :articles, :dependent => :destroy
  belongs_to :plugin
  
  validates_uniqueness_of :name
  validates :plugin_id, numericality: {only_integer: true, greater_than_or_equal_to: 1}
  
  def self.sortArticle(feed)
    date = Time.new("2000-01-01")
    selected_article = feed.articles.first
    feed.articles.each do |article|
      if (article.updated_at > date)
        selected_article = article
      end
    end
    selected_article
  end
  
  def self.as_csv
    CSV.generate do |csv|
      csv << column_names
      all.each do |item|
        csv << item.attributes.values_at(*column_names)
      end
    end
  end
  
  def self.import(file_f)  
    CSV.foreach(file_f.path, headers: true) do |row|
      Feed.create({:name => row[0],
        :url => row[1],
        :content => row[2],
        :plugin_id => row[3]})
    end
  end
  
end
