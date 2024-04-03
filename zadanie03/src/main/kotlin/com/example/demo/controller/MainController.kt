package com.example.demo.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class MainController {

    @GetMapping("/")
    fun helloWorld(): String {
        val message = """
            <html>
                <head>
                    <title>Available Endpoints</title>
                </head>
                <body>
                    <h1>Witaj w aplikacji springboot!</h1>
                    <p>Dostępne endpointy:</p>
                    <ul>
                        <li><b>"/"</b> - tutaj jesteś 🫵</li>
                        <li><b>"auth/login"</b> - symulacja autoryzacji 👨‍💼</li>
                        <li><b>"auth/getUsersData"</b> - pobranie danych użytkoników z listy 👥 </li>
                    </ul>
                </body>
            </html>
        """.trimIndent()

        return message
    }
}