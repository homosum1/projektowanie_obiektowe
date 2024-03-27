<?php

namespace App\Entity;

use App\Repository\ItemRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ItemRepository::class)]
class Item
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: 'string')]
    public string $name;

    #[ORM\Column(type: 'float')]
    public float $price;

    #[ORM\Column(type: 'integer')]
    public int $quantity;

    #[ORM\Column(type: 'string')]
    public string $icon;

    public function __construct(string $name, float $price, int $quantity, string $icon)
    {
        $this->name = $name;
        $this->price = $price;
        $this->quantity = $quantity;
        $this->icon = $icon;
    }

    public function getId(): ?int
    {
        return $this->id;
    }
} 
