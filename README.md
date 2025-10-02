# «Метаданные студента»:

- ФИО - Ващук Анатолий Валерьевич
- Группа - АС-63
- № студенческого/зачетной книжки (StudentID) - 220036
- Email (учебный) - as006407@g.bstu.by
- GitHub username - skevet-avramuk
- Вариант № - 1
- Дата выполнения - 30.09.2025
- ОС (версия), версия Docker Desktop/Engine - Windows 11, Docker version 27.4.0

# Запуск проекта

1. Клонирование репозитория:

- git clone https://github.com/<твой-логин>/RSOT.git
- cd RSOT

2. Сборка и запуск контейнеров:

- docker compose up -d --build

3. Проверка работы приложения:

## Healthcheck

- Invoke-RestMethod http://localhost:8081/health
  или
- curl http://localhost:8081/health

Ожидаемый результат: OK

## Readiness

- Invoke-RestMethod http://localhost:8081/ready

Ожидаемый результат: READY

## Redis

- curl http://localhost:8081/visit

Ожидаемый результат: Количество визитов: 1

4. Остановка и удаление контейнеров:

- docker compose down

Если нужно удалить тома данных Redis, необходимо добавить -v:

- docker compose down -v
