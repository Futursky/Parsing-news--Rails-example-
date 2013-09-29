RiaFresh::Application.routes.draw do

  resources :plugins

  get "json_backup_db/index"
 
  match 'json_backup_db/save' => 'json_backup_db#save'
  match 'json_backup_db/add_db' => 'json_backup_db#add_db'

  match 'feeds/lastArticles' => 'feeds#lastArticles'
  #get "parser/index/:feed_id"
  
  #get 'parser/default/feed_id'

  get "breadcrumbs/index"

  namespace :admin do
    resources :feeds do
      collection { post :import }
      resources :articles do
        collection { post :import }
      end
    end
    resources :plugins do
      collection { post :import }
    end

    root :to => 'feeds#index'

    get "authentications/logout"
    get "csv_backup/index"
    
    match 'authentications/add' => 'authentications#add'
    match 'authentications/login' => 'authentications#login'
    match 'load_articles/loadAction' => 'load_articles#loadAction'
    match 'pluginsave/saveFile' => 'pluginsave#saveFile'
    #match 'plugins/create' => 'plugins#create'
    #match 'authentications/logined' => 'authentications#logined'
    match 'csv_backup/export_feeds' => 'csv_backup#export_feeds'
    match 'csv_backup/export_articles' => 'csv_backup#export_articles'
    match 'csv_backup/export_plugins' => 'csv_backup#export_plugins'
    match 'feeds/import' => 'feeds#import'
    match 'articles/import' => 'articles#import'
    match 'plugins/import' => 'plugins#import'
    get "authentications/index"
    get "authentications" => "authentications#index"
    get "authentications/new"
 
  end

  resources :feeds do
    resources :articles
    
  end


  get "feed/index"
  match 'mobile/index' => 'mobile#index'
  match 'mobile/show' => 'mobile#show'
  #match '/search/:query' => 'search#search', :as => 'search'
  match 'search/' => 'search#search'
  match 'search/' => 'search#search_word'
  match 'theme/' => 'theme#theme'

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'
  root :to => 'feeds#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
