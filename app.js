const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const appRoutes = require('./app.routes');
mongoose.Promise = Promise;

app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/task_manager', (error) => {
    if (error) {
        console.error("Database Connection Failure:", error);
    }
    app.use('/', appRoutes);
});

app.listen(3000, function () {
    console.log("Listening on port:", 3000);
});