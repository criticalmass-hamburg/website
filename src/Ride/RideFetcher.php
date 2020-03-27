<?php declare(strict_types=1);

namespace App\Ride;

use App\Model\Ride;
use Curl\Curl;
use JMS\Serializer\SerializerInterface;

class RideFetcher
{
    const API_URL = 'https://criticalmass.in/api/hamburg/current';
    const API_FORMAT = 'json';

    protected Curl $curl;

    protected SerializerInterface $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->curl = new Curl();

        $this->serializer = $serializer;
    }

    public function fetch(bool $regular = false): ?Ride
    {
        $queryVars = [];

        if ($regular) {
            $queryVars = [
                'cycleMandatory' => true,
                'slugsAllowd' => false,
            ];
        }

        $apiUrl = sprintf('%s?%s', self::API_URL, http_build_query($queryVars));

        $this->curl->get($apiUrl);

        if (200 === $this->curl->httpStatusCode) {
            $apiResponse = $this->curl->rawResponse;

            /** @var Ride $ride */
            $ride = $this->serializer->deserialize($apiResponse, Ride::class, self::API_FORMAT);

            return $ride;
        }

        return null;
    }
}
