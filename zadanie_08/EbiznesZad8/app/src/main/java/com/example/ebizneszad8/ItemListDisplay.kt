package com.example.ebizneszad8

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ItemListScreen(categoryId: Int, onBackPress: () -> Unit, shoppingCartViewModel: ShoppingCartViewModel) {
    val categories = getCategoryList()
    val category = categories.find { it.id == categoryId }
    val items = categories.find { it.id == categoryId }?.items.orEmpty()

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        category?.name ?: "Nieznana kategoria",
                        style = MaterialTheme.typography.headlineLarge.copy(fontWeight = FontWeight.Bold),
                        modifier = Modifier.padding(top = 20.dp, start = 5.dp)
                    )
                },
                navigationIcon = {
                    Box(
                        modifier = Modifier.padding(top = 20.dp, start = 5.dp)
                    ) {
                        IconButton(onClick = { onBackPress() }) {
                            Icon(Icons.Filled.ArrowBack, contentDescription = "Back")
                        }
                    }
                }
            )
        },
        content = { paddingValues ->
            LazyColumn(
                contentPadding = paddingValues,
                modifier = Modifier
                    .fillMaxSize()
                    .padding(top = 20.dp),
            ) {
                items(items) { item ->
                    Column(
                        modifier = Modifier
                            .padding(5.dp)
                            .fillMaxWidth()
                            .border(1.dp, Color.Gray)
                            .padding(5.dp)
                    ) {
                        Text(
                            text = item.name,
                            style = MaterialTheme.typography.bodyLarge.copy(fontWeight = FontWeight.Bold)
                        )
                        Spacer(modifier = Modifier.height(5.dp))
                        Text(
                            text = "Cena: ${item.price}zł",
                            style = MaterialTheme.typography.bodyLarge
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "Ilość: ${item.stockSize}",
                            style = MaterialTheme.typography.bodyLarge
                        )
                        Button(onClick = { shoppingCartViewModel.addItemToCart(item.id, 1) }) {
                            Text("Add to Cart")
                        }
                    }
                }
            }
        }
    )
}
