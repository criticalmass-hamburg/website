<?php declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CriticalmassController extends Controller
{
    /**
     * @Route("/")
     */
    public function index(): Response
    {
        return $this->render('index.html.twig');
    }
}
