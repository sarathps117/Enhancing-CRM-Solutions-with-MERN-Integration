const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_crm_db';

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('MERN CRM API is running'));

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

app.use((req,res)=> res.status(404).json({error: 'Not Found'}));

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> app.listen(PORT, ()=> console.log('Server running on port', PORT)))
  .catch(err => { console.error(err.message); app.listen(PORT, ()=> console.log('Server running (DB not connected) on', PORT)); });
