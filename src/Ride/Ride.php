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
}
