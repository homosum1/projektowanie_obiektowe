package models

import "gorm.io/gorm"

type ForecastDB struct {
	gorm.Model

	City      string `json:"miasto"`

    Day       int `json:"dzien"`
    Condition string `json:"warunki pogodowe"`
    HighTemp  int `json:"maksymalna temperatura"`
    LowTemp   int `json:"minimalna temperatura"`
}
