# frozen_string_literal: true

case Rails.env
when 'development', 'test'
  Geocoder.configure(
    :ip_lookup => :test
  )
  Geocoder::Lookup::Test.set_default_stub(
    [
      {
        'coordinates'  => [34.0522, -118.2437],
        'address'      => 'Los Angeles, CA, USA',
        'state'        => 'California',
        'state_code'   => 'CA',
        'country'      => 'United States',
        'country_code' => 'US'
      }
    ]
  )

when 'integration', 'staging', 'production'
  Geocoder.configure(
    :ip_lookup => :geoip2,
    :cache => RedisService.redis,
    :geoip2 => {
      :file => File.join('/', 'opt', 'maxmind', 'GeoLite2-Country.mmdb')
    }
  )
end
