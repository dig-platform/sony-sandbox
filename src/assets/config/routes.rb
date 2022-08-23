# frozen_string_literal: true

Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  use_doorkeeper
  devise_for :users, skip: %i[sessions layouts two_factor_session doorkeeper expired_sessions]
  as :user do
    get 'sign_in' => 'devise/sessions#new', as: :new_user_session
    post 'sign_in' => 'devise/sessions#create', as: :user_session
    get 'sign_out' => 'devise/sessions#destroy', as: :sign_out
    get 'tfa' => 'two_factor_sessions#new'
    post 'tfa' => 'two_factor_sessions#create'
  end

  authenticated :user do
    root :to => 'layouts#show', :as => :authenticated_root
    resource :user, only: %i[show update]
  end

  resources :assets

  resource :two_factors, as: :two_factor
  get 'expired_session' => 'expired_sessions#index'

  resources :passwords, only: %i[edit update], :param => :reset_token
  get 'passwords/age_policy_error', :as => 'age_policy_error'
  get 'forgot_password' => 'passwords#forgot_password'
  post 'forgot_password' => 'passwords#reset'

  get 'account_request/approve/:uuid' => 'user_account_requests#approve'
  get 'account_request/reject/:uuid' => 'user_account_requests#reject'
  get 'account_request/declined' => 'user_account_requests#declined'
  get 'account_request/submitted' => 'user_account_requests#submitted'
  post 'account_request/update/:uuid' => 'user_account_requests#update', :as => :account_request_update

  namespace :api, :defaults => { :format => :json } do
    namespace :v3 do
      resource :downloads, :only => :create
    end

    namespace :v2 do
      namespace 'asset_items' do
        resource :http_download, only: :create
        resources :delete_from_folders, only: [:create]
        resource :proxies, only: :create do
          post 'download/aspera' => 'proxy_download_aspera#create'
          post 'download/http' => 'proxy_download_http#create'
        end

        post 'bulk_image_preview' => 'image_preview#bulk'
      end

      resources :asset_items do
        scope module: 'asset_items' do
          get '/proxies/:type/http_download', only: :show, controller: 'http_proxies', action: 'show'

          resource :http_download, only: :show, controller: 'http_download'
        end
      end

      resources :folders, :only => [] do
        resources :subscriptions, only: :index, :module => :folders do
          post :subscribe, :on => :collection
          post :unsubscribe, :on => :collection
        end
      end

      namespace 'transfers' do
        resource :deliveries, :only => [:create]
      end

      namespace 'multipart' do
        resources :asset_items, :only => [] do
          member do
            post 'retrieve_upload_urls' => 'retrieve_upload_urls#create'
            post 'complete'             => 'complete_asset#create'
            post 'complete_parts'       => 'complete_parts#create'
            post 'initiate'             => 'asset_initiate#create'
          end
        end
      end

      post 'uploads/http' => 'http_uploads#create'

      resources :users, :only => [] do
        resources :folder_subscriptions, only: %i[index show], :module => :users do
          post :subscribe, :on => :collection
          post :unsubscribe, :on => :collection
        end
      end
    end

    namespace :v1 do
      ####
      # NOTE: Please keep alphabetized
      ####
      resources :active_batches, :only => :index
      resources :active_transfers, :only => :index
      resource :address_books, :only => [ :show, :create, :update ]
      get 'asset_item_metadata' => 'asset_item_metadata#index'
      namespace :admin do
        get 'folders/root' => 'folders#index'

        resources :folders, only: %i[index show] do
          resources :update_deletion_policies, only: :create, controller: 'folders/update_deletion_policies'
        end
      end
      resources :alphas, :only => [] do
        scope :module => 'alphas' do
          collection do
            get 'by_gpms_alpha_id/:gpms_alpha_id' => 'by_gpms_alpha_id#show'
            put 'by_gpms_alpha_id/:gpms_alpha_id' => 'by_gpms_alpha_id#update'
          end
        end
      end
      resources :announcements, only: [:index]
      resources :asset_item_groups, only: %i[create destroy show update] do
        put :remove_items, on: :member
      end
      resources :asset_item_group_metadata, only: [:show]
      namespace 'asset_items' do
        resources :archivables, :only => %i[index update]
        resources :archives, :only => :create
        resources :batch, :only => :create
        resources :bulk_indexes, :only => :create
        resources :checksums, :only => :show
        resources :cleanup_metadata, :only => :create, :controller => :metadata_cleanup
        resource  :copy, :only => :create, :controller => :copy
        resources :delete_from_folders, :only => [:create]
        resources :expired_restored_resets, :only => :create
        resource  :image_resize, :only => :create, :controller => :image_resize
        resources :ingest_completes, :only => :create
        resource  :link_subtitles, :only => :create
        resources :metadata_activity, :only => :show
        resource  :percolate, :only => :create, :controller => :percolation
        resources :polling_tasks, :only => %i[index update]
        resources :proxies, :only => :create
        resource  :publish, :only => :create, :controller => :publish
        resources :removes, :only => [:create]
        resources :reports, :only => [:create]
        resources :restores, :only => :create
        resources :restoring, :only => [:index]
        resources :revisions, :only => [:create]
        resource :stitch_clips, :only => :create
        resources :update_archive_ats, :only => :create

        post 'download/aspera' => 'aspera_downloads#create'
      end
      resources :asset_items, :only => %i[show create] do
        scope :module => 'asset_items' do
          resource  :derived_overlay, :only => :show
          resources :duplicates, :only => :index
          resource  :frame_rate_conversion, :only => :create, :controller => :frame_rate_conversion
          namespace :proxy do
            resource :http_download, :only => [:show]
          end
          resources :revisions, :only => [:index]
          resources :scheduled_actions, :only => [:index]
          resource  :thumbnail, :only => [:show]
          resource  :user_folders, :only => [:show]
        end

        member do
          resource :delegate_token, :only => [:create], :controller => 'asset_items/delegate_token'
          get 'mcs_info', :only => :index, :controller => 'asset_items/mcs_info', :action => 'index'
          resources :proxies, :only => :index, :controller => 'asset_items/proxies'
          get '/proxies/:type/aspera_download', :only => :show, :controller => 'asset_items/aspera_proxies', :action => 'show'
          get 'service_accounts', :only => :index, :controller => 'asset_items/service_accounts', :action => 'index'
          resource :transcode, :only => :create, :controller => 'asset_items/transcodes'
        end

        collection do
          post 'accessible'                 => 'asset_items#accessible'
          post 'bulk_image_preview'         => 'asset_items/image_preview#bulk'
          post 'bulk_update'                => 'asset_items/bulk_update#create'
          get  'by_mp_photo_id'             => 'asset_items/by_mp_photo_external_asset_id#show'
          post 'deletable'                  => 'asset_items#deletable'
          get  'image_preview'              => 'asset_items/image_preview#show'
          get  'preview'                    => 'asset_items/preview#show'
          get  'recent/:limit'              => 'asset_items#recent'
          post 'replace'                    => 'asset_items/replace#create'
          get  'subtitles/by_source_id/:id' => 'asset_items/subtitles#by_source_id'
          get  'thumbnails'                 => 'asset_items/thumbnails#show'
          post 'thumbnails/refresh'         => 'asset_items/thumbnails#refresh'
        end
      end
      resources :recently_viewed_asset_items, :only => [:index]
      resources :recently_viewed_folders, :only => [:index]
      resources :batch_polling_task_updates, :only => :create
      resource  :cart, :only => [:show]
      resources :carts, :only => %i[index show create update destroy] do
        scope :module => 'carts' do
          collection do
            resources :asset_items, :only => %i[index create]
            resource  :remove_asset_items, :only => [:create]
          end
        end
      end
      resources :remove_carts, :only => [:create]
      resources :cineshare_imports, only: :create
      resources :completed_archives, :only => [:create]
      resources :completed_ingests, :only => [:create]
      resources :completed_restores, :only => [:create]
      resource  :current_user, :only => %i[show update] do
        scope module: 'current_user' do
          resource :downloadable_folders, :only => :show
          resource :uploadable_folders, :only => :show
        end
      end
      resources :external_migrations, :only => :create
      post      'external_migrations/:system_name' => 'external_migrations#create'
      get       'external_migrations/:system_name' => 'external_migrations#index'
      resources :favorite_metadata_templates, :only => %i[index create destroy], :param => :template_name
      get       'file_request_activity/:status' => 'file_requests/activity#index'
      resources :file_requests, :only => %i[create show update] do
        collection do
          get 'by_uuid/:uuid' => 'file_requests/by_uuid#show'
        end

        member do
          resources :ingest_batches, :only => [:index], :as => 'file_request_ingest_batches', :controller => 'file_requests/ingest_batches'
          get       'ingest_batches/:ingest_batch_id' => 'file_requests/ingest_batches#show'
          post      'extend' => 'file_requests#extend'
          post      'expire' => 'file_requests#expire'
          post      'resend' => 'file_requests#resend'
        end
      end
      resources :file_transfer_paths, :only => [:index]
      resources :first_time_users, :only => :create
      resources :folders, :only => %i[index show create update destroy] do
        collection do
          get  'id_by_business_key/:business_key' => 'folders#id_by_business_key'
          get  'root' => 'folders#index'
          get  'root/subfolders' => 'folder_navigations#show'
          post 'update_sphe_screeners' => 'folders/update_sphe_screeners#create'
        end

        member do
          get  :deletable
          get  :subfolders, :controller => 'folder_navigations', :action => 'show'

          resources :subscriptions, :only => :index, :controller => 'folder_subscriptions'
        end

        scope :module => 'folders' do
          resource  :favorites, :only => :update
          resources :users, :only => :index
          resource  :paths, :only => :show

          collection do
            resource  :create_path_folders, :only => :create
            resources :favorites, :only => :index
            resource  :update_archive_policies, :only => :create
            resource  :update_folder_actions, :only => :create
          end
        end
      end
      resources :folder_permissions, :only => %i[index show create]
      resources :idm_user_searches, :only => :create
      get       'ingest_batch_activity/:status' => 'ingest_batches/activity#index'
      resources :ingest_batch_counts, :only => [:show], :controller => 'ingest_batches/counts'
      resources :ingest_batch_statuses, :only => [:show], :controller => 'ingest_batches/statuses'
      resources :ingest_batches, :only => [:show] do
        scope :module => 'ingest_batches' do
          resource :metadata, :only => :show
          resource :upload_complete, :only => [:update], :controller => 'upload_complete'
        end
      end
      resources :ingests, :only => [:update] do
        collection do
          resources :failed_uploads, :only => :index, :module => 'ingests'
        end
        member do
          patch :transfer
        end
      end
      resources :in_progress_ingests, :only => [:show], :param => 'ingest_type'
      resources :jobs, :only => %i[show create update] do
        collection do
          patch 'system_job_id/:system_job_id' => 'jobs/system_job_id#update'
        end
      end
      resources :mcs_imports, :only => :create
      namespace 'metrics' do
        get 'forensic_watermark'
        get 'frame_rate_conversion'
        get 'image_resize'
        get 'summary'
        get 'asset_count'
        get 'asset_items'
        get 'asset_storage'
        get 'year_end_asset_count'
      end
      resources :migrations, :only => :create
      resources :notifications, :except => %i[destroy edit show] do
        collection do
          patch :dismiss
        end
      end
      post      'passwords' => 'passwords#reset'
      resources :polling_tasks, :only => :index
      resources :qc_reports, :only => [:create, :update, :destroy]
      resources :recent_searches, only: [:index]
      resources :recent_uploads, only: [:index]
      resources :restore_batches, :only => [] do
        resources :asset_items, :only => [:index], :controller => 'restore_batch_asset_items'
        resources :subscriptions, :only => [:index], :controller => 'restore_batch_subscriptions'
      end
      resources :scenes, :only => %i[index create destroy]
      resources :scheduled_actions, :only => %i[show] do
        collection do
          resources :execute, :only => :create, :module => 'scheduled_actions'
        end
      end
      resource  :search, :only => :show
      resources :search_subscriptions, :only => %i[create update destroy index] do
        collection do
          get :by_user
        end
      end
      resources :shares, :only => %i[create show update], :controller => 'shares/shares' do
        collection do
          get  'by_uuid/:uuid' => 'shares/by_uuid#show'
          post 'by_uuid/:uuid/authenticate' => 'shares/by_uuid#authenticate'
          get  'by_uuid/:uuid/templates' => 'shares/templates#show'
          get  'by_user' => 'shares/by_user#show'
          get  'emails' => 'shares/emails#index'
        end

        member do
          resources :logs, :only => [:index], :controller => 'shares/share_logs'
          post      'expire' => 'shares/shares#expire'
          post      'publish' => 'shares/shares#publish'
          post      'expirations' => 'shares/expirations#update'
          post      'advance' => 'shares/shares#advance'
          get       'recipients' => 'shares/recipients#index'
          get       'watermark_status' => 'shares/watermark_status#show'
        end
      end
      get       'status' => 'statuses#index'
      resources :survey_campaigns, :only => [:show, :create]
      resources :survey_responses, :only => [:create]
      resources :titles, only: %i[create update show] do
        collection do
          get 'show_by_gpms_id/:id' => 'titles#show'
        end
        member do
          get 'child_by_show_number/:show_number' => 'titles#show'
        end

        scope :module => 'titles' do
          resource :details, :only => :show
          resource :alphas, :only => :show
          collection do
            get   'full_name/:id',            :to => 'full_name#show'
            get   'suggestions/:query',       :to => 'suggestions#index',       :query => /.+/
            get   'advanced_searches/:query', :to => 'advanced_searches#index', :query => /.+/
            match 'gpms_id/:gpms_id',         :to => 'gpms_id#update', :via => %i[patch put]
            get   '/:gpms_id/:show_number' => 'game_show_hot_folder#show'
          end
        end
      end
      resources :transfers, :only => %i[show create update] do
        match 'update', :to => 'transfers#bulk_update', :on => :collection, :via => %i[post patch put]
        scope :module => 'transfers' do
          resources :external_assets, :only => :index
          collection do
            resources :push_deliveries, :only => :create
            resource :mcs_upload_configs, :only => [:create]
            resources :deliveries, :only => %i[create update]
          end
        end
      end
      resources :update_external_assets, :only => :create
      resources :update_external_migrations, :only => :create
      resources :update_search_subscriptions, :only => :create
      resources :uploads, :only => %i[create]
      resources :user_account_requests, :only => %i[show create] do
        collection do
          post 'by_uuid' => 'user_account_requests#update'
          get  'approve/:uuid' => 'user_account_requests#approve'
          get  'reject/:uuid' => 'user_account_requests#reject'
          get  'auto_reject/:id' => 'user_account_requests#auto_reject'
        end
      end
      resources :user_announcements, :only => [:update]
      resource  :user_search, :only => :show
      resources :users, :only => %i[create index show update] do
        put       :two_factor_authentication, :on => :collection, :to => 'users/two_factor_authentication#update'
        resources :preferences, :only => [:create], :module => :users
        resources :subscriptions, only: [:index], :module => :users
      end
      resources :vocabularies, :only => [:index, :create]
      resources :watermarks, :only => [], :param => :watermark_group_id do
        post :intermediates, :on => :member
      end
    end
  end

  namespace 'admin' do
    with_options(:to => 'admin#show') do |route|
      route.get '/users'
      route.get '/users/:id', :as => :user
      route.get '/folders', :as => :folder_management
      route.get '/folders/:id/access', :as => :folder_management_access
    end

    root :to => redirect('/admin/users')
  end

  namespace 'share' do
    get ':uuid/asset_items/http_download' => 'http_downloads#show', :as => :http_download_share
    get ':uuid/expired' => 'expired_share#show', :as => :expired_share
  end

  namespace 'asset_items' do
    get '/:id/http_download/direct' => 'http_downloads_direct#show'
    get '/:id/proxies/:type/http_download/direct' => 'http_proxy_downloads_direct#show'
    get '/subtitles/:id' => 'subtitles#show'
  end

  get '/templates/*template' => 'templates#show'

  with_options(:to => 'layouts#show', :defaults => { :format => 'html' }) do |route|
    route.get '/search', :as => :empty_search
    route.get '/search/:query', :as => :search, :constraints => { :query => /.+/ }
    route.get '/asset_items/:id', :as => :asset_item
    route.get '/cart', :as => :cart
    route.get '/folders', :as => :folders
    route.get '/folders/:id', :as => :folder
    route.get '/folders/:id/assets/new'
    route.get '/folders/:id/qc_reports'
    route.get '/folders/:id/request_files'
    route.get '/folders/:id/share'
    route.get '/folders/:id/search/:query', :as => :folder_search, :constraints => { :query => /.+/ }
    route.get '/profile', :as => :profile
    route.get '/upload', :as => :upload
    route.get '/activity/users'

    route.get '/activity/users/:id/shares', :as => :shares
    route.get '/activity/users/:id/shares/active'
    route.get '/activity/users/:id/shares/pending'
    route.get '/activity/users/:id/shares/expired'
    route.get '/activity/users/:id/requests/active'
    route.get '/activity/users/:id/requests/expired'
    route.get '/activity/users/:id/uploads'
    route.get '/activity/users/:id/uploads/completed'
    route.get '/activity/users/:id/uploads/failed'
    route.get '/activity/users/:id/uploads/in_progress'

    route.get '/activity/shares'
    route.get '/activity/shares/active'
    route.get '/activity/shares/pending'
    route.get '/activity/shares/expired'
    route.get '/activity/requests'
    route.get '/activity/requests/active'
    route.get '/activity/requests/expired'
    route.get '/activity/uploads'
    route.get '/activity/uploads/completed'
    route.get '/activity/uploads/failed'
    route.get '/activity/uploads/in_progress'
    route.get '/shares/:id'
    route.get '/shares/:id/info'
    route.get '/shares/:id/stats'

    route.get '/advanced_search'

    route.get '/manage/metadata'
    route.get '/manage/thumbnail'
    route.get '/manage/share/:ingest_batch_id'

    route.get '/preferences/general'
    route.get '/preferences/subscriptions'
    route.get '/preferences/users/:id/general'
    route.get '/preferences/users/:id/subscriptions'

    route.get '/dev' if Rails.env.development?
  end

  get 'searches/:uuid/unsubscribe' => 'searches#unsubscribe'
  get '/shares/:uuid/contact_sheet' => 'contact_sheets#show'
  get '/cart/metadata' => redirect('/cart')
  get '/folders/:id/metadata' => redirect('/folders')
  get '/manage/metadata/*template' => redirect('/activity/uploads')

  with_options(:to => 'open_layouts#show') do |route|
    route.get '/share/:id(/:preview)', :as => :share
    route.get '/file_requests/:uuid', :as => :request_files
    route.get '/account_request'
  end

  with_options(:to => 'metrics_layouts#show') do |route|
    route.get '/metrics'
    route.get '/metrics/*template'
  end

  get '/privacy' => 'static_layouts#privacy_policy'
  get '/terms' => 'static_layouts#terms_of_use'

  resources :simple_form, :only => [:index]

  resources :styleguide, :only => [:index]

  root :to => redirect('/sign_in')
end
