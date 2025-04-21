const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017/cricket', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());

const matchRoutes = require('./routes/matchRoutes');
app.use('/api/match', matchRoutes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));