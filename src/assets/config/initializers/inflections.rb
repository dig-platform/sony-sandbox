# frozen_string_literal: true

ActiveSupport::Inflector.inflections do |inflect|
  inflect.irregular 'managed_by', 'managers'
  inflect.acronym 'B2B'
  inflect.acronym 'ODIN'
  inflect.acronym 'HTTP'
  inflect.acronym 'VTT'
  inflect.acronym 'UUID'
end
