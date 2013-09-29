require 'test_helper'

class LoadArticlesControllerTest < ActionController::TestCase
  test "should get loadAction" do
    get :loadAction
    assert_response :success
  end

end
