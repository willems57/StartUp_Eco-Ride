<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class TrajetsencoursController extends AbstractController
{
    #[Route('/trajetsencours', name: 'app_trajetsencours')]
    public function index(): Response
    {
        return $this->render('trajetsencours/index.html.twig', [
            'controller_name' => 'TrajetsencoursController',
        ]);
    }
}
