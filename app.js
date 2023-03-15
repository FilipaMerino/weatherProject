const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true }));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){

  var city = req.body.cityName;
  const apiKey = "1233736454d5aaae70c67fad70b09f02";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey +"&units	=" + units + "";


  https.get(url, function(response){

    response.on("data", function(data){

      const weatherInfo = JSON.parse(data);
      const temp = weatherInfo.main.temp;
      const description = weatherInfo.weather[0].description;
      const icon = weatherInfo.weather[0].icon;
      const iconURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png";

      res.write("<p> The weather is currently " + description + ".</p>");
      res.write("<h1>The temperature is " + temp + " degrees celsius.</h1>");
      res.write("<img src=" + iconURL + ">");
      res.send();
    })
  });
});





app.listen(3000);
