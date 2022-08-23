# frozen_string_literal: true

require File.expand_path('boot', __dir__)
require 'rails'

%w[
  active_record/railtie
  action_controller/railtie
  action_view/railtie
  active_job/railtie
  action_cable/engine
].each do |railtie|
  require railtie
rescue LoadError
  # railtie not available
end

require_relative 'initializers/request_modifier'
require_relative 'initializers/dotenv'

Bundler.require(*Rails.groups)

module Phoenix
  class Application < Rails::Application
    config.app_name = 'Runner'

    # Autoloading defaults for zeitwork
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    config.i18n.default_locale = :en

    # Use pry as the default Rails console
    console do
      require 'pry'
      require 'rails/console/app'
      require 'rails/console/helpers'
      config.console = Pry
      Pry.config.prompt_name = 'rails'
      TOPLEVEL_BINDING.eval('self').extend Rails::ConsoleMethods
    end

    config.generators do |g|
      g.test_framework :rspec
    end

    config.to_prepare do
      Devise::SessionsController.layout 'sign_in'
    end

    config.active_record.schema_format = :sql
    config.active_record.observers = %i[
      elasticsearch_folder_observer
      elasticsearch_user_observer
      elasticsearch_title_observer
    ]

    config.autoload_paths << Rails.root.join('lib').to_s
    config.autoload_paths << Rails.root.join('app', 'helpers').to_s
    config.eager_load_paths << Rails.root.join('lib').to_s

    config.i18n.available_locales = [:en]

    require Rails.root.join('app', 'services', 'redis_service')
    config.cache_store = :redis_cache_store, {
      :url => RedisService.url_for('redis-cache.yml.erb'),
      :namespace => Rails.application.secrets.redis_cache
    }

    config.active_job.queue_adapter = :delayed_job
    config.active_job.queue_name_prefix = Rails.env

    config.action_cable.allowed_request_origins = [
      %r{https://#{ENV['RUNNER_HOSTNAME']}}
    ]
    config.action_cable.logger = Logger.new(nil)
  end
end

# Set the connection now that the usernames and passwords are in ENV.
# By default establish_connection is called prior to initializers.
erb = ERB.new(File.read('config/database.yml'))
yaml = YAML.load(erb.result)[Rails.env]
ActiveRecord::Base.establish_connection yaml
