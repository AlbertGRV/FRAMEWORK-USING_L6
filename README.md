Документация API: Управление клиентами
Это API предоставляет эндпоинты для управления данными клиентов, включая создание, получение, обновление и удаление записей. Контроллер customerController.js взаимодействует с модулем clientService для выполнения бизнес-логики.

Базовый URL
Copy
http://ваш-домен.ru/api/v1/customers
Эндпоинты
1. Получить всех клиентов
Метод: GET

Эндпоинт: /

Описание: Возвращает список всех клиентов.

Успешный ответ (200):

json
Copy
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Иван Петров",
      "email": "ivan@example.com"
    },
    {
      "id": 2,
      "name": "Мария Сидорова",
      "email": "maria@example.com"
    }
  ]
}
Ошибка (500):

json
Copy
{
  "success": false,
  "message": "Не удалось загрузить клиентов"
}
2. Получить одного клиента
Метод: GET

Эндпоинт: /:id

Описание: Возвращает клиента по ID.

Параметры:

id (обязательный) – ID клиента.

Успешный ответ (200):

json
Copy
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Иван Петров",
    "email": "ivan@example.com"
  }
}
Ошибки:

404 (Не найдено):

json
Copy
{
  "success": false,
  "message": "Клиент не найден"
}
500 (Ошибка сервера):

json
Copy
{
  "success": false,
  "message": "Не удалось загрузить клиента"
}
3. Создать нового клиента
Метод: POST

Эндпоинт: /

Описание: Добавляет нового клиента.

Тело запроса (JSON):

json
Copy
{
  "name": "Новый Клиент",
  "email": "new@example.com"
}
Успешный ответ (201):

json
Copy
{
  "success": true,
  "data": {
    "id": 3,
    "name": "Новый Клиент",
    "email": "new@example.com"
  }
}
Ошибки:

400 (Неверный запрос):

json
Copy
{
  "success": false,
  "message": "Имя и email обязательны"
}
500 (Ошибка сервера):

json
Copy
{
  "success": false,
  "message": "Не удалось создать клиента"
}
4. Обновить клиента
Метод: PUT / PATCH

Эндпоинт: /:id

Описание: Обновляет данные клиента.

Параметры:

id (обязательный) – ID клиента.

Тело запроса (JSON):

json
Copy
{
  "name": "Обновленное Имя",
  "email": "updated@example.com"
}
Успешный ответ (200):

json
Copy
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Обновленное Имя",
    "email": "updated@example.com"
  }
}
Ошибки:

404 (Не найдено):

json
Copy
{
  "success": false,
  "message": "Клиент не найден"
}
500 (Ошибка сервера):

json
Copy
{
  "success": false,
  "message": "Не удалось обновить клиента"
}
5. Удалить клиента
Метод: DELETE

Эндпоинт: /:id

Описание: Удаляет клиента по ID.

Параметры:

id (обязательный) – ID клиента.

Успешный ответ (200):

json
Copy
{
  "success": true,
  "message": "Клиент успешно удален"
}
Ошибки:

404 (Не найдено):

json
Copy
{
  "success": false,
  "message": "Клиент не найден"
}
500 (Ошибка сервера):

json
Copy
{
  "success": false,
  "message": "Не удалось удалить клиента"
}
Обработка ошибок
Все эндпоинты возвращают:

success (boolean) – Успешен ли запрос.

message (string) – Описание ошибки (если есть).

data (object/array) – Данные при успешном ответе.

Примеры запросов
1. Получить всех клиентов
bash
Copy
curl -X GET http://ваш-домен.ru/api/v1/customers
2. Создать клиента
bash
Copy
curl -X POST http://ваш-домен.ru/api/v1/customers \
  -H "Content-Type: application/json" \
  -d '{"name": "Алексей", "email": "alex@example.com"}'
Примечания
Замените http://ваш-домен.ru на ваш реальный домен.

Для безопасности можно добавить аутентификацию (JWT/OAuth).

Поля ответа могут отличаться в зависимости от вашей реализации.

Документация предполагает, что customerController.js использует clientService для работы с базой данных. Настройте поля и ответы в соответствии с вашим кодом. 🚀

