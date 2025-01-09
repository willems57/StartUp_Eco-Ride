<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Entity\Trajet;
use App\Entity\User;
use App\Repository\ReservationRepository;
use App\Repository\TrajetsRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ReservationController extends AbstractController
{
    #[Route('/api/reservation', methods: ['GET'])]
    public function getAllReservations(ReservationRepository $reservationRepository): JsonResponse
    {
        $reservations = $reservationRepository->findAll();

        $data = array_map(function (Reservation $reservation) {
            return [
                'id' => $reservation->getId(),
                'trajets' => [
                    'id' => $reservation->getTrajets()->getId(),
                    'depart' => $reservation->getTrajets()->getDepart(),
                    'arrive' => $reservation->getTrajets()->getArrive(),
                    'date' => $reservation->getTrajets()->getDate()->format('Y-m-d H:i:s'),
                ],
                'passager' => [
                    'id' => $reservation->getUser()->getId(),
                    'nom' => $reservation->getUser()->getfirstName(),
                    'email' => $reservation->getUser()->getEmail(),
                ],
            ];
        }, $reservations);

        return $this->json($data);
    }

    #[Route('/api/reservation', methods: ['POST'])]
    public function createReservation(
        Request $request,
        TrajetsRepository $trajetsRepository,
        UserRepository $userRepository,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $trajets = $trajetsRepository->find($data['trajets_id']);
        if (!$trajets) {
            return $this->json(['error' => 'Trajets not found'], 404);
        }

        $user = $userRepository->find($data['user_id']);
        if (!$user) {
            return $this->json(['error' => 'User not found'], 404);
        }

        if ($trajets->getPlacesDisponibles() <= 0) {
            return $this->json(['error' => 'No available seats on this trajet'], 400);
        }

        $reservation = new Reservation();
        $reservation->setTrajets($trajets);
        $reservation->setUser($user);

        // Réduire le nombre de places disponibles
        $trajets->setPlacesDisponibles($trajets->getPlacesDisponibles() - 1);

        $em->persist($reservation);
        $em->flush();

        return $this->json(['status' => 'Reservation created'], 201);
    }

    #[Route('/api/reservation/{id}', methods: ['PUT'])]
    public function updateReservation(
        int $id,
        Request $request,
        ReservationRepository $reservationRepository,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $reservation = $reservationRepository->find($id);

        if (!$reservation) {
            return $this->json(['error' => 'Reservation not found'], 404);
        }

        $reservation->setStatut($data['statut'] ?? $reservation->getStatut());

        $em->flush();

        return $this->json(['status' => 'Reservation updated'], 200);
    }

    #[Route('/api/reservation/{id}', methods: ['DELETE'])]
    public function deleteReservation(
        int $id,
        ReservationRepository $reservationRepository,
        EntityManagerInterface $em
    ): JsonResponse {
        $reservation = $reservationRepository->find($id);

        if (!$reservation) {
            return $this->json(['error' => 'Reservation not found'], 404);
        }

        // Restaurer le nombre de places disponibles
        $trajets = $reservation->getTrajet();
        $trajets->setPlacesDisponibles($trajets->getPlacesDisponibles() + 1);

        $em->remove($reservation);
        $em->flush();

        return $this->json(['status' => 'Reservation deleted'], 200);
    }
}
