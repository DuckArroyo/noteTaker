const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json");
const router = require("express").Router();
const store = require("../db/store");

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

app.get("/api/hello", (req, res) => {
  res.send("Hello! test");
});

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
// Works in conjunction with Post Route.
// Pushes new Note to array and writes to db.json file
//!Wrote these passing paraments last night with errors.
//!do not pass db, it shows as undefined.
function createNewNote(body, db) {
  console.log("Console of body: ", body);
  console.log("Console of db: ", db);
  db.push(body); //!What should I be passing here?
  console.log("New db after push", db);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(body, null, 2) //! {db: db} AskBCS said this was wrong.
  );
  console.log("After WriteFile");

  return body;
}

//Outputs the notes. Has a filter by query, dunno why.
// app.get("/api/notes", (req, res) => {
//   let results = db;
//   if (req.query) {
//     results = filterByQuery(req.query, results);
//   }
//   console.log("Query:", req.query);
//   console.log("Console log: ", results);
//   res.json(results);
// });

// GET "/api/notes" responds with all notes from the database
router.get("/notes", (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

app.get("/api/notes/:id", (req, res) => {
  const result = findById(req.params.id, db);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// app.post("/api/notes", (req, res) => {
//   // set id based on what the next index of the array will be
//   req.body.id = db.length.toString();

//   const dbArray = [db];

//   const note = createNewNote(req.body, dbArray);
//   console.log("Console in route");
//   console.log("Console of note: ", note);
// });

router.post("/notes", (req, res) => {
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

// DELETE "/api/notes" deletes the note with an id equal to req.params.id
router.delete("/notes/:id", (req, res) => {
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
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
