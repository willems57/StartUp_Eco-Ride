<?php

namespace App\Controller;


use App\Entity\Avis;
use App\Entity\Trajetsfini;
use App\Repository\AvisRepository;
use App\Repository\TrajetsfiniRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AvisController extends AbstractController
{
    #[Route('/api/avis', methods: ['GET'])]
    public function getAllAvis(AvisRepository $avisRepository): JsonResponse
    {
        $avis = $avisRepository->findAll();

        $data = array_map(function (Avis $avis) {
            return [
                'id' => $avis->getId(),
                'commentaire' => $avis->getCommentaire(),
                'note' => $avis->getNote(),
                'date' => $avis->getcreatedAt()->format('Y-m-d'),
                'trajetsfini' => $avis->getConducteur() ? [
                    'id' => $avis->getConducteur()->getId(),
                    'description' => $avis->getConducteur()->getDepart(),
                    'date' => $avis->getConducteur()->getDate()->format('Y-m-d'),
                ] : null,
            ];
        }, $avis);

        return $this->json($data);
    }

    #[Route('/api/avis', methods: ['POST'])]
    public function createAvis(
        Request $request,
        TrajetsfiniRepository $trajetsfiniRepository,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $avis = new Avis();
        $avis->setCommentaire($data['commentaire']);
        $avis->setNote($data['note']);
        $avis->setcreatedAt(new \DateTimeImmutable($data['date']));

        if (isset($data['trajetsfini_id'])) {
            $trajetsfini = $trajetsfiniRepository->find($data['trajetsfini_id']);
            if (!$trajetsfini) {
                return $this->json(['error' => 'Trajetsfini not found'], 404);
            }
            $avis->setConducteur($trajetsfini);
        }

        $em->persist($avis);
        $em->flush();

        return $this->json(['status' => 'Avis created'], 201);
    }

    #[Route('/api/avis/{id}', methods: ['PUT'])]
    public function updateAvis(
        int $id,
        Request $request,
        AvisRepository $avisRepository,
        TrajetsfiniRepository $trajetsfiniRepository,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $avis = $avisRepository->find($id);

        if (!$avis) {
            return $this->json(['error' => 'Avis not found'], 404);
        }

        $avis->setCommentaire($data['commentaire'] ?? $avis->getCommentaire());
        $avis->setNote($data['note'] ?? $avis->getNote());
        $avis->setDate(new \DateTime($data['date'] ?? $avis->getDate()->format('Y-m-d')));

        if (isset($data['trajetsfini_id'])) {
            $trajetsfini = $trajetsfiniRepository->find($data['trajetsfini_id']);
            if (!$trajetsfini) {
                return $this->json(['error' => 'Trajetsfini not found'], 404);
            }
            $avis->setTrajetfini($trajetsfini);
        }

        $em->flush();

        return $this->json(['status' => 'Avis updated'], 200);
    }

    #[Route('/api/avis/{id}', methods: ['DELETE'])]
    public function deleteAvis(
        int $id,
        AvisRepository $avisRepository,
        EntityManagerInterface $em
    ): JsonResponse {
        $avis = $avisRepository->find($id);

        if (!$avis) {
            return $this->json(['error' => 'Avis not found'], 404);
        }

        $em->remove($avis);
        $em->flush();

        return $this->json(['status' => 'Avis deleted'], 200);
    }
}