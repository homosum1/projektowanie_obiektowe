<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Item;
// use App\Items\Item;


class ProductController extends AbstractController
{

    // private $items;

    // public function __construct()
    // {
    //     $this->items = [
    //         new Item("apple", 1, 4.50, 5, "🍎"),
    //         new Item("banana", 2, 49.99, 3, "🍌"),
    //         new Item("pineapple", 3, 8.50, 10, "🍍"),
    //     ];
    // }

    #[Route('/products/getAll', name: 'getAll', methods: ['GET'])]
    public function getAll(EntityManagerInterface $entityManager): JsonResponse
    {
        $items = $entityManager->getRepository(Item::class)->findAll();

        $itemsArray = array_map(function ($item) {
            return [
                'name' => $item->name,
                'id' => $item->getId(),
                'price' => $item->price,
                'quantity' => $item->quantity,
                'icon' => $item->icon,
            ];
        }, $items);

        return $this->json($itemsArray);
    }

    // #[Route('/products/getAll', name: 'getAll', methods: ['GET'])]
    // public function getAll(): JsonResponse
    // {
    //     $itemsArray = array_map(function ($item) {
    //         return [
    //             'name' => $item->name,
    //             'id' => $item->id,
    //             'price' => $item->price,
    //             'quantity' => $item->quantity,
    //             'icon' => $item->icon,
    //         ];
    //     }, $this->items);

    //     return $this->json($itemsArray);
    // }


    #[Route('/products/getOne/{id}', name: 'getOne', methods: ['GET'])]
    public function getOne(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $item = $entityManager->getRepository(Item::class)->find($id);

        if (!$item) {
            return $this->json(['error' => 'Nie znaleziono przedmiotu'], 404);
        }

        return $this->json([
            'name' => $item->name,
            'id' => $item->getId(),
            'price' => $item->price,
            'quantity' => $item->quantity,
            'icon' => $item->icon,
        ]);
    }

    // #[Route('/products/getOne/{id}', name: 'getOne', methods: ['GET'])]
    // public function getOne(int $id): JsonResponse
    // {
    //     foreach ($this->items as $item) {
    //         if ($item->id == $id) {
    //             return $this->json([
    //                 'name' => $item->name,
    //                 'id' => $item->id,
    //                 'price' => $item->price,
    //                 'quantity' => $item->quantity,
    //                 'icon' => $item->icon,
    //             ]);
    //         }
    //     }
    
    //     return $this->json(['error' => 'Nie znaleziono przedmiotu'], 404);
    // }
    

    #[Route('/products/addOne', name: 'addOne', methods: ['POST'])]
    public function addOne(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['name']) || !isset($data['price']) || !isset($data['quantity']) || empty($data['icon'])) {
            return $this->json(['error' => 'Nie podano wszystkich wymaganych parametrów'], Response::HTTP_BAD_REQUEST);
        }

        $item = new Item(
            $data['name'],
            $data['price'],
            $data['quantity'],
            $data['icon']
        );

        $entityManager->persist($item);
        $entityManager->flush();

        return $this->json(['message' => 'Przedmiot dodany do listy']);
    }

    // #[Route('/products/addOne', name: 'addOne', methods: ['POST'])]
    // public function addOne(Request $request): JsonResponse
    // {
    //     $data = json_decode($request->getContent(), true);

    //     if ( empty($data['name']) || empty($data['id']) || empty($data['price']) || empty($data['quantity']) || empty($data['icon']) ) {
    //         return $this->json(['error' => 'Nie podano wszystkich wymaganych parametrów'], Response::HTTP_BAD_REQUEST);
    //     }

    //     $itemName = $data['name'];
    //     $itemId = $data['id'];
    //     $itemPrice = $data['price'];
    //     $itemQuantity = $data['quantity'];
    //     $itemIcon = $data['icon'];

    //     foreach ($this->items as $item) {
    //         if ($item->id == $itemId) {
    //             return $this->json(['error' => 'Przedmiot o danym id już istnieje'], Response::HTTP_BAD_REQUEST);
    //         }
    //     }

    //     $newItem = new Item($itemName, $itemId, $itemPrice, $itemQuantity, $itemIcon);
    //     $this->items[] = $newItem;

    //     return $this->json(['message' => 'Przedmiot dodany do listy']);
    // }

    #[Route('/products/deleteOne/{id}', name: 'deleteOne', methods: ['DELETE'])]
    public function deleteOne(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $item = $entityManager->getRepository(Item::class)->find($id);

        if (!$item) {
            return $this->json(['error' => 'Nie znaleziono przedmiotu o zadanym id'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($item);
        $entityManager->flush();

        return $this->json(['message' => 'Przedmiot został usunięty']);
    }

    // #[Route('/products/deleteOne/{id}', name: 'deleteOne', methods: ['DELETE'])]
    // public function deleteOne(int $id): JsonResponse
    // {
    //     foreach ($this->items as $key => $item) {
    //         if ($item->id == $id) {
    //             unset($this->items[$key]);
    //             return $this->json(['message' => 'Przedmiot został usunięty']);
    //         }
    //     }

    //     return $this->json(['error' => 'Nie znaleziono przedmiotu o zadanym id'], Response::HTTP_NOT_FOUND);
    // }

    #[Route('/products/patchOne/{id}', name: 'patchOne', methods: ['PATCH'])]
    public function patchOne(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $item = $entityManager->getRepository(Item::class)->find($id);

        if (!$item) {
            return $this->json(['error' => 'Nie znaleziono przedmiotu'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $item->name = $data['name'];
        }
        if (isset($data['price'])) {
            $item->price = $data['price'];
        }
        if (isset($data['quantity'])) {
            $item->quantity = $data['quantity'];
        }
        if (isset($data['icon'])) {
            $item->icon = $data['icon'];
        }

        $entityManager->flush();

        return $this->json(['message' => 'Przedmiot został zaktualizowany']);
    }


    // #[Route('/products', name: 'app_product')]
    // public function index(): JsonResponse
    // {
    //     return $this->json([
    //         'message' => 'Witaj w kontrolerze produktów!',
    //         'path' => 'src/Controller/ProductController.php',
    //     ]);
    // }


}