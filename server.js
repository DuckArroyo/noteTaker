const express = require("express");

//Initiates server
const app = express();

//Check that the server is listening and running
app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
