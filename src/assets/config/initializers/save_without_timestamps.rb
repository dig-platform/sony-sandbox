# frozen_string_literal: true

class ActiveRecord::Base
  def save_without_timestamps
    class << self
      def record_timestamps
        false
      end
    end

    save!

    class << self
      remove_method :record_timestamps
    end

    self
  end
end
