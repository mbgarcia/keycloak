import express from 'express';

// fluxo
//login --> heycloack (formulario de auth) --> callback (com o code) --> heycloak (devolve o token)
const app = express();
app.get('/login', (req, res) => {  
  const loginParams = new URLSearchParams({
    client_id: 'fullcycle',
    redirect_uri: 'http://localhost:3000/callback',
    response_type: 'code',
    scope: 'openid',
  });

  const url = `http://localhost:8080/realms/fullcycle/protocol/openid-connect/auth?${loginParams.toString()}`;
  
  console.log(url);
  
  res.redirect(url);
});

app.get('/callback', async (req, res) => {
  console.log('Callback received with query:', req.query);

  const bodyParams = new URLSearchParams({
    client_id: 'fullcycle',
    grant_type: 'authorization_code',
    code: req.query.code as string,
    redirect_uri: 'http://localhost:3000/callback',
  });

  const tokenUrl = `http://host.docker.internal:8080/realms/fullcycle/protocol/openid-connect/token`;

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: bodyParams.toString(),
  });

  const data = await response.json();
  console.log('Token Response:', data);

  res.send(data);
});

const PORT = process.env.PORT || 3000;  

app.listen(PORT, () => {
  console.log(`Authentication Flow Service is running on port ${PORT}`);
});