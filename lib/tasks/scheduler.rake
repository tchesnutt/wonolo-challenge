desc "This task is called by the Heroku scheduler add-on"
task :update_jobs => :environment do
  puts "Dropping Old Data..."
  Rake::Task["db:drop"].invoke
  puts "Configuring New DB"
  Rake::Task["db:setup"].invoke
  puts "Updating Jobs..."
  Rake::Task["import:jobs['posted']"].invoke
  puts "Performing Index..."
  Rake::Task["chewy:reset"].invoke
end
