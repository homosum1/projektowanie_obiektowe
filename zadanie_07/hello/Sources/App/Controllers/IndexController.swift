//
//  File.swift
//  
//
//  Created by Alexander on 16/05/2024.
//

import Foundation
import Vapor

struct ItemContext: Codable {
    var id: String
    var name: String
    var price: Double
    var quantity: Int
    var icon: String
}

struct IndexesController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let itemsRoute = routes.grouped("index")
        itemsRoute.get(use: getAllHandler)
        
        let itemsRoute2 = routes.grouped("addItem")
        itemsRoute2.get(use: addItem)
    }

    func getAllHandler(req: Request) throws -> EventLoopFuture<View> {
        return Item.query(on: req.db).all().flatMap { items in
            let itemContexts = items.map { item in
                ItemContext(
                    id: item.id?.uuidString ?? "N/A",
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    icon: item.icon
                )
            }
            let context = ["items": itemContexts]
            return req.view.render("index", context)
        }
    }
    
    func addItem(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("addItem")
    }
    
}

