<?php declare(strict_types=1);

namespace App\Model;

use Symfony\Component\Serializer\Attribute\SerializedName;

class Ride
{
    public ?int $id = null;

    #[SerializedName('date_time')]
    public ?\DateTime $dateTime = null;

    public ?string $location = null;

    public ?float $latitude = null;

    public ?float $longitude = null;

    #[SerializedName('disabledReason')]
    public ?string $disabledReason = null;

    public bool $enabled = false;

    public ?string $disabledReasonMessage = null;

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
