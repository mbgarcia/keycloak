console.log("Sending two requests to the callback endpoint with the same authorization code...");

// replay-attack.js
// Simulating a replay attack by sending the same authorization code twice  to the callback endpoint.

// run in docker container using ts-node
// ./node_modules/.bin/ts-node authorization-code-flow/src/replay-attack.js

const url = "http://localhost:3000/callback?session_state=a9L1AgCinHmQeGfnxOo9Kg6n&iss=http%3A%2F%2Flocalhost%3A8080%2Frealms%2Ffullcycle&code=c7ce9e41-1d80-7f35-00d3-cbc58279ace3.a9L1AgCinHmQeGfnxOo9Kg6n.ca4e0517-9b43-4370-b719-7cdce04eb04e";

const request1 = fetch(url);

Promise.all([request1])
  .then(async responses => 
    Promise.all(responses.map(res => res.json()))
  )
  .then((jsons) => console.log(jsons));