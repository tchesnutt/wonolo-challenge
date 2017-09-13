class CreateJoinTableJobBadge < ActiveRecord::Migration[5.1]
  def change
    create_join_table :jobs, :badges do |t|
      # t.index [:job_id, :badge_id]
      # t.index [:badge_id, :job_id]
    end
  end
end
