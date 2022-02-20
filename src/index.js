const express = require('express');
const app = express();
const router = express.Router();

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

  app.use('/healthcheck',router);

const port = process.env.PORT || 3005;

app.listen(port, () => console.log(`Listening on port ${port}`));
