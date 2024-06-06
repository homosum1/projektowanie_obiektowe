package com.example.ebizneszad8

import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.ViewModel
import androidx.navigation.NavController

data class CartItem(val productId: Int, val quantity: Int)

class ShoppingCartViewModel : ViewModel() {
    private val _cartItems = mutableStateListOf<CartItem>()
    val cartItems: List<CartItem> get() = _cartItems
    val cartItemsCount = mutableStateOf(0)

    fun addItemToCart(productId: Int, quantity: Int) {
        val existingItem = _cartItems.find { it.productId == productId }
        if (existingItem != null) {
            val index = _cartItems.indexOf(existingItem)
            _cartItems[index] = existingItem.copy(quantity = existingItem.quantity + quantity)
        } else {
            _cartItems.add(CartItem(productId, quantity))
        }
        updateCartItemCount()
    }

    fun removeItemFromCart(productId: Int) {
        _cartItems.removeIf { it.productId == productId }
        updateCartItemCount()
    }

    fun clearCart() {
        _cartItems.clear()
        updateCartItemCount()
    }

    private fun updateCartItemCount() {
        cartItemsCount.value = _cartItems.sumOf { it.quantity }
    }
}

@Composable
fun ShoppingCart(cartViewModel: ShoppingCartViewModel, navController: NavController) {
    Column {
        Text(
            "Koszyk zakupowy (${cartViewModel.cartItemsCount.value})",
            style = MaterialTheme.typography.headlineLarge.copy(fontWeight = FontWeight.Bold),
            modifier = Modifier.padding(top = 20.dp, start = 5.dp)
        )

        LazyColumn {
            items(cartViewModel.cartItems) { cartItem ->
                Box (
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp)
                        .border(1.dp, Color.Gray)
                ) {
                    Text(
                        "ID produktu: ${cartItem.productId}, Ilość: ${cartItem.quantity}",
                        style = MaterialTheme.typography.bodyLarge,
                        modifier = Modifier.padding(20.dp, 10.dp)
                    )
                }
            }
        }

        Button(onClick = { cartViewModel.clearCart() }) {
            Text("Wyczyść koszyk")
        }

        Spacer(modifier = androidx.compose.ui.Modifier.height(16.dp))

        Button(onClick = { navController.navigate("categoryList") }) {
            Text("Powrót do strony głównej")
        }
    }
}
