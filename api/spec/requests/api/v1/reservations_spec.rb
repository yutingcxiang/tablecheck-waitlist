require 'rails_helper'

RSpec.describe "Api::V1::Reservations", type: :request do
  let!(:reservation) { Reservation.create(name: "Thomas", party_size: 3) }

  describe "POST /create" do
    context "with valid parameters" do
      let(:reservation_params) { { reservation: { name: "John Doe", party_size: 2 }}}

      it "returns http success" do
        post "/api/v1/reservations", params: reservation_params
        expect(response).to have_http_status(:success)
        expect(Reservation.count).to eq(2)
      end
    end

    context "with invalid parameters" do
      let(:invalid_reservation_params) { { reservation: { name: "John Doe", party_size: 20 }}}

      it "returns http failure" do
        post "/api/v1/reservations", params: invalid_reservation_params
        expect(response). to have_http_status(:unprocessable_entity)
        expect(Reservation.count).to eq(1)
      end
    end
  end

  describe "GET /show" do
    context "with valid id" do
      let(:reservation_params) { { reservation: { id: reservation.id }}}
      it "returns http success" do
        get "/api/v1/reservations", params: reservation_params
        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)["name"]).to eq("Thomas")
        expect(JSON.parse(response.body)["party_size"]).to eq(3)
      end
    end

    context "with invalid id" do
      let(:invalid_reservation_params) { { reservation: { id: 20 }}}
      it "returns http success" do
        get "/api/v1/reservations", params: invalid_reservation_params
        expect(response). to have_http_status(:not_found)
      end
    end
  end

  describe "update" do
    context "with valid parameters" do
      let(:reservation_params) { { reservation: { id: reservation.id,  party_size: 2 }}}
      it "returns http success" do
        put "/api/v1/reservations", params: reservation_params
        expect(response).to have_http_status(:success)
      end
    end

    context "with invalid parameters" do
      let(:invalid_reservation_params) { { reservation: { id: reservation.id,  party_size: 20 }}}
      it "returns http success" do
        put "/api/v1/reservations", params: invalid_reservation_params
        expect(response). to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "destroy" do
    context "with valid id" do
      let(:reservation_params) { { reservation: { id: reservation.id }}}
      it "returns http success" do
        delete "/api/v1/reservations", params: reservation_params
        expect(response).to have_http_status(:success)
      end
    end

    context "with valid id" do
      let(:invalid_reservation_params) { { reservation: { id: 20 }}}
      it "returns http success" do
        delete "/api/v1/reservations", params: invalid_reservation_params
        expect(response). to have_http_status(:not_found)
      end
    end
  end

end
