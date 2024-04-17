package controllers

import (
	// "fmt"
    "net/http"
    "gorm.io/gorm"
    "strconv"
    "github.com/labstack/echo/v4"

	"zadanie_4_obiektowe.com/app/models"
)

type ForecastController struct {
    DB *gorm.DB
}

func NewForecastController(db *gorm.DB) *ForecastController {
    return &ForecastController{DB: db}
}

func (db *ForecastController) GetAllFromCityDB(c echo.Context) error {
    city := c.Param("city")

    var forecasts []models.ForecastDB

    result := db.DB.Where("City = ?", city).Find(&forecasts); 


	// test print all

	// result := db.DB.Find(&forecasts); 

	// for _, forecast := range forecasts {
    //     fmt.Printf("ID: %d, City: %s, Day: %d, Condition: %s, HighTemp: %d, LowTemp: %d\n",
    //         forecast.ID, forecast.City, forecast.Day, forecast.Condition, forecast.HighTemp, forecast.LowTemp)
    // }


	if result.Error != nil {
        return c.JSON(http.StatusInternalServerError, result.Error)
    }

	// empty
    if len(forecasts) == 0 {
        return echo.NewHTTPError(http.StatusNotFound, "Nie podano prawidłowej nazwy miasta")
    }

	// not empty 
    return c.JSON(http.StatusOK, forecasts)
	
}

func (db *ForecastController) GetOneFromCityDB(c echo.Context) error {
    city := c.Param("city")
    day := c.Param("day")

	dayIndex, err := strconv.Atoi(day)

	if err != nil || dayIndex < 0 {
        return c.String(http.StatusBadRequest, "Nieprawidłowy dzień tygodnia")
    }

    var forecast models.ForecastDB

    result := db.DB.Where("city = ? AND day = ?", city, dayIndex).First(&forecast);
	
	if result.Error != nil {
        return c.JSON(http.StatusInternalServerError, result.Error)
    }

	if err == gorm.ErrRecordNotFound {
		return echo.NewHTTPError(http.StatusNotFound, "Nie znaleziono szukanej pogody")
	}

    return c.JSON(http.StatusOK, forecast)
}
