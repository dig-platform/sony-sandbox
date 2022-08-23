# frozen_string_literal: true

module RegularExpressions
  EMAIL = /\A[a-z0-9][^@]*@[^@]+\.[a-z]+\z/i.freeze
  ISO_8601 = /(.+T.+)(?:Z|-|\+)/.freeze
  SPE_SONY_EMAIL = /\A[a-z0-9][^@]*@spe\.sony\.com\z/i.freeze
  UUID = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/.freeze
end
