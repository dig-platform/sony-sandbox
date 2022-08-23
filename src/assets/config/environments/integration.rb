# frozen_string_literal: true

require File.expand_path('shared_production', __dir__)

Rails.application.configure do
  config.after_initialize do
    Rails.cache.logger = Rails.logger
  end
end
