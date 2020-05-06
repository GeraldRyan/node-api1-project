const express = require('express'); // import the express package

const server = express(); // creates the server
server.use(express.json()); // teaches express how to read JSON from the body

let errorMessage = {}

let people = [
  {
    id: 1,
    name: "Duncan",
    bio: "Born in Feif",
  },
  {
    id: 2,
    name: "Catriona",
    bio: "Born in Glasgow",
  },
  {
    id: 3,
    name: "Tyler",
    bio: "Born in Ireland",
  },
  {
    id: 4,
    name: "Steph",
    bio: "Born in New York",
  }
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

  if (person.name === undefined || person.bio === undefined)
  {
    res.status(400).json({ "errorMessage": "Please provide name and bio for the user." })
  }
  else if (person.name && person.body && person.id)
  {
    people.push(person)
    res.status(201).json(people)
  }
  else
  {
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
  }
})



server.get("/api/users", (req, res) =>
{
  if (req)
  {

    res.status(200).json(people);
  }
  else
  {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
  }
  // res.send('Hello from Express');
})



server.get("/api/users/:id", (req, res) =>
{
  const id = req.params.id
  const userID = people.filter((item) =>
  {
    if (item.id == id)
    {
      return item
    }
    else { return (null) }
  })
  console.log("Req Params ID, userID", id)
  if (userID.length === 0)
  {
    res.status(404).json({ message: "The user with the specified ID does not exist." })
  }
  else if (userID.length !== 0)
  {
    res.status(200).json(userID)
  }
  else (
    res.status(500).json({ errorMessage: "The user information could not be retrieved." })
  )
})
server.delete("/api/users/:id", (req, res) =>
{
  const id = req.params.id
  const userID = people.filter((item) =>
  {
    console.log("ID, item.id", id, item.id)
    if (item.id == id)
    {
      console.log("Item found", item)
      return item
    }

  })
  const remainingUsers = people.filter((item) =>
  {
    if (item.id != id)
    {
      return item
    }
    else { return (null) }
  })
  if (userID.length === 0)
  {
    res.status(404).json({ message: "The user with the specified ID does not exist." })
  }
  else if (userID[0].id == id)
  {
    people = remainingUsers
    // code here, fulfill delete
    res.status(202).json(people)
  }
  else
  {
    res.status(500).json({ errorMessage: "The user could not be removed" })
  }
})





server.put("/api/users/:id", (req, res) =>
{
  const newUser = req.body
  const id = req.params.id
  const userID = people.filter((item) =>
  {
    if (item.id == id)
    {
      return item
    }
    else { return (null) }
  })
  if (userID.length === 0)
  {
    res.status(404).json({ message: "The user with the specified ID does not exist." })
  }
  else if (newUser.name && newUser.bio)
  {
    const allUsers = people.filter((item) =>
    {
      if (item.id != id)
      {
        return item
      }
      else { return (null) }
    })
    allUsers.push(newUser)
    people = allUsers
    res.status(200).json(people)
  }
  else {
    es.status(500).json({error:"Error"})
  }
})




// watch for connections on port 5000
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000'));