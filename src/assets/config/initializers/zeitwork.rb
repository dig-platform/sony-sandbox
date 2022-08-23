# frozen_string_literal: true

Rails.autoloaders.each do |autoloader|
  autoloader.ignore "#{Rails.root}/lib/ext"
  autoloader.ignore "#{Rails.root}/lib/gigya_client"
  autoloader.ignore "#{Bundler.bundle_path}/gems/devise-*/app/mailers/devise/mailer.rb"
end
