const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());

mongoose.connect();
mongoose.connection.once('open', () => {
  console.log("Connected to database");
})

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, ()=>{
  console.log("Test on http://localhost:4000/graphql");
})
