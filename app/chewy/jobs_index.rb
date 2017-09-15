class JobsIndex < Chewy::Index
  define_type Job do
    field :location, type: 'geo_point', value: ->{ {lat: latitude, lon: longitude} }
  end
end
