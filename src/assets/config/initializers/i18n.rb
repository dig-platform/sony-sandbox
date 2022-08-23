# frozen_string_literal: true

# require_relative 'inflections'
#
# module RunnerI18n
#   def self.create_backend_chain!
#     Backend::Chain.new
#   end
#
#   module Backend
#     class Chain < I18n::Backend::Chain
#       def initialize
#         super(redis_store, default)
#       end
#
#       def initialized?
#         backends.all? do |backend|
#           !backend.respond_to?(:initialized?) || backend.initialized?
#         end
#       end
#
#       def translations
#         default.send(:translations).tap do |hash|
#           I18n.available_locales.each do |locale|
#             translations = translations_for(locale)
#             if translations && translations[:vocabulary]
#               translations[:vocabulary] = translations[:vocabulary].except(*Vocabulary::IGNORE_VOCABULARY_LIST)
#               hash.deep_merge!({ locale => translations })
#             end
#           end
#         end
#       end
#
#       def init_translations; end
#
#       private
#
#       def redis_store
#         @redis_store ||= RedisStore.new
#       end
#
#       def default
#         @default ||= I18n::Backend::Simple.new
#       end
#
#       def translations_for(locale)
#         begin
#           redis_store.translate(locale, RedisStore::SCOPE, :scope => nil)
#         rescue ArgumentError
#           nil
#         end
#       end
#     end
#
#     class RedisStore < I18n::Backend::KeyValue
#       SCOPE = Rails.application.secrets.redis_i18n
#       attr_reader :redis
#
#       def initialize
#         super(redis)
#       end
#
#       def redis
#         @redis ||= RedisService.redis
#       end
#
#       def translate(*args)
#         args << {} unless args.last.is_a?(Hash)
#         args.last[:scope] = SCOPE unless args.last.has_key?(:scope)
#         super
#       end
#
#       def store_translations(locale, data, options = {})
#         super(locale, { SCOPE => data }, options)
#       end
#     end
#   end
# end

I18n.config.enforce_available_locales = true
# I18n.backend = RunnerI18n.create_backend_chain!
