# frozen_string_literal: true

require_relative '../../spec/features/support/ext/mock_upload_middleware'

Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # The test environment is used exclusively to run your application's
  # test suite. You never need to work with it otherwise. Remember that
  # your test database is "scratch space" for the test suite and is wiped
  # and recreated between test runs. Don't rely on the data there!
  config.cache_classes = true

  # Don't do any caching in test
  config.cache_store = :null_store

  # Do not eager load code on boot. This avoids loading your whole application
  # just for the purpose of running a single test. If you are using a tool that
  # preloads Rails for running tests, you may have to set it to true.
  config.eager_load = true

  # Configure static asset server for tests with Cache-Control for performance.
  config.public_file_server.enabled = true
  config.public_file_server.headers = { 'Cache-Control' => 'public, max-age=3600' }

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Raise exceptions instead of rendering exception templates.
  config.action_dispatch.show_exceptions = true

  # Disable request forgery protection in test environment.
  config.action_controller.allow_forgery_protection = false

  # Print deprecation notices to the stderr.
  config.active_support.deprecation = :stderr

  config.middleware.delete Rack::ETag
  config.middleware.insert_before ActionDispatch::Static, MockUploadMiddleware

  # Set errors to JSON output when not in feature specs
  config.debug_exception_response_format = :api unless $ARGV.any? { |a| a =~ /feature/ }

  # Supress logging unless we explicitly enable it
  unless ENV['RAILS_ENABLE_TEST_LOG']
    config.logger = Logger.new(nil)
    config.log_level = :fatal
  end
end