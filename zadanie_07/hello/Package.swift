// swift-tools-version:5.10
import PackageDescription

let package = Package(
    name: "hello",
    platforms: [
       .macOS(.v13)
    ],
    dependencies: [
        // 💧 A server-side Swift web framework.
        .package(url: "https://github.com/vapor/vapor.git", from: "4.92.4"),
        
        // fluent ORM
        .package(url: "https://github.com/vapor/fluent.git", from: "4.0.0"),
      
        // SQL lite
        .package(url: "https://github.com/vapor/fluent-sqlite-driver.git", from: "4.0.0"),
        
        // Leaf
        .package(url: "https://github.com/vapor/leaf.git", from: "4.0.0"),
            
        
    ],
    targets: [
        .executableTarget(
            name: "App",
            dependencies: [
                // fluent ORM
                .product(name: "Fluent", package: "fluent"),
                
                // Vapor
                .product(name: "Vapor", package: "vapor"),
                
                // SQL Lite
                .product(name: "FluentSQLiteDriver", package: "fluent-sqlite-driver"),
                
                // Leaf
                .product(name: "Leaf", package: "leaf")
            ],
            swiftSettings: swiftSettings
        ),
        .testTarget(
            name: "AppTests",
            dependencies: [
                .target(name: "App"),
                .product(name: "XCTVapor", package: "vapor"),
            ],
            swiftSettings: swiftSettings
        )
    ]
)

var swiftSettings: [SwiftSetting] { [
    .enableUpcomingFeature("DisableOutwardActorInference"),
    .enableExperimentalFeature("StrictConcurrency"),
] }
