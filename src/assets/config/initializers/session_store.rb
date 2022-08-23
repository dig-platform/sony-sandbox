# frozen_string_literal: true

# Be sure to restart your server when you modify this file.

config_file = Rails.root.join('config', 'redis-session-store.yml.erb')
redis_config = YAML.load(Tilt.new(config_file).render)[Rails.env]
host = redis_config['host']
port = redis_config['port']

Rails.application.config.session_store :redis_store,
                                       :servers => [{
                                         :host => host,
                                         :port => port,
                                         :namespace => Rails.application.secrets.redis_session,
                                       }],
                                       :key => '_runner_session',
                                       :expires_in => (ENV['SESSION_TIMEOUT_IN_MINUTES']&.to_i || 60).minutes
