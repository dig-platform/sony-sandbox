# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors, :debug => Rails.env.development? do
  allow do
    origins 'localhost:3000',
            '127.0.0.1:3000',
            %r{\Ahttps://[a-z0-9\-_]*.?sonypicturesrunner.com\z},
            'https://sony.sharepoint.com'
    resource %r{/api/v\d+/(?!admin).*}, :headers => :any, :methods => %i[get post patch delete options head]
    resource %r{/oauth/*}, :methods => %i[post options head]
  end
end
