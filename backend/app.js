const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const apiRoutes = require('./routes/api');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiRoutes);

mongoose.connect('mongodb+srv://admin:MaIxDgxk3RtM26wq@cluster0-b3dye.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => app.listen(PORT))
    .catch(err => console.log(err));