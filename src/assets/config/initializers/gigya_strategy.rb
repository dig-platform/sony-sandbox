# frozen_string_literal: true

# rubocop:disable all

module Devise
  module Strategies
    class Gigya < Base
      include Rails.application.routes.url_helpers

      def error_key_for(user)
        user.access_locked? ? :locked : :error
      end

      def translation_for(key)
        I18n.t("sign_in.#{key}")
      end

      def authenticate!
        uuid = request.uuid
        request.headers['uuid'] = uuid
        Rails.logger.info({
          :message =>"Begin request",
          :path => request.path,
          :pid => Process.pid,
          :uuid => uuid
        }.to_json)
        return fail('bearer token detected') if bearer_token_authorization? || access_token_authorization?

        return fail!(translation_for(:error)) unless username
        user = User.find_by_username(username)

        return fail!(translation_for(:error)) unless user && password
        return fail!(translation_for(:disabled)) unless user.is_active

        if user.skip_idm?
          return fail!(translation_for(error_key_for(user))) unless user.valid_for_authentication? { user.valid_password?(password) }
        else
          return redirect_for_expired_password(user) if login_response.expired_password?
          return fail!(translation_for(error_key_for(user))) unless user.valid_for_authentication? { login_response.valid? }
        end

        user.otp_required_for_login ? redirect_for_2fa(user) : success!(user)
      rescue GigyaClient::HTTPError => e
        Rails.logger.error({
          :message => e.message,
          :backtrace => e.backtrace[0..9]
        }.to_json)
        fail('gigya error')
        if request.format.json?
          # Custom rack response so we serve a JSON error instead of HTML
          custom!([
            500,
            { 'Content-Type' => 'application/json' },
            [{ :error => e.class.name, :message => e.message }.to_json]
          ])
        else
          redirect!('/500-gigya.html')
        end
      end

      private

      def bearer_token_authorization?
        request&.headers&.fetch('HTTP_AUTHORIZATION', nil)&.starts_with?('Bearer')
      end

      def access_token_authorization?
        params['access_token']&.present
      end

      def redirect_for_expired_password(user)
        fail('password expired')
        ResetPasswordService.reset_password_for(user, skip_broadcast: true)
        redirect!(edit_password_path(:reset_token => user.reset_token, :expired => true))
      end

      def redirect_for_2fa(user)
        fail('otp required for login')
        session[:otp_user_id] = user.id

        if user.encrypted_otp_secret? && user.consumed_timestep?
          redirect!('/tfa')
        else
          TwoFactorAuthenticationService.reset_otp(user)
          redirect!('two_factors')
        end
      end

      def is_active?(user)
        user.is_active
      end

      def login_response
        @login_response ||= GigyaClient.login(username, password)
      end

      def username
        @username ||= params['user'] && params['user']['username'].presence.try(:downcase)
      end

      def password
        @password ||= params['user'] && params['user']['password'].presence
      end
    end
  end
end
# rubocop:enable all
