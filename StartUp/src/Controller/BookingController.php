<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Repository\RideRepository;
use App\Repository\UserRepository;
use App\Repository\BookingRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class BookingController
{
    #[Route('/booking', name: 'create_booking', methods: ['POST'])]
    public function createBooking(
        Request $request,
        RideRepository $rideRepo,
        UserRepository $userRepo,
        EntityManagerInterface $em
    ): JsonResponse {
        $rideId = $request->get('ride_id');
        $userId = $request->get('user_id');

        $ride = $rideRepo->find($rideId);
        $user = $userRepo->find($userId);

        if (!$ride || !$user) {
            return new JsonResponse(['error' => 'Ride or User not found'], 404);
        }

        // Vérifie les places disponibles
        if ($ride->getAvailableSeats() <= 0) {
            return new JsonResponse(['error' => 'No available seats'], 400);
        }

        // Crée la réservation
        $booking = new Booking();
        $booking->setRide($ride);
        $booking->setUser($user);
        $booking->setStatus('confirmed');
        $booking->setCreditsUsed(1);
        $booking->setCreatedAt(new \DateTimeImmutable());

        // Mise à jour des places dans le trajet
        $ride->decreaseAvailableSeats(1);

        $em->persist($booking);
        $em->persist($ride);
        $em->flush();

        return new JsonResponse(['message' => 'Booking created successfully']);
    }
    #[Route('/booking/{id}', name: 'delete_booking', methods: ['DELETE'])]
    public function deleteBooking(
        int $id,
        BookingRepository $bookingRepo,
        EntityManagerInterface $em
    ): JsonResponse {
        // Récupérer la réservation par son ID
        $booking = $bookingRepo->find($id);

        if (!$booking) {
            return new JsonResponse(['error' => 'Booking not found'], 404);
        }

        // Récupérer le trajet associé pour remettre les places disponibles
        $ride = $booking->getRide();
        if ($ride) {
            $ride->setAvailableSeats($ride->getAvailableSeats() + 1);
        }

        // Supprimer la réservation
        $em->remove($booking);
        $em->flush();

        return new JsonResponse(['message' => 'Booking deleted successfully']);
    }
}