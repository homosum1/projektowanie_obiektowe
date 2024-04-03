# projektowanie obiektowe


### Zadanie 1 Paradygmaty

✅ 3.0 Procedura do generowania 50 losowych liczb od 0 do 100: [commit](https://github.com/homosum1/projektowanie_obiektowe/commit/83d0242ee89044b32e6981b93ac336baca671ba2)

✅ 3.5 Procedura do sortowania liczb [commit](https://github.com/homosum1/projektowanie_obiektowe/commit/02877607962a3a2109fcf85c31422826ef20376a)

✅ 4.0 Dodanie parametrów do procedury losującej określającymi zakres losowania: od, do, ile [commit](https://github.com/homosum1/projektowanie_obiektowe/commit/ed1501c3b260011d81b0e7d22a08629c1971925c)

❌ 4.5 5 testów jednostkowych testujące procedury

❌ 5.0 Skrypt w bashu do uruchamiania aplikacji w Pascalu via docker


Kod: [folder](https://github.com/homosum1/projektowanie_obiektowe/tree/main/zadanie01)

---

### Zadanie 2 Wzorce architektury

Należy stworzyć aplikację webową na bazie frameworka Symfony na obrazie kprzystalski/projobj-php:latest. Baza danych dowolna, sugeruję SQLite.

✅ 3.0 Należy stworzyć jeden model z kontrolerem z produktami, zgodnie z CRUD

✅ 3.5 Należy stworzyć skrypty do testów endpointów via curl

❌ 4.0 Należy stworzyć dwa dodatkowe kontrolery wraz z modelami

❌ 4.5 Należy stworzyć widoki do wszystkich kontrolerów

❌ 5.0 Stworzenie panelu administracyjnego z mockowanym logowaniem

Kod: [folder](https://github.com/homosum1/projektowanie_obiektowe/tree/main/zadanie02)

---

### Zadanie 3 Wzorce kreacyjne

Spring Boot (Kotlin)

Proszę stworzyć prosty serwis do autoryzacji, który zasymuluje autoryzację użytkownika za pomocą przesłanej nazwy użytkownika oraz hasła. Serwis powinien zostać wstrzyknięty do kontrolera za pomocą anotacji @Autowired. Aplikacja ma oczywiście zawierać jeden kontroler i powinna zostać napisana w języku Kotlin. Oparta powinna zostać na frameworku Spring Boot, podobnie jak na zajęciach. Serwis do autoryzacji powinien być singletonem.

✅ 3.0 Należy stworzyć jeden kontroler wraz z danymi wyświetlanymi z listy na endpoint’cie w formacie JSON - Kotlin + Spring Boot

✅ 3.5 Należy stworzyć klasę do autoryzacji (mock) jako Singleton w formie eager

✅ 4.0 Należy obsłużyć dane autoryzacji przekazywane przez użytkownika

✅ 4.5 Należy wstrzyknąć singleton do głównej klasy via @Autowired

❌ 5.0 Obok wersji Eager do wyboru powinna być wersja Singletona w wersji lazy
