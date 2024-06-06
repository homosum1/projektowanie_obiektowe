package com.example.ebizneszad8

data class Category(val id: Int, val name: String, val items: List<Item>)
data class Item(val id: Int, val name: String, val stockSize: Int, val price: Double)

fun getCategoryList(): List<Category> {
    return listOf(
        Category(1, "Fotografia", listOf(
            Item(1, "Aparat", stockSize = 5, price = 999.99),
            Item(2, "Statyw", stockSize = 15, price = 49.99)
        )),
        Category(2, "Gry i Konsole", listOf(
            Item(3, "PlayStation 5", stockSize = 3, price = 499.99),
            Item(4, "Xbox seria X", stockSize = 4, price = 499.99)
        )),
        Category(3, "Sprzęt AGD", listOf(
            Item(5, "Lodówka", stockSize = 7, price = 899.99),
            Item(6, "Pralka", stockSize = 10, price = 599.99)
        )),
        Category(4, "Sprzęt audio", listOf(
            Item(7, "Słuchawki", stockSize = 20, price = 199.99),
            Item(8, "Głośnik Bluetooth", stockSize = 25, price = 99.99)
        )),
        Category(5, "TV", listOf(
            Item(9, "Samsung QLED", stockSize = 6, price = 1199.99),
            Item(10, "LG OLED", stockSize = 5, price = 1299.99)
        )),
        Category(6, "Pozostała elektronika", listOf(
            Item(11, "Smartwatch", stockSize = 10, price = 299.99),
            Item(12, "Dron", stockSize = 8, price = 399.99)
        ))
    )
}
