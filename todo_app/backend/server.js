const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);

mongoose.connect('mongodb://localhost:27017/tododb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

app.listen(5000, () => console.log('Server running on port 5000'));
