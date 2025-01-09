<?php

namespace App\Controller;


use App\Entity\Avisvalidation;
use App\Repository\AvisvalidationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class AvisvalidationController extends AbstractController
{

    #[Route('/api/avisvalidation', methods: ['POST'])]
    public function addAvisvalidation(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $avisvalidation = new Avisvalidation();
        $avisvalidation->setName($data['name']);
        $avisvalidation->setCommentaire($data['commentaire']);
        $avisvalidation->setcreatedAt(new \DateTimeImmutable($data['date']));
        $avisvalidation->setConducteur($data['conducteur']);

        $em->persist($avisvalidation);
        $em->flush();

        return $this->json(['status' => 'Avisvalidation created'], 201);
    }


    #[Route('/api/avisvalidation', methods: ['GET'])]
    public function getAllAvisvalidation(AvisvalidationRepository $avisvalidationRepository): JsonResponse
    {
        $avisvalidation = $avisvalidationRepository->findAll();

        $data = array_map(fn(Avisvalidation $avisvalidation) => [
            'id' => $avisvalidation->getId(),
            'name' => $avisvalidation->getName(),
            'commentaire' => $avisvalidation->getCommentaire(),
            'date' => $avisvalidation->getcreatedAt()->format('Y-m-d'),
            'conducteur' => $avisvalidation->getConducteur(),
        ], $avisvalidation);

        return $this->json($data);
    }


    #[Route('/api/avisvalidation/{id}', methods: ['DELETE'])]
    public function deleteAvisvalidation(int $id, AvisvalidationRepository $avisvalidationRepository, EntityManagerInterface $em): JsonResponse
    {
        $avisvalidation = $avisvalidationRepository->find($id);

        if (!$avisvalidation) {
            return $this->json(['error' => 'Avisvalidation not found'], 404);
        }

        $em->remove($avisvalidation);
        $em->flush();

        return $this->json(['status' => 'Avisvalidation deleted'], 200);
    }
}