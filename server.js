const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const { sendDataToPython } = require('./pythonController');


const app = express();
const port = 3001;


app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.post('/api/sendData', async (req, res) => {
  const { selectedRoom, inputValue } = req.body;
  console.log('Received data:', selectedRoom, inputValue);

  // Assuming you have a Python function to handle data processing
  const resultLength = await sendDataToPython(selectedRoom, inputValue);
  res.json({ resultLength });
});


  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


