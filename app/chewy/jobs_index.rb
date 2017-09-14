class JobsIndex < Chewy::Index
  define_type Job do
    field :category
    field :address
    field :city
    field :venue
    field :location, type: 'geo_point', value: ->{ {lat: latitude, lon: longitude} }
  end
end
