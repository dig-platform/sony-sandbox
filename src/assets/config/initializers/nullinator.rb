# frozen_string_literal: true

module Nullinator
  extend self

  def method_missing(*args, &block); end # rubocop:disable Style/MethodMissingSuper

  def respond_to_missing?(*)
    true
  end

  def name; end

  def nil?
    true
  end

  def class
    NilClass
  end

  def ===(comparison)
    return true if comparison.nil?
    super
  end

  def ==(other)
    return true if other.nil?
    super
  end
end
