# frozen_string_literal: true

# Be sure to restart your server when you modify this file.

# Configure sensitive parameters which will be filtered from the log file.
Rails.application.config.filter_parameters += %i[
  password
  password_confirmation
  ssh_private_key
  credentials.password
  credentials.ssh_private_key
  credentials.aws_secret_key
]
