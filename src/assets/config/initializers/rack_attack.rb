# frozen_string_literal: true

Rack::Attack.cache.store = ActiveSupport::Cache::RedisCacheStore.new(
  :namespace => Rack::Attack.name,
  :url => RedisService.url_for('redis-cache.yml.erb')
)

Rack::Attack.throttle('limit logins by username', limit: 6, period: 60) do |req|
  req.params.dig('user', 'username') if req.path == '/sign_in' && req.post?
end
