<?php declare(strict_types=1);

namespace App\Ride;

use JMS\Serializer\Annotation as JMS;

class Ride
{
    /**
     * @JMS\Type("DateTime<'U'>")
     * @JMS\SerializedName("dateTime")
     */
    protected $dateTime;

    /**
     * @JMS\Type("string")
     */
    protected $location;

    /**
     * @JMS\Type("float")
     */
    protected $latitude;

    /**
     * @JMS\Type("float")
     */
    protected $longitude;

    public function __construct()
    {
    }

    public function getDateTime(): ?\DateTime
    {
        return $this->dateTime;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }
}
