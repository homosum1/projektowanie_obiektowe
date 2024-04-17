package models

type Forecast struct {
    Day       string `json:"dzien"`
    Condition string `json:"warunki pogodowe"`
    HighTemp  int `json:"maksymalna temperatura"`
    LowTemp   int `json:"minimalna temperatura"`
}

var Forecasts = map[string][]Forecast{
    "Kraków": {
        {"Poniedziałek", "Słonecznie", 22, 12},
        {"Wtorek", "Częściowo pochmurnie", 21, 13},
        {"Środa", "Deszcz", 18, 11},
        {"Czwartek", "Burze", 19, 12},
        {"Piątek", "Pochmurno", 21, 13},
        {"Sobota", "Deszcz", 20, 12},
        {"Niedziela", "Słonecznie", 23, 14},
    },
    "Warszawa": {
        {"Poniedziałek", "Pochmurno", 24, 14},
        {"Wtorek", "Deszcz", 19, 12},
        {"Środa", "Słonecznie", 22, 13},
        {"Czwartek", "Częściowo pochmurnie", 21, 14},
        {"Piątek", "Deszcz", 18, 10},
        {"Sobota", "Burze", 19, 11},
        {"Niedziela", "Słonecznie", 25, 15},
    },
}

