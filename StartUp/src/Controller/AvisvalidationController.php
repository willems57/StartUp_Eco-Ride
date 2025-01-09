<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AvisvalidationController extends AbstractController
{
    #[Route('/avisvalidation', name: 'app_avisvalidation')]
    public function index(): Response
    {
        return $this->render('avisvalidation/index.html.twig', [
            'controller_name' => 'AvisvalidationController',
        ]);
    }
}
