require 'test_helper'

class Admin::CsvBackupControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get backup" do
    get :backup
    assert_response :success
  end

  test "should get restore" do
    get :restore
    assert_response :success
  end

end
