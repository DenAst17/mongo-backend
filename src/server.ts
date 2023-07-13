import express from 'express';
import usersRoute from './routes/users.route';
import client from './database/mongo.client';
import 'dotenv/config';

async function check() {
  try {
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
check().catch(console.dir);

const app = express();
const port = 3000;

app.use(usersRoute());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})