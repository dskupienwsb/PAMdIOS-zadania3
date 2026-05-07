# React Native REST API App (Expo Router)

## Opis projektu

Aplikacja mobilna napisana w React Native z użyciem Expo Router. Aplikacja komunikuje się z publicznym REST API i realizuje operacje pobierania oraz wysyłania danych.

## Funkcjonalności

### Część A – pobieranie danych (GET)
- Pobieranie listy postów z API:
  https://jsonplaceholder.typicode.com/posts
- Wyświetlanie danych w formie listy
- Każdy post zawiera:
  - id
  - title
  - body
- Obsługa stanu ładowania
- Obsługa błędów połączenia

### Część B – wysyłanie danych (POST)
- Formularz dodawania nowego posta
- Pola:
  - title
  - body
  - userId
- Wysyłanie danych do API:
  https://jsonplaceholder.typicode.com/posts
- Wyświetlanie odpowiedzi serwera
- Czyszczenie formularza po wysłaniu
- Walidacja pól formularza

## Nawigacja

Aplikacja wykorzystuje Expo Router i zakładki:

- Zadanie A – lista postów
- Zadanie B – formularz dodawania posta

## Technologie

- React Native
- Expo
- Expo Router
- TypeScript
- Fetch API
