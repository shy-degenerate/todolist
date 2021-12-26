# todolist
I had to start somewhere, ok?
## setup
```
npm install && npm install --prefix client
npm run dev
```
## .env
```
MONGO_URI=<your-uri>
PORT=<your-port>
JWT_SECRET=<your-jwt-secret>
JWT_LIFETIME=<your-jwt-lifetime>
DEV=<true-or-false>
```
## client/config.json
```json
{
    "API_URL": "<your-api-url>" // for example: http://localhost:5000
}
```