const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

app.use(express.json());

mongoose.connect(config.mongoURI,
     { dbName: 'HospitalAPIs',
      //  useNewUrlParser: true, 
      //   useUnifiedTopology: true 
    }
        );

app.get('/', (req,res)=>{
  return res.send("Welcome to my Hospital Server");
})
// Use routes
app.use('/doctors', doctorRoutes);
app.use('/patients', patientRoutes);
app.use('/reports', reportRoutes);

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
