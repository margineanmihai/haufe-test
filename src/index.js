const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios');

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
  });

router.get('/', (req, res) => {
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    }
  
    res.status(200).send(data);
  });

  app.get('/healthcheck',(req, res) => {
    const data = {
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date()
      }
    
      res.status(200).send(data);
  });

  app.get('/', (req, res) => {
      res.send('Node homepage');
  })

  const getHealthcheck = async () => {
    try {
        return await axios.get('http://localhost:3005/healthcheck');
      } catch (error) {
        console.error(error)
      }
  }
  app.get('/angular-app', async (req, res) => {
    const healthCheck = await getHealthcheck();
    if(healthCheck.status === 200) {
        res.send('call to angular-app');
        // await axios.get('http://localhost:3007');
    }
    res.send('healthcheck failed. can\'t access angular-app');
})



const port = process.env.PORT || 3005;

app.listen(port, () => console.log(`Listening on port ${port}`));
