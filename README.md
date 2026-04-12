# Warsztaty k6 – QuickPizza 🍕

```
warsztaty-quickpizza/
│
├── test.js                     # jeden plik który nadpisujemy w każdym kroku
│
├── exercises/                  # zadania do każdego kroku
│   ├── krok1_first_request.txt
│   ├── krok2_load_model.txt
│   ├── krok3_checks.txt
│   ├── krok4_thresholds.txt
│   └── krok5_custom_metrics.txt
│
└── czesc2/                     # CZĘŚĆ 2: Ten sam test, różne scenariusze
    ├── test2.js
    ├── bonus_advanced_test.txt
    └── scenarios/
        ├── smoke.js
        ├── load.js
        ├── stress.js
        └── spike.js
```

---

## Wymagania

```bash
winget install k6 --source winget  # Windows

k6 version
```

---

## Uruchomienie QuickPizzy

```bash
docker run --rm -it -p 3333:3333 ghcr.io/grafana/quickpizza-local:latest
```

---

## Część 1

Pracujemy na jednym pliku `test.js` – każdy krok to nowa wersja.
Instrukcje co dodać i zadania do wykonania znajdziesz w folderze `exercises/`.

```bash
# Uruchamiaj po każdym kroku:
k6 run test.js

# Z Docker:
docker run --rm --network=host -v $(pwd):/scripts grafana/k6 run /scripts/test.js
```

| Krok | Plik                       | Czas   | Nowe koncepty                        |
|------|----------------------------|--------|--------------------------------------|
| 1    | `krok1_first_request.txt`  | 10 min | http.post, console.log, raport k6    |
| 2    | `krok2_load_model.txt`     | 15 min | vus, duration, stages, sleep, __VU   |
| 3    | `krok3_checks.txt`         | 10 min | check(), asercje, rate w raporcie    |
| 4    | `krok4_thresholds.txt`     | 10 min | thresholds, exit code, abortOnFail   |
| 5    | `krok5_custom_metrics.txt` | 15 min | Counter, Trend, Rate, own thresholds |

---

## Część 2 – Samodzielne testy

Pracujemy na pliku `test2.js`. Scenariusze testów znajdziesz w folderze `scenarios/`.

```bash
k6 run -e SCENARIO=smoke  czesc2/test2.js
k6 run -e SCENARIO=load   czesc2/test2.js
k6 run -e SCENARIO=stress czesc2/test2.js
k6 run -e SCENARIO=spike  czesc2/test2.js
```

| Scenariusz | Czas   | Cel                                              |
|------------|--------|--------------------------------------------------|
| smoke      | 5 min  | Czy aplikacja żyje? Baseline przed resztą testów |
| load       | 10 min | Normalny ruch, sprawdzamy SLA                    |
| stress     | 15 min | Szukamy punktu granicznego                       |
| spike      | 10 min | Nagły skok ruchu – Black Friday                  |

---

## Zadanie bonusowe

Plik `czesc2/bonus_advanced_test.txt` zawiera instrukcję do rozszerzenia `test2.js`
o pełny user flow: rejestrację użytkownika, zamówienie pizzy, ocenę jej
oraz pobranie listy ocen.

---

## Przydatne komendy

```bash
# Debug – jedna iteracja
k6 run --vus 1 --iterations 1 test.js

# Nadpisz BASE_URL
k6 run -e BASE_URL=http://localhost:3333 test.js

# Live dashboard w przeglądarce (http://127.0.0.1:5665)
K6_WEB_DASHBOARD=true k6 run test.js

# Raport HTML
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=report.html k6 run test.js

# Zapisz wyniki do JSON
k6 run --out json=wyniki.json test.js
```

---

## API QuickPizza – przegląd

| Metoda | Endpoint                  | Auth           | Opis                    |
|--------|---------------------------|----------------|-------------------------|
| GET    | `/`                       | —              | Strona główna           |
| POST   | `/api/pizza`              | token (header) | Rekomendacja pizzy      |
| POST   | `/api/users`              | —              | Rejestracja użytkownika |
| POST   | `/api/users/token/login`  | —              | Logowanie, zwraca token |
| POST   | `/api/ratings`            | Bearer token   | Dodaj ocenę pizzy       |
| GET    | `/api/ratings`            | Bearer token   | Lista ocen użytkownika  |

---

## Linki

- 📚 k6 docs: https://k6.io/docs
- 🍕 QuickPizza repo: https://github.com/grafana/quickpizza
