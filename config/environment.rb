# Load the rails application
require File.expand_path('../application', __FILE__)
ENV['RECAPTCHA_PUBLIC_KEY'] =  '6LcgU98SAAAAAAZPblJItLtTpurX_i0PBdbqiYLc'
ENV['RECAPTCHA_PRIVATE_KEY'] = '6LcgU98SAAAAANgxcG8zbsNKTTSG_pwP3IV4oywQ'

# Initialize the rails application
RiaFresh::Application.initialize!
