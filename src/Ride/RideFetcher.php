<?php declare(strict_types=1);

namespace App\Ride;

use App\Model\Ride;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class RideFetcher
{
    const API_URL = 'https://criticalmass.in/api/hamburg/current';
    const API_FORMAT = 'json';

    public function __construct(
        protected HttpClientInterface $httpClient,
        protected SerializerInterface $serializer
    ) {
    }

    public function fetch(bool $regular = false): ?Ride
    {
        $queryVars = [];

        if ($regular) {
            $queryVars = [
                'cycleMandatory' => true,
                'slugsAllowed' => false,
            ];
        }

        $response = $this->httpClient->request('GET', self::API_URL, [
            'query' => $queryVars,
        ]);

        if (200 === $response->getStatusCode()) {
            $apiResponse = $response->getContent();

            /** @var Ride $ride */
            $ride = $this->serializer->deserialize(
                $apiResponse,
                Ride::class,
                self::API_FORMAT,
                [
                    DateTimeNormalizer::FORMAT_KEY => 'U',
                ]);

            return $ride;
        }

        return null;
    }
}
