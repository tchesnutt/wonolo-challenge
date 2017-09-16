namespace :import do
  desc "Import Posted Jobs from Wonolo API"
  task :jobs, [:state] => :environment do |t, args|
    get_token = RestClient.post('https://api.wonolo.com/api_v2/authenticate',
                               {api_key: ENV['API_KEY'], secret_key: ENV['SECRET_KEY']})
    token = JSON.parse(get_token.body)['token']

    page = 1
    job_response = RestClient.get('https://api.wonolo.com/api_v2/job_requests',
                              params:{state: args[:state],
                                      token: token,
                                      page: page,
                                      per: 50})
    job_list = JSON.parse(job_response)['job_requests']
    while job_list.length > 0
      job_list.each do |j|
        job = Job.new(
          job_id: j["id"],
          category: j["category"],
          address: j["address"],
          city: j["city"],
          venue: j["venue"],
          description: j["description"],
          w2_hourly_rate: j["w2_hourly_rate"],
          wage: j["wage"],
          duration: j["duration"],
          latitude: j["latitude"],
          longitude: j["longitude"])
        j["badge_requirements"].each do |b|
          job.badges << Badge.find_or_create_by(name: b["badge_name"],
                                                icon_url: b["badge_icon_url"],
                                                description: b["badge_description"])
        end
        job.save
        puts "#{job.job_id} - imported"
        end
      page += 1
      job_response = RestClient.get('https://api.wonolo.com/api_v2/job_requests',
                                params:{state: args[:state],
                                        token: token,
                                        page: page,
                                        per: 50})
      job_list = JSON.parse(job_response)['job_requests']
    end
  end

end
