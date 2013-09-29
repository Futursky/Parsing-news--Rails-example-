require 'test_helper'

class ParserControllerTest < ActionController::TestCase
  test "should get bash" do
    get :bash
    assert_response :success
  end

end
