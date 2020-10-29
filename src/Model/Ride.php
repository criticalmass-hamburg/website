<?php declare(strict_types=1);

namespace App\Model;

use JMS\Serializer\Annotation as JMS;

class Ride
{
    /**
     * @JMS\Type("int")
     */
    protected int $id;

    /**
     * @JMS\Type("DateTime<'U'>")
     */
    protected \DateTime $dateTime;

    /**
     * @JMS\Type("string")
     */
    protected ?string $location;

    /**
     * @JMS\Type("float")
     */
    protected ?float $latitude;

    /**
     * @JMS\Type("float")
     */
    protected ?float $longitude;

    /**
     * @JMS\Type("string")
     * @JMS\SerializedName("disabledReason")
     */
    protected ?string $disabledReason = null;

    /**
     * @JMS\Type("boolean")
     */
    protected bool $enabled;

    /**
     * @JMS\Type("string")
     */
    protected ?string $disabledReasonMessage;

    public function __construct()
    {
    }

    public function getId(): int
    {
        return $this->id;
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

    public function isEnabled(): bool
    {
        return $this->enabled;
    }

    public function getDisabledReason(): ?string
    {
        return $this->disabledReason;
    }

    public function getDisabledReasonMessage(): ?string
    {
        return $this->disabledReasonMessage;
    }
}
