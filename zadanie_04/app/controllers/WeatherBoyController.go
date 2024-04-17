package controllers

import (
	"net/http"
	"github.com/labstack/echo/v4"
    "strconv"
	"zadanie_4_obiektowe.com/app/models"
)

func GetAllFromCity(c echo.Context) error {
	city := c.Param("city")

	if data, found := models.Forecasts[city]; found {

        return c.JSON(http.StatusOK, data)
    } else {
        return c.String(http.StatusBadRequest, "Nie podano prawidłowej nazwy miasta")
    }
}

func GetOneFromCity(c echo.Context) error {
    city := c.Param("city")
    day := c.Param("day")

	dayIndex, err := strconv.Atoi(day)

	if err != nil || dayIndex < 0 {
        return c.String(http.StatusBadRequest, "Nieprawidłowy dzień tygodnia")
    }

    if forecasts, found := models.Forecasts[city]; found {
        if dayIndex < len(forecasts) {
            return c.JSON(http.StatusOK, forecasts[dayIndex])
        }
        return c.String(http.StatusBadRequest, "Nieprawidłowy dzień tygodnia")
    }


    return c.String(http.StatusBadRequest, "Nie znaleziono miasta")
}