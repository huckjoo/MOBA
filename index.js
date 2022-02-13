const express = require('express')
const mongoose = require('mongoose')

const app = express()
mongoose.connect('mongodb+srv://MOBA:jungle123@cluster0.ytmfn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(console.log('MongoDB Connected')).catch(error => console.log(error));

const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


