### 0. Presetup

0.1) create record in OS host file
`127.0.0.1 host.docker.internal`
https://learn.jetrails.com/article/how-to-create-a-hosts-entry-record#windows

0.2) Install Docker and Docker compose
https://youtu.be/QF4ZF857m44


### 1. Setup main services

1.1) Open `main-services` in terminal and run
```
docker-compose -f docker-compose.yml up --build
```

1.2) Wait before successful results (http://localhost:40003/ enabled to open)

### 2. Init test data

2.1) Open admin panel in browser http://localhost:40001/

```
Login: john
Password: 1
```

2.2) Click "Init test data" button

### 3. Setup customer admin panel

3.1) Copy `customer-services/admin-panel/example.env` file to `customer-services/admin-panel/.env`

3.2) Open `customer-services/admin-panel` in terminal and run:
```
npm i
npm run start
````

### Main Urls

http://localhost:41010/ - Admin panel for customer

----

http://localhost:40000/ - Main backend API

----

http://localhost:40001/ - Main AdminPanel

```
Login: john
Password: 1
```

----

http://localhost:40002/ - WelcomPage

----

http://localhost:40003/ - keycloak

```
Login: admin
Password: password
```
https://www.keycloak.org/docs-api/15.0/rest-api/index.html
