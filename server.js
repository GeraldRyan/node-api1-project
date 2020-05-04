const express = require('express'); // import the express package

const server = express(); // creates the server
server.use(express.json()); // teaches express how to read JSON from the body



let people = [
  {
    id: 1,
    name: "Introduction to HTTP APIs with Node and Express",
    bio:"",
  },
];

// handle requests to the root of the api, the / route
server.get('/', (req, res) =>
{
  res.send('Hello from Express');
});


server.post("/api/users", (req, res) =>
{
  // - If the request body is missing the `name` or `bio` property:

  // - respond with HTTP status code `400` (Bad Request).
  // - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.
  const person = req.body;

  // res.status(200).json(person);
  // res.send('Hello from Express');

  if ( person.name === undefined || person.bio === undefined ) {
  res.status(400).json({ "errorMessage": "Please provide name and bio for the user." })
  }
  else{
  res.status(201).json({ "done": "Good job" })
  }

})
server.get("/api/users", (req, res) =>
{
  res.status(200).json(people);
  // res.send('Hello from Express');
})
server.get("/api/users/:id", (req, res) =>
{
  res.send('Hello from Express');
})
server.delete("/api/users/:id", (req, res) =>
{
  res.send('Hello from Express');
})
server.patch("/api/users/:id", (req, res) =>
{
  res.send('Hello from Express');
})




// watch for connections on port 5000
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000'));