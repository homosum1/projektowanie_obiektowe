package com.example.demo.service

import com.example.demo.model.User
import org.springframework.stereotype.Service

@Service
class AuthService {
    fun authenticate(userToAuth: User, legitUsers: List<User>): Boolean {
        return legitUsers.any {
            (it.username == userToAuth.username) && (it.password == userToAuth.password)
        }
    }
}