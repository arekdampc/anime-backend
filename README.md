1. needed node
2. needed nodemon

to run (terminal): nodemon .\serves.js

then u can use f.e Thunder client and shoot to database:

POST: localhost:3000/animes
GET: localhost:3000/animes/{id_number}
DEL: localhost:3000/animes/{id_number}
PUT: localhost:3000/animes/{id_number}

example json: 
POST: 
{
  "title": "Dragon Ball Z ",
  "studio": "Toei Animation",
  "release": 2001
}

example in mongoDB:
![mongoDB screenshot](https://github.com/arekdampc/anime-backend/assets/52856321/ccd8face-33d3-4565-9b00-6e87060f1004)
