# frozen_string_literal: true

class ContentResponder < ActionController::Responder
  def api_behavior(*args, &block)
    if put? || patch? || delete?
      display resource, :status => :ok, :location => nil
    else
      super
    end
  end
end
