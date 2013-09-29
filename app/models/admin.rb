class Admin < ActiveRecord::Base
  attr_accessible :name, :password, :string, :password_confirmation

  validates :name, :presence => true, :length => { :minimum => 2 }
  validates :password,:presence => true, :length => { :minimum => 6 }, :confirmation => true
  validates :password_confirmation, :presence => true
  

end
