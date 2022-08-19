const axios = require("axios");
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Starting server at: ${port}`);
});

// Define a route handler for HTTP GET requests
app.get("/simmeringData", function (req, res) {

  const simmeringApiUrl = 'https://simmerring-api-stag.azurewebsites.net/api/SimmerringFinder?apiKey=2c5fe3bd-923e-4d48-a044-9772bc190674';
  const requestData = {
     "metricSystem": "Metric",
     "shaftDiameter": 25,
     "caseDiameter": 35,
     "width": 5,
     "material": "72 NBR 902",
     "design": "BAUMSL",
     "dustlip": false
   };

  axios.post(simmeringApiUrl, requestData)
    .then(response => {
       // send the collected data back to the client-side DataTable
       res.json({
         "data": response.data
       })
     })
     .catch(function (error) {
        // handle error
        console.log(error);
        res.json({"error": error});
     })
});
