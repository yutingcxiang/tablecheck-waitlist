class CreateReservationsTable < ActiveRecord::Migration[7.2]
  def change
    create_table :reservations do |t|
      t.string :name, default: "", null: false
      t.integer :party_size, default: 0, null: false
      
      t.timestamps
    end
  end
end
