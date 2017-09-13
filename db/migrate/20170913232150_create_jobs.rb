class CreateJobs < ActiveRecord::Migration[5.1]
  def change
    create_table :jobs do |t|
      t.integer :job_id
      t.string :category
      t.string :address
      t.string :city
      t.string :venue
      t.text :description
      t.float :w2_hourly_rate
      t.float :wage
      t.integer :duration
      t.float :latitude
      t.float :longitude
      t.timestamps
    end
  end
end
