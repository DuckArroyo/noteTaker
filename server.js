const express = require("express");
const fs = require("fs");
const util = "util";
const path = require("path");
const db = require("./db/db.json");

//Setup for a heroku deploy but not actually deployed to heroku.
const PORT = process.env.PORT || 3001;
//Initiates server
const app = express();

//Express middleware - instructs server to use files in public.
app.use(express.static("public"));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

function filterByQuery(query, db) {
  let filteredResults = db;
  //See comments below for origin of queries
  if (query.noteTitle) {
    filteredResults = filteredResults.filter(
      (db) => (db.noteTitle = query.noteTitle)
    );
  }
  if (query.id) {
    filteredResults = filteredResults.filter((db) => (db.id = query.id));
  }
  return filteredResults;
}

//f to filter notes by id.
function findById(id, db) {
  const result = db.filter((db) => db.id === id)[0];
  return result;
}

//!readCurrentDb is not working. It is declared above.
// const readCurrentDb = fs.readFile("./db/db.json", "utf-8", function (data) {
//   console.log(readCurrentDb);
//   console.log(data);
// });

function createNewNote(body) {
  //!readCurrentDb goes here.

  console.log("Console of body: ", body);
  //console.log("Console of readCurrentDb: ", readCurrentDb);
  db.push(body);
  console.log("New db after push", db);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(db, null, 2)
  );
  console.log("After WriteFile");
  console.log("Log of stringified db:", db);

  return db;
}

app.get("/api/hello", (req, res) => {
  res.send("Hello! test");
});

//Outputs the notes. Has a filter by query, dunno why.
app.get("/api/notes", (req, res) => {
  let results = db;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  console.log("Query:", req.query);
  console.log("Console log: ", results);
  res.json(results);
});

app.get("/api/notes/:id", (req, res) => {
  const result = findById(req.params.id, db);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.post("/api/notes", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = db.length.toString();
  const dbArray = [db];
  console.log("Console of dbArray in api route: ", dbArray); // db in []
  console.log("Console of req.body in api route: ", req.body); //Input from insomnia
  const note = createNewNote(req.body, dbArray);
  res.json(note); //!Currently showing as undefined
  console.log("Console of note in api route: ", note);
});

//Creates connection to the root route of the server
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Check that the server is listening and running
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
