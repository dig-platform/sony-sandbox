# frozen_string_literal: true

Rails.application.reloader.to_prepare do
  Devise::SessionsController.class_eval do
    protect_from_forgery :except => [:create, :destroy]

    prepend_after_action :set_screen_size, :only => :create

    private

    def set_screen_size
      request.env['warden'].raw_session['warden.screen_size'] = params.dig(:screen, :size)&.to_i
    end
  end
end
