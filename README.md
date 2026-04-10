# k6-workshop
----
# Warsztaty k6 – QuickPizza 🍕
## Struktura (~2 godziny)

```
warsztaty-quickpizza/
│
├── czesc1/                        # CZĘŚĆ 1: Jeden test, który ewoluuje
│   ├── krok1_basic.js             # 10 min – pierwsze żądanie, console.log
│   ├── krok2_stages.js            # 15 min – vus, duration, stages, sleep
│   ├── krok3_checks.js            # 10 min – asercje, co to check()
│   ├── krok4_thresholds.js        # 10 min – kryteria zaliczenia, exit code
│   ├── krok5_custom_metrics.js    # 15 min – Counter, Trend, Rate
│   ├── krok6_lifecycle_data.js    # 15 min – setup/teardown, SharedArray
│   └── data/
│       └── customers.json
│
└── czesc2/                        # CZĘŚĆ 2: Samodzielne testy od zera
    ├── czesc2_A_smoke.js          # 15 min – smoke test po deployu
    ├── czesc2_B_load.js           # 20 min – load test z group() i metrykami
    ├── czesc2_C_stress.js         # 15 min – stress test, punkt graniczny
    └── czesc2_D_zaawansowany.js   # 25 min – rejestracja + login + ocena pizzy
```

---

## Wymagania

```bash
# Opcja A – instalacja lokalna
winget install k6 --source winget  # Windows

# Weryfikacja
k6 version
```

## Uruchomienie QuickPizzy

```bash
# Lokalnie przez Docker
docker run --rm -it -p 3333:3333 ghcr.io/grafana/quickpizza-local:latest

---

## Część 1 

Pracujemy na jednym pliku `test.js` – każdy krok to nowa wersja.
Możesz kopiować kolejny krok do `test.js` albo patrzeć na plik jako referencję.

# Uruchamiaj po każdym kroku:
k6 run test.js

# Z Docker:
docker run --rm --network=host -v $(pwd):/scripts grafana/k6 run /scripts/test.js
```

| Krok | Plik                      | Czas   | Nowe koncepty                  |
|------|---------------------------|--------|--------------------------------|
| 1    | `test.js`           | 10 min | http.post, console.log, raport k6    |
| 2    | `krok2.txt`         | 15 min | vus, duration, stages, sleep, __VU   |
| 3    | `krok3.txt`         | 10 min | check(), asercje, rate w raporcie    |
| 4    | `krok4.txt`         | 10 min | thresholds, exit code, abortOnFail   |
| 5    | `krok5.txt`         | 15 min | Counter, Trend, Rate, own thresholds |
| 6    | `krok6.txt`         | 15 min | setup(), teardown(), SharedArray     |

---

## Część 2 – Samodzielne testy
```
Pracujemy na pliku test2.js
Stworzymy i wykorzystamy scenariusze testów.
```

| Test | Czas   | Cel                                          |
|------|--------|----------------------------------------------|
| A    | 15 min | Smoke test – czy aplikacja żyje po deployu   |
| B    | 20 min | Load test – normalny ruch, group(), metryki  |
| C    | 15 min | Stress test – szukamy punktu granicy         |
| D    | 25 min | **Zaawansowany**: rejestracja + login + ocena|

---
```
## Przydatne komendy

# Nadpisz opcje z CLI
k6 run --vus 1 --iterations 1 test.js   # debug – jedna iteracja

# Zmienne środowiskowe
k6 run -e BASE_URL=http://localhost:3333 test.js

# Live dashboard w przeglądarce (http://127.0.0.1:5665)
K6_WEB_DASHBOARD=true k6 run test.js

# Zapisz wyniki do JSON
k6 run --out json=wyniki.json test.js
```

---

## API QuickPizzy – przegląd

| Metoda | Endpoint              | Auth | Opis                          |
|--------|-----------------------|------|-------------------------------|
| GET    | `/`                   | —    | Strona główna                 |
| POST   | `/api/pizza`          | —    | Rekomendacja pizzy            |
| GET    | `/api/ingredients`    | —    | Lista składników              |
| POST   | `/api/users`          | —    | Rejestracja użytkownika       |
| POST   | `/api/users/token/login` | — | Logowanie, zwraca token       |
| GET    | `/api/ratings`        | ✓    | Lista ocen użytkownika        |
| POST   | `/api/ratings`        | ✓    | Dodaj ocenę pizzy             |

---

## Linki

- 📚 k6 docs: https://k6.io/docs
- 🍕 QuickPizza repo: https://github.com/grafana/quickpizza
