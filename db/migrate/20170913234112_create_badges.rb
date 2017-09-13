class CreateBadges < ActiveRecord::Migration[5.1]
  def change
    create_table :badges do |t|
      t.string :name
      t.string :icon_url
      t.references :job, foreign_key: true

      t.timestamps
    end
  end
end
