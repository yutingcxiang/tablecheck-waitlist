class AddPositionToReservations < ActiveRecord::Migration[7.2]
  def change
    add_column :reservations, :position, :integer
  end
end
