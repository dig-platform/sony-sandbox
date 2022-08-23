# frozen_string_literal: true

require 'dotenv'

dotenv_base = File.join('config', 'dotenv')

[
  File.join(dotenv_base, 'default.env'),
  File.join(dotenv_base, "#{ENV['RAILS_ENV']}.env"),
  File.join(dotenv_base, "#{ENV['RAILS_ENV']}.secrets.env"),
].each do |file|
  Dotenv.overload file
end
