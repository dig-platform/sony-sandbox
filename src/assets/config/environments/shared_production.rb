# frozen_string_literal: true

require 'syslogger'

Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # Verifies that versions and hashed value of the package contents in the project's package.json
  config.webpacker.check_yarn_integrity = false

  # Code is not reloaded between requests.
  config.cache_classes = true

  # Eager load code on boot. This eager loads most of Rails and
  # your application in memory, allowing both thread web servers
  # and those relying on copy on write to perform better.
  # Rake tasks automatically ignore this option for performance.
  config.eager_load = true

  # Full error reports are disabled and caching is turned on.
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  # Enable Rack::Cache to put a simple HTTP cache in front of your application
  # Add `rack-cache` to your Gemfile before enabling this.
  # For large-scale production use, consider using a caching reverse proxy like nginx, varnish or squid.
  # config.action_dispatch.rack_cache = true

  # Disable Rails's static asset server (Apache or nginx will already do this).
  config.public_file_server.enabled = false

  # Compress JavaScripts and CSS.
  # config.assets.css_compressor = :sass

  # Specifies the header that your server uses for sending files.
  # config.action_dispatch.x_sendfile_header = "X-Sendfile" # for apache
  # config.action_dispatch.x_sendfile_header = 'X-Accel-Redirect' # for nginx

  # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
  config.force_ssl = true

  # Use a different logger for distributed setups.
  config.logger = Syslogger.new('runner', Syslog::LOG_PID, Syslog::LOG_LOCAL7)
  config.lograge.enabled = true
  config.lograge.formatter = Lograge::Formatters::Json.new

  # include parameters in log messages
  SKIP_PARAMS = %w[format controller action].freeze
  config.lograge.custom_options = lambda do |event|
    params = event.payload[:params].except(*SKIP_PARAMS)
    {
      'app' => config.app_name,
      'params' => params,
      'pid' => Process.pid,
      'uuid' => event.payload[:headers]['uuid']
    }
  end

  # Set to :debug to see everything in the log.
  config.log_level = :info

  # Use a different cache store in production.
  # config.cache_store = :mem_cache_store

  # Enable serving of images, stylesheets, and JavaScripts from an asset server.
  # config.action_controller.asset_host = "http://assets.example.com"

  # Ignore bad email addresses and do not raise email delivery errors.
  # Set this to true and configure the email server for immediate delivery to raise delivery errors.
  # config.action_mailer.raise_delivery_errors = false

  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation can not be found).
  config.i18n.fallbacks = [I18n.default_locale]
  # eager load translations on boot
  config.eager_load_namespaces << I18n

  # Send deprecation notices to registered listeners.
  config.active_support.deprecation = :notify

  # Disable automatic flushing of the log to improve performance.
  # config.autoflush_log = false
end
