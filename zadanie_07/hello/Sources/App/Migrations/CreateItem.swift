//
//  File.swift
//  
//
//  Created by Alexander on 13/05/2024.
//

import Foundation
import Fluent

struct CreateItem: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("items")
            .id()
            .field("name", .string, .required)
            .field("price", .double, .required)
            .field("quantity", .int, .required)
            .field("icon", .string, .required)
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema("items").delete()
    }
}
