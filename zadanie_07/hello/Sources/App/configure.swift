import Vapor

import Leaf
import Fluent
import FluentSQLiteDriver


// configures your application
public func configure(_ app: Application) async throws {
    // uncomment to serve files from /Public folder
    // app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))
    // register routes
    
    // leaf
    app.views.use(.leaf)
    
    app.logger.logLevel = .debug
    app.logger.debug("Leaf root DIRRR: \(app.leaf.configuration.rootDirectory)")


    // debug
    app.logger.logLevel = .debug
    app.logger.debug("Leaf root: \(app.leaf.configuration.rootDirectory)")
    
    app.databases.use(.sqlite(.file("db.sqlite")), as: .sqlite)
    
    // migrations
    app.migrations.add(CreateItem())
    try app.autoMigrate().wait()
        
    try routes(app)
}
