# Futtatás

Clone-olás után két terminált érdemes megnyitni:
-   Frontend: terminálnyitás -> cd .\FrontEnd\
-   Backend: terminálnyitás -> cd .\BackEnd\

mindkettőben npm install

a ".env.stolth"(backend mappa) fájlt átnevezni ".env" -re !!!!

## Backend

futtatni ebben a sorrendben
```
npx prisma db push

npx prisma db seed

npm run start
```

## Frontend

```
npm run dev
```