import express from "express";
const app = express();
const port = parseInt(process.env.BLOCKLET_PORT, 10) || 4000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));