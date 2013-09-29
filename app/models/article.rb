class Article < ActiveRecord::Base
  attr_accessible :content, :image, :title, :url, :create_time, :hash_code, :feed_id
  belongs_to :feed

  validates_uniqueness_of :hash_code
  
  def self.as_csv
    CSV.generate do |csv|
      csv << column_names
      all.each do |item|
        csv << item.attributes.values_at(*column_names)
      end
    end
  end
  
  def self.import(file_a)  
    CSV.foreach(file_a.path, headers: true) do |row|
      Article.create({:title => row[0],
        :image => row[1],
        :content => row[2],
        :url => row[3],
        :feed_id => row[4],
        :create_time => row[5],
        :hash_code => row[6]
        })
    end  
  end
  
end
