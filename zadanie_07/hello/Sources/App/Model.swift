//
//  File.swift
//  
//
//  Created by Alexander on 13/05/2024.
//

import Foundation
import Fluent
import Vapor

final class Item: Model, Content {
    static let schema = "items"

    @ID(key: .id)
    var id: UUID?

    @Field(key: "name")
    var name: String

    @Field(key: "price")
    var price: Double

    @Field(key: "quantity")
    var quantity: Int

    @Field(key: "icon")
    var icon: String

    init() { }

    init(id: UUID? = nil, name: String, price: Double, quantity: Int, icon: String) {
        self.id = id
        self.name = name
        self.price = price
        self.quantity = quantity
        self.icon = icon
    }
}
