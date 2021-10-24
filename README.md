# Note Taker Starter Code

Module 11 assignment debrief:

## All of the criteria items were completed.

## Technical Acceptance Criteria

- application connects to back end.
- application stores notes and designates a unique id.
- pending deployment to Heroku. I am not able to install heroku. Will try a second computer after attempting delete module.

## Deployment

- pending - Deployed to live URL.
- Deploys with no errors.
- <a href="https://still-sands-24648.herokuapp.com/" target="_blank">Heroku link/Live application</a>
- <a href="https://duckarroyo.github.io/challenge11/" target="_blank">Link to GitHub (README)</a>
- <a href="https://github.com/DuckArroyo/challenge11" target="_blank">Link to repo</a>

<img src="./Assets/ScreenShot1.png" style="width: 400px">
<img src="./Assets/ScreenShotTypedNote.png" style="width: 400px">
<img src="./Assets/ScreenShotSavedNote.png" style="width: 400px">
<img src="./Assets/ScreenShotRetrievedNote.png" style="width: 400px">

## Acceptance Criteria

GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page -DONE
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column -DONE
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page -DONE
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes -DONE
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column -DONE
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column -DONE

## Getting Started

The application should have a db.json file on the back end that will be used to store and retrieve notes using the fs module.
The following HTML routes should be created:
GET /notes should return the notes.html file.
GET \* should return the index.html file.
The following API routes should be created:
GET /api/notes should read the db.json file and return all saved notes as JSON.
POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

## Bonus

You haven’t learned how to handle DELETE requests, but this application has that functionality in the front end. As a bonus, see if you can add the DELETE route to the application using the following guideline:

DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

## Grading Requirements

Application front end must connect to an Express.js back end.
Application back end must store notes with unique IDs in a JSON file.
Application must be deployed to Heroku.

Application deployed at live URL.
Application loads with no errors.
Application GitHub URL submitted.
GitHub repository contains application code
