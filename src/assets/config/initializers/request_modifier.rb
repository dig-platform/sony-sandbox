# frozen_string_literal: true

class RequestModifier
  def initialize(app)
    @app = app
  end

  def call(env)
    unless Rails.env.development? || Rails.env.test?
      env['HTTP_X_FORWARDED_HOST'] = ENV['RUNNER_HOSTNAME']
      env['HTTP_HOST']             = ENV['RUNNER_HOSTNAME']
    end

    # Remove gsub after this bug has been resolved in ruby core:
    # https://bugs.ruby-lang.org/issues/12235
    env['PATH_INFO'] = URI.encode(URI.decode(env['PATH_INFO'])).gsub('[', '%5B').gsub(']', '%5D')

    @status, @headers, @response = @app.call(env)
    [@status, @headers, @response]
  end
end
