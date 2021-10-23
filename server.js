const express = require("express");
const fs = require("fs");
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

function createNewNote(body) {
  //const readFile =
  const dba = fs.readFile("./db", function (data) {
    console.log(data);
  });

  //adapting will remove teh need to pass db.
  //readfile ascyn /db/db.json //!look at get notes.
  //parse it

  ///then they add Notes. READ IT
  //Parse it.

  // console.log("Console of body: ", body);
  // console.log("Console of db: ", dba);
  // db.push(body);
  // console.log("New db after push", db);
  // fs.writeFileSync(
  //   path.join(__dirname, "./db/db.json"),
  //   JSON.stringify(body, null, 2) //! {db: db} AskBCS said this was wrong.
  // );
  // console.log("After WriteFile");

  // return body;
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
  const dbArray = [db];
  const note = createNewNote(req.body, dbArray);
  console.log("Console of note: ", note);
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
