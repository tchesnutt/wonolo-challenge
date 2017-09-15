# README

## The Idea
  When I was checking out your platform, I didn't see any way to find out what work was available in my area without having to sign up and go through orientation.

  So, I thought it'd be cool to build a tool to remedy that.

  ---

## Implementation
  I sought to accomplish this task with Rails and React. Firstly, because both make up a large part of the Wonolo stack and, second, because I used both in the past.

  The idea is to, at the 12am each day:

  1) Drop the db of the preceding day.

  2) Make a call to your api at the following address:

  ```
  https://api.wonolo.com/api_v2/job_requests?state=posted
  ```

  to grab a list of all unfulfilled job requests whose state is 'posted' and save them to the db.

  To do this I used a postgresql database and the `rest-client` gem.

  An important step in allowing users to search by distance in relation to a location is to index each job's geospacial data with Elastisearch.

  To do this I used the gem `chewy`. Defining the indexing as follows:
  ```ruby
    class JobsIndex < Chewy::Index
      define_type Job do
        field :location, type: 'geo_point', value: ->{ {lat: latitude, lon: longitude} }
      end
    end
  ```

  Another key part of the this process is figuring out the coordinates of a User from either their address and/or city. To do this I used the gem `geocoder`. When deploying, I encountered the following: `"Google API error: over query limit."` To circumvent, I googled the error, and came across a quick solution. Caching searches with Redis. I used the heroku addon and amended my `geocoder.rb` file with:

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

  
