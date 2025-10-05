# Запуск

## Через docker-compose:

```bash
docker-compose up --build 
```
При обращении к http://localhost:3000/api/bookings/reserve можно забронировать место.

Пример тела запроса:
{
"event_id": 1, 
"user_id": "user123"
}
