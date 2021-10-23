const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json"); //just grab the stuff in that .json file!
//console.log("Initial import", db); //show me db
//console.log(typeof db); //what type of file is db?

//Setup for a heroku deploy but not actually deployed to heroku.
const PORT = process.env.PORT || 3001;
//Initiates server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.send("Hello! test");
});

function filterByQuery(query, dbArray) {
  let filteredResults = dbArray;
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
// noteTitle = document.querySelector('.note-title');
// noteText = document.querySelector('.note-textarea');
// saveNoteBtn = document.querySelector('.save-note');
// newNoteBtn = document.querySelector('.new-note');
// noteList = document.querySelectorAll('.list-container .list-group');

//f to filter notes by id.
function findById(id, dbArray) {
  const result = dbArray.filter((db) => db.id === id)[0];
  return result;
}

function createNewNote(body, dbArray) {
  console.log(body);
  const note = body;
  dbArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ db: dbArray }, null, 2)
  );
  return body;
}

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
  //console.log(req.body);
  //if (!validateAnimal(req.body)) {
  //  res.status(400).send("The note is incomplete.");
  //} else {
  const note = createNewNote(req.body, db);
  res.json(req.body);
  //}
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Check that the server is listening and running
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
