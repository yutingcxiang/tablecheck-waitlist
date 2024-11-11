require 'pry'
class Reservation < ApplicationRecord
    after_initialize :add_to_queue
    before_save :get_position

    MAX_CAPACITY = 10
    MIN_CAPACITY = 0
    SERVICE_TIME_PER_PERSON = 3.seconds
    @@WAITLIST = []
    @@AVAILABLE_SEATS = 10

    validates_presence_of :name, allow_empty: false
    validates :party_size, numericality: { less_than_or_equal_to: MAX_CAPACITY, greater_than: MIN_CAPACITY,  only_integer: true }

    def add_to_queue
        @@WAITLIST << self
        @@AVAILABLE_SEATS -= self.party_size
        @position = @@WAITLIST.length
    end

    def remove_from_queue
        @@WAITLIST.pop
        @@AVAILABLE_SEATS += self.party_size if self.party_size
        @position = -1
    end

    def get_position
        self.position = @position || -1
    end

    def self.available_seats
        @@AVAILABLE_SEATS
    end

    def self.waitlist
        @@WAITLIST
    end
end
