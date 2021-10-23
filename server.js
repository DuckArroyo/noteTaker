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

//Express middleware - instructs server to use files in public.
app.use(express.static("public"));
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
// Works in conjuciton with Post Route.
// Pushes new Note to array and writes to db.json file
//!Wrote these passing paraments last night with errors.
//!do not pass dbArray it is undefined.
function createNewNote(body) {
  console.log("Console of body: ", body);
  //console.log("Console of dbArray: ", dbArray);
  const note = body;
  //dbArray.push(note); //!What should I be passing here?
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(note, null, 2) //! {db: dbarray} AskBCS said this was wrong.
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

//!commented out because of error
app.post("/api/notes", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = db.length.toString();
  //I believe I am defining the parameters from index.html and passing them to the db.x to be passed to db.json.
  // db.title = req.body.noteTitle;
  // db.text = req.body.noteText;
  const note = createNewNote(req.body);
  console.log("Console in route");
  console.log("Console of note: ", note);
  console.log("Console of req.body: ", req.body);
});

//!DELETE
app.delete("/api/notes/:id", (req, res) => {
  const deleteNote = db.params.id;
  if (deleteNote === -1) return res.status(404).json({}); //!What does between curly?
  notes.splice(deleteNote, 1);
  res.json(notes);
});

//!!Example
// router.delete('/users/:userId', (req, res) => {
//   const userIndex = getUserIndex(req.params.userId)
//   if (userIndex === -1) return res.status(404).json({})
//   users.splice(userIndex, 1)
//   res.json(users)
//  })
// https://www.tabnine.com/code/javascript/functions/express/Router/delete

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
