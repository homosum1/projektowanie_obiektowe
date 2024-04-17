package main

import (
	"fmt"
    "net/http"
    "github.com/labstack/echo/v4"
	"zadanie_4_obiektowe.com/app/controllers"
	"zadanie_4_obiektowe.com/app/models"



	"gorm.io/gorm"
    "gorm.io/driver/sqlite"
)

func loadForecastsToDB(db *gorm.DB) {
    db.Exec("DELETE FROM forecast_dbs") 

    for city, forecasts := range models.Forecasts {
        for index, forecast := range forecasts {
			
			fmt.Println(index)
			cityForecast := models.ForecastDB { City: city, Condition: forecast.Condition, HighTemp: forecast.HighTemp, LowTemp: forecast.LowTemp, Day: index }

			db.Create(&cityForecast)
        }
    }
}

func main() {

	db, err := gorm.Open(sqlite.Open("forecast.db"), &gorm.Config{})
    if err != nil {
        panic("Błąd łączenia z bazą danych ❌")
    } 

	db.AutoMigrate(&models.ForecastDB{})
	loadForecastsToDB(db)


    e := echo.New()

    e.GET("/", func(c echo.Context) error {
        return c.String(http.StatusOK, "Hello, World!")
    })

	// endpoints from the list
	forecastFromList := e.Group("/forecast")

	forecastFromList.GET("/getAll/:city", controllers.GetAllFromCity)
	forecastFromList.GET("/getOne/:city/:day", controllers.GetOneFromCity)


	// request from the db
	forecastFromDB := e.Group("/forecastDB")

	forecastController := controllers.NewForecastController(db)

	forecastFromDB.GET("/getAll/:city", forecastController.GetAllFromCityDB)
	forecastFromDB.GET("/getOne/:city/:day", forecastController.GetOneFromCityDB)


    e.Logger.Fatal(e.Start(":8080"))
}
