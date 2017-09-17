class Api::JobsController < ApplicationController

  def index
    if !params[:address].nil?
      @jobs = []
      @location = address_to_geolocation("#{params[:address]}, #{params[:city]} #{params[:zip]}")
      identified_jobs = search_by_location.load
      locations = Set.new
      identified_jobs.each do |j|
        job = Job.find_by_id(j.id)
        coord = [job['latitude'], job['longitude']]
        if !locations.include?(coord)
          @jobs << job
          locations.add(coord)
        end
      end
    end
    puts "Serving #{@jobs.length} jobs"
    render 'api/jobs/index'
  end

  private

  def address_to_geolocation(address)
    res = Geocoder.search(address)
    res.first.geometry['location']
  end

  def search_by_location
    jobs = JobsIndex.filter { match_all }
    near_jobs = jobs.filter(geo_distance: {
      distance: "#{params[:dist]}",
      location: { lat: @location['lat'], lon: @location['lng']}
    })
    sorted_near_jobs = near_jobs.order(_geo_distance: {
      location: { lat: @location['lat'], lon: @location['lng'] }
    })
    sorted_near_jobs
  end
end
