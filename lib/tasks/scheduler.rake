desc "This task is called by the Heroku scheduler add-on"
task :update_jobs => :environment do
  puts "Configuring New DB"
  Rake::Task["db:migrate"].invoke
  puts "Updating Jobs..."
  Rake::Task["import:jobs"].invoke('posted')
  puts "Performing Index..."
  Rake::Task["chewy:reset"].invoke
end
