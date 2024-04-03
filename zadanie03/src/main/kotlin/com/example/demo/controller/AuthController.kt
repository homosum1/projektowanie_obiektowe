package com.example.demo.controller

import com.example.demo.model.User
import com.example.demo.service.AuthService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/auth")
class AuthController {

    @Autowired
    lateinit var authService: AuthService

    private val legitUsers = listOf(
        User("user1", "password1"),
        User("user2", "password2"),
        User("user3", "password3"),
        User("user4", "password4"),
    )

    @PostMapping("/login")
    fun login(@RequestBody user: User): String {
        return if (authService.authenticate(user, legitUsers)) {
            "Zostałeś zalogowany ✅"
        } else {
            "Podano nieprawidłowe dane logowania ❌"
        }
    }

    @GetMapping("/users")
    fun listUsers(): List<User> {
        return  legitUsers
    }
}
