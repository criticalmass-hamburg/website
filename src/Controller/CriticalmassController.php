<?php declare(strict_types=1);

namespace App\Controller;

use App\Ride\RideFetcher;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CriticalmassController extends AbstractController
{
    #[Route('/', name: 'frontpage')]
    public function index(RideFetcher $rideFetcher): Response
    {
        return $this->render('index.html.twig', [
            'ride' => $rideFetcher->fetch(true),
        ]);
    }

    #[Route('/privacy', name: 'privacy')]
    public function privacy(): Response
    {
        return $this->render('privacy.html.twig');
    }

    #[Route('/impress', name: 'impress')]
    public function impress(): Response
    {
        return $this->render('impress.html.twig');
    }
}
