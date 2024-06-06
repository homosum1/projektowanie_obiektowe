package com.example.ebizneszad8

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.ebizneszad8.ui.theme.EbiznesZad8Theme

class MainActivity : ComponentActivity() {
    private val shoppingCartViewModel by viewModels<ShoppingCartViewModel>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            EbiznesZad8Theme {
                val navController = rememberNavController()

                NavHost(navController = navController, startDestination = "categoryList") {
                    composable("categoryList") {
                        CategoryList(categories = getCategoryList(), navController, shoppingCartViewModel)
                    }
                    composable("itemList/{categoryId}") { backStackEntry ->
                        val categoryId = backStackEntry.arguments?.getString("categoryId")?.toInt() ?: -1
                        ItemListScreen(categoryId = categoryId, onBackPress = { navController.popBackStack() }, shoppingCartViewModel)
                    }
                    composable("shoppingCart") {
                        ShoppingCart(cartViewModel = shoppingCartViewModel, navController = navController)
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CategoryList(categories: List<Category>, navController: NavController, shoppingCartViewModel: ShoppingCartViewModel) {
    val cartItemCount by shoppingCartViewModel.cartItemsCount

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "Kategorie",
                        style = MaterialTheme.typography.headlineLarge.copy(fontWeight = FontWeight.Bold),
                        modifier = Modifier.padding(top = 20.dp, start = 5.dp)
                    )
                },
                actions = {
                    IconButton(
                        onClick = { navController.navigate("shoppingCart") },
                        modifier = Modifier
                            .padding(top = 20.dp, start = 5.dp)
                            .width(100.dp)
                    ) {
                        Box {
                            Icon(
                                Icons.Filled.ShoppingCart, contentDescription = "Shopping Cart",
                                modifier = Modifier
                                    .align(Alignment.TopEnd)
                                    .padding(start = 25.dp, top = 5.dp)
                            )
                            Text(
                                text = "$cartItemCount",
                                color = Color.Green,
                                style = LocalTextStyle.current.copy(fontSize = 25.sp),
                                modifier = Modifier
                                    .align(Alignment.TopStart)
                                    .padding(top = 0.dp, end =0.dp)

                            )

                        }
                    }
                }
            )
            Spacer(modifier = Modifier.height(16.dp))
        },
        content = { paddingValues ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(
                        start = paddingValues.calculateStartPadding(LayoutDirection.Ltr),
                        top = paddingValues.calculateTopPadding() + 30.dp,
                        end = paddingValues.calculateEndPadding(LayoutDirection.Ltr),
                        bottom = paddingValues.calculateBottomPadding()
                    ),
                contentAlignment = Alignment.TopCenter
            ) {
                LazyColumn(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 20.dp)
                ) {
                    items(categories) { category ->
                        CategoryItem(category = category) {
                            navController.navigate("itemList/${category.id}")
                        }
                    }
                }
            }
        }
    )
}

@Composable
fun CategoryItem(category: Category, onClick: () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
            .clickable { onClick() }
            .border(1.dp, Color.Gray)
    ) {
        Column(
            modifier = Modifier.padding(8.dp)
        ) {
            Text(
                text = category.name,
                style = MaterialTheme.typography.bodyLarge,
                modifier = Modifier.padding(20.dp, 10.dp)
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    val fakeShoppingCartViewModel = ShoppingCartViewModel() // Utwórz fałszywy ViewModel do podglądu

    EbiznesZad8Theme {
        val navController = rememberNavController()
        NavHost(navController = navController, startDestination = "categoryList") {
            composable("categoryList") {
                CategoryList(categories = getCategoryList(), navController, fakeShoppingCartViewModel)
            }
            composable("itemList/{categoryId}") { backStackEntry ->
                val categoryId = backStackEntry.arguments?.getString("categoryId")?.toInt() ?: -1
                ItemListScreen(
                    categoryId = categoryId,
                    onBackPress = { navController.popBackStack() },
                    shoppingCartViewModel = fakeShoppingCartViewModel // Użyj fałszywego ViewModel do podglądu
                )
            }
            composable("shoppingCart") {
                ShoppingCart(cartViewModel = fakeShoppingCartViewModel, navController = navController)
            }
        }
    }
}
