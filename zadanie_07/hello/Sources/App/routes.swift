import Vapor
import Fluent
import FluentSQLiteDriver

func routes(_ app: Application) throws {
    app.get { req async in
        "It works!"
    }

    app.get("hello") { req async -> String in
        "Hello, world!"
    }
    
    let itemsController = ItemsController()
    try app.routes.register(collection: itemsController)
    
    let indexesController = IndexesController()
    try app.routes.register(collection: indexesController)
}
