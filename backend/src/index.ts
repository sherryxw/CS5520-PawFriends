import express from 'express';

const app = express();
const port = 9527;

app.get('/', (request, response) => {
  response.send('Hello World');
});

app.listen(port, () => {
  console.log(`The server is started at port ${port}`);
});
