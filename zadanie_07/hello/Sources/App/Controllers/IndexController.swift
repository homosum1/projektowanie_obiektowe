//
//  File.swift
//  
//
//  Created by Alexander on 16/05/2024.
//

import Foundation

import Vapor

struct IndexesController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let itemsRoute = routes.grouped("index")
        itemsRoute.get(use: getAllHandler)
    }

    func getAllHandler(req: Request) throws -> EventLoopFuture<View> {

        return Item.query(on: req.db).all().flatMap { items in

            let context = ["items": items]

            return req.view.render("index", context)
        }
    }
    
}

