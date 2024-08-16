# Simple websocket-messaging


## How to Use the Repository: <a name = "getting_started"></a>

Clone the repository:
```
git clone https://github.com/Hasmik-icml/websocket-messaging.git
cd websocket-messaging
```
Create an .env file in the backend directory with your database credentials:
```

POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_database_name

```
Run the Application with Docker
```

docker-compose up --build

```

For test load messaging
```

cd backend
$ npm run start

