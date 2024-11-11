require 'pry'
class Reservation < ApplicationRecord
    before_save :set_position
    before_destroy :update_positions

    MAX_CAPACITY = 10
    MIN_CAPACITY = 0
    STARTING_POSITION = 0

    validates_presence_of :name, allow_empty: false
    validates :party_size, numericality: { less_than_or_equal_to: MAX_CAPACITY, greater_than: MIN_CAPACITY,  only_integer: true }

    def set_position 
       self.position ||= Reservation.count
    end

    def update_positions
        reservations = Reservation.where("position > ?", self.position)
        reservations.each do |reservation|
            reservation.position -= 1
            reservation.save
        end
    end
end
