# frozen_string_literal: true

Delayed::Worker.delay_jobs = !Rails.env.test?
Delayed::Worker.logger = Logger.new(File.join(Rails.root, 'log', 'delayed_job.log')) unless Rails.env.test?

# undo the methods in OpenStruct inherited by delayed job adding to Object in ldelayed_job-4.1.9/ib/delayed_job.rb
[:send_at, :send_later, :delay, :__delay__].each do |method|
  OpenStruct.undef_method(method)
end
