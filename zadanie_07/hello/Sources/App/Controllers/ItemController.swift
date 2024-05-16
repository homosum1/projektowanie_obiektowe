//
//  File.swift
//  
//
//  Created by Alexander on 13/05/2024.
//

import Foundation

import Vapor

struct ItemsController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let items = routes.grouped("items")
        items.get(use: getAll)
        items.post(use: createOne)
        items.group(":itemID") { item in
            item.get(use: getOne)
            item.patch(use: updateOne)
            item.delete(use: deleteOne)
        }
    }

    func getAll(req: Request) throws -> EventLoopFuture<[Item]> {
        return Item.query(on: req.db).all()
    }
    
    func getOne(req: Request) throws -> EventLoopFuture<Item> {
        let itemID = req.parameters.get("itemID", as: UUID.self)
        
        if (itemID != nil) {
            return Item.find(itemID, on: req.db).unwrap(or: Abort(.notFound))
        } else {
            throw Abort(.badRequest, reason: "Nieprawidłowe ID")
        }
    }

    func createOne(req: Request) throws -> EventLoopFuture<Item> {
        let item = try req.content.decode(Item.self)
        return item.save(on: req.db).map { item }
    }

    func deleteOne(req: Request) throws -> EventLoopFuture<HTTPStatus> {
        
        let itemID = req.parameters.get("itemID", as: UUID.self)
        
        if (itemID == nil) {
            throw Abort(.badRequest, reason: "Nieprawidłowe ID przedmiotu")
        }
        
        return Item.find(itemID, on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { item in
                item.delete(on: req.db)
            }
            .transform(to: .ok)
    }
    
    func updateOne(req: Request) throws -> EventLoopFuture<Item> {
        let itemID = req.parameters.get("itemID", as: UUID.self)
        
//        print("Odczytane id: \(itemID)")
        
        if (itemID == nil) {
            throw Abort(.badRequest, reason: "Nieprawidłowe ID przedmiotu")
        }
        
        let updatedItem = try req.content.decode(Item.self)
       
        
        return Item.find(itemID, on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { item in
                item.name = updatedItem.name
                item.price = updatedItem.price
                item.quantity = updatedItem.quantity
                item.icon = updatedItem.icon
                
                return item.save(on: req.db).map { item }
            }
    }
}
