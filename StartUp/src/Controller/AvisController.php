<?php

namespace App\Controller;


use App\Entity\Avis;
use App\Repository\AvisRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AvisController extends AbstractController
{

    #[Route('/api/avis', methods: ['POST'])]
    public function addAvis(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $avis = new Avis();
        $avis->setName($data['name']);
        $avis->setCommentaire($data['commentaire']);
        $avis->setDate(new \DateTime($data['date']));
        $avis->setConducteur($data['conducteur']);

        $em->persist($avis);
        $em->flush();

        return $this->json(['status' => 'Avis created'], 201);
    }


    #[Route('/api/avis', methods: ['GET'])]
    public function getAllAvis(AvisRepository $avisRepository): JsonResponse
    {
        $avis = $avisRepository->findAll();

        $data = array_map(fn(Avis $avis) => [
            'id' => $avis->getId(),
            'name' => $avis->getName(),
            'commentaire' => $avis->getCommentaire(),
            'date' => $avis->getDate()->format('Y-m-d'),
            'conducteur' => $avis->getConducteur(),
        ], $avis);

        return $this->json($data);
    }


    #[Route('/api/avis/{id}', methods: ['DELETE'])]
    public function deleteAvis(int $id, AvisRepository $avisRepository, EntityManagerInterface $em): JsonResponse
    {
        $avis = $avisRepository->find($id);

        if (!$avis) {
            return $this->json(['error' => 'Avis not found'], 404);
        }

        $em->remove($avis);
        $em->flush();

        return $this->json(['status' => 'Avis deleted'], 200);
    }
}