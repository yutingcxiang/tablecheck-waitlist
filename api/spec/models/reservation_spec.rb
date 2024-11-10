require 'rails_helper'
require 'spec_helper'

RSpec.describe Reservation, type: :model do
  subject {
    described_class.new(
      name: "Sam",
      party_size: 2,
    )
  }
  
  after(:each) do
    subject.remove_from_queue
  end

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a name" do
    subject.name = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a party_size" do
    subject.party_size = nil
    expect(subject).to_not be_valid
  end

  it "is not valid for a party_size over 10" do
    subject.party_size = 20
    expect(subject).to_not be_valid
  end

  it "returns the correct capacity" do
    expect(subject.can_be_seated?).to eq(true)
  end

  it "returns the correct position" do
    expect(subject.position).to eq(1)
  end
end
