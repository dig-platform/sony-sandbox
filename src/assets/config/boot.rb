# frozen_string_literal: true

ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.

# Speed up boot time by caching expensive operations.
require 'bootsnap/setup' unless ENV['DISABLE_BOOTSNAP'] != 'false'
