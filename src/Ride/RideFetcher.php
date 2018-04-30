<?php declare(strict_types=1);

namespace App\Ride;

use Curl\Curl;
use JMS\Serializer\SerializerInterface;

class RideFetcher
{
    const API_URL = 'https://criticalmass.in/api/hamburg/current';
    const API_FORMAT = 'json';

    /** @var Curl $curl */
    protected $curl;

    /** @var SerializerInterface $serializer */
    protected $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->curl = new Curl();

        $this->serializer = $serializer;
    }

    public function fetch(): ?Ride
    {
        $this->curl->get(self::API_URL);

        if (200 === $this->curl->httpStatusCode) {
            $apiResponse = $this->curl->rawResponse;

            /** @var Ride $ride */
            $ride = $this->serializer->deserialize($apiResponse, Ride::class, self::API_FORMAT);

            return $ride;
        }

        return null;
    }
}
