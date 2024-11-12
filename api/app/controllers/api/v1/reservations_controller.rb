class Api::V1::ReservationsController < ApplicationController
  def index 
    reservations = Reservation.all.order(created_at: :desc)
    render json: reservations
  end

  def create
    reservation = Reservation.build(reservation_params)
    if reservation.save
      render json: reservation
    else
      render json: reservation.errors, status: :unprocessable_entity
    end
  end

  def show
    reservation = Reservation.find(reservation_params[:id])
    if reservation
      render json: reservation
    else 
      render json: reservation.errors, status: :not_found
    end
  end

  def update
    reservation = Reservation.find(reservation_params[:id])
    if reservation
      reservation.update!(reservation_params)
      render json: @reservation
    else
      render json: @reservation.errors, status: :unprocessable_entity
    end
  end

  def destroy
    reservation = Reservation.find(reservation_params[:id])
    if reservation.destroy
      render json: { message: 'Reservation deleted!' }
    else
      render json: reservation.errors, status: :not_found
    end
  end

  def reservation_params
    params.permit(:name, :party_size, :id)
  end
end
