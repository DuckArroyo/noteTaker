const express = require("express");
const path = require("path");
const db = require("./db/db.json"); //just grab the stuff in that .json file!
console.log(db); //show me db
console.log(typeof db); //what type of file is db?

const PORT = process.env.PORT || 3001;
//Initiates server
const app = express();

app.get("/api/hello", (req, res) => {
  res.send("Hello! test");
});

app.get("/api/notes", (req, res) => {
  res.json(db);
});

// app.get("/api/notes/:id", (req, res) => {
//   const result = findById(req.params.id, db);
//   if (result) {
//     res.json(result);
//   } else {
//     res.send(404);
//   }
// });

//   app.post('/api/notes', (req, res) => {
//     // set id based on what the next index of the array will be
//     req.body.id = animals.length.toString();

//     if (!validateAnimal(req.body)) {
//       res.status(400).send('The note is incomplete.');
//     } else {
//       const animal = createNewAnimal(req.body, db);
//       res.json(animal);
//     }
//   });

//   app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
//   });

//   app.get('/animals', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/animals.html'));
//   });

//   app.get('/zookeepers', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/zookeepers.html'));
//   });

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
//   });

//Check that the server is listening and running
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
