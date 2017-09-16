# Wonolyagot

## The Idea
  When I was checking out your platform, I didn't see any way to find out what work was available in my area without having to sign up and go through orientation.

  So, I thought it'd be cool to build a tool to remedy that.

## Implementation
### Backend
  I sought to accomplish this task with Rails and React. Firstly, because both make up a large part of the Wonolo stack and, second, because I used both in the past.

  The idea is to, at the 12am each day:

  1) Drop the db of the preceding day.

  2) Make a call to your api at the following address:

  ```
  https://api.wonolo.com/api_v2/job_requests?state=posted
  ```

  to grab a list of all unfulfilled job requests whose state is 'posted' and save them to the db.

  To do this I used a postgresql database and the `rest-client` gem.

  The next step in allowing users to search by distance in relation to a location, is to index each job's geospacial data with Elastisearch.

  To do this I used the gem `chewy`. Defining the indexing as follows:
  ```ruby
    class JobsIndex < Chewy::Index
      define_type Job do
        field :location, type: 'geo_point', value: ->{ {lat: latitude, lon: longitude} }
      end
    end
  ```

  Another key part of the this process is figuring out the coordinates of a User from either their address and/or city. To do this I used the gem `geocoder`. When deploying, I encountered the following: `"Google API error: over query limit."` To circumvent, I googled the error, and came across a quick solution. Caching searches with Redis. I used the heroku addon `Redis To Go` and amended my `geocoder.rb` file with:

  ```ruby
    Geocoder.configure(
      lookup: :google,
      cache: REDIS,
      always_raise: [
        Geocoder::OverQueryLimitError,
        Geocoder::RequestDenied,
        Geocoder::InvalidRequest,
        Geocoder::InvalidApiKey
      ]
    )
  ```

  When a user requests job postings, I noticed that in the results I would get several results for the same location. I assumed this meant a client needed several worker for the same job. In the scope of this project, such information was not needed. To handle serving job postings back to the frontend, I used a Set containing coordinates for jobs. When looping through a query's results, if a job's coordinates were not it the Set it sent to frontend:
  ```ruby
    def index
      if !params[:address].nil?
        # define a result array
        @jobs = []
        # find the coordinates to the user's search
        @location = address_to_geolocation("#{params[:address]}, #{params[:city]} #{params[:zip]}")
        # find all jobs within a certain distance
        identified_jobs = search_by_location.load
        # define a set for job coordinates
        locations = Set.new
        # loop through identified jobs and only add them to the result array if they're coordinates are not within the Set
        identified_jobs.each do |j|
          job = Job.find_by_id(j.id)
          coord = [job['latitude'], job['longitude']]
          if !locations.include?(coord)
            @jobs << job
            locations.add(coord)
          end
        end
      end

      render 'api/jobs/index'
    end
  ```

### Frontend
  Composed of react and redux. A simple form is used to collect the parameters a user want's to search with. An important note of `geocoder` is that that users do not need to input an exact address. Due to that, the only validations on the form are whether distance exists and that it can be converted to a valid integer.

  The store of the app is structured as follows:
  ```javascript
  {
    searchResult: {
      loc: {
        // coordinates to center map go here
      },
      jobs: [
        // array of job objects go here
      ]
    }
  }
  ```

  I used `google-maps-react` to implement a map to display job postings. In clicking on a pin, the index of that job pin is used to select the correct job object from the array or jobs. That job's information is then served to the `InfoWindow` which then appears above the pin.

### Thoughts And Concerns Moving Forward
  1) Styling is an issue. Could use a css library like Bulma to clean it up. Could be cool to recolor the markers yellow and have the Wonolo logo on them.

  2) Something is going on with searching over long areas. Example:

  Searching City='San Francisco' Distance='1000' => One job in South San Francisco

  Searching City='San Diego' Distance='1000' => One job in Los Angeles

  The distance between these two cities is far less than 1000mi. So, that's weird.

  3) More Tests. I one wrote tests for one reducer.
