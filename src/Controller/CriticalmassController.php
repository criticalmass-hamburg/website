<?php declare(strict_types=1);

namespace App\Controller;

use App\Ride\RideFetcher;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CriticalmassController extends Controller
{
    /**
     * @Route("/")
     */
    public function index(RideFetcher $rideFetcher): Response
    {
        $ride = $rideFetcher->fetch();

        return $this->render('index.html.twig', [
            'ride' => $ride,
        ]);
    }

    /**
     * @Route("/privacy")
     */
    public function privacy(): Response
    {
        return $this->render('privacy.html.twig');
    }
}
