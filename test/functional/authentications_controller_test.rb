require 'test_helper'

class AuthenticationsControllerTest < ActionController::TestCase
  test "should get login" do
    get :login
    assert_response :success
  end

  test "should get loguot" do
    get :loguot
    assert_response :success
  end

  test "should get add" do
    get :add
    assert_response :success
  end

end
