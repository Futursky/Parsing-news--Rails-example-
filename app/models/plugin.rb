class Plugin < ActiveRecord::Base
  attr_accessible :file_name, :name, :path, :file_size
  has_one :feed

  validates_format_of :file_name, :with => /.rb$/, :message => "File extention must be '*.rb'"
  validates :file_size, numericality: {only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 512000, :message => "File can't be empty or must be less 500kb"}
  validates_uniqueness_of :name

  def self.getAll
  	plugins = []
  	Plugin.all.each do |p|
  		plugins << [p.name, p.id]
  	end
  	plugins
  end
  
  def self.as_csv
    CSV.generate do |csv|
      csv << column_names
      all.each do |item|
        csv << item.attributes.values_at(*column_names)
      end
    end
  end
  
  def self.import(file_p)  
    CSV.foreach(file_p.path, headers: true) do |row|
      Plugin.create({:name => row[0],
        :file_name => row[1],
        :path => row[2],
        :file_size => row[3]})
    end
  end
  
end
