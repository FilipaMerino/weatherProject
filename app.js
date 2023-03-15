const express = require("express");

const https = require("https");

const app = express();


app.get("/", function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=1233736454d5aaae70c67fad70b09f02&units	=metric"

  https.get(url, function(response){

    response.on("data", function(data){

      const weatherInfo = JSON.parse(data);

      const temp = weatherInfo.main.temp;
      console.log(temp);

      const country = weatherInfo.sys.country;
      console.log(country);

      const description = weatherInfo.weather[0].description;
      console.log(description);


      const icon = weatherInfo.weather[0].icon;
      const iconURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png";

      res.write("<p> In Lisbon(" + country + "), the weather is currently " + description + ".</p>");
      res.write("<h1>The temperature is " + temp + " degrees celsius.</h1>");
      res.write("<img src=" + iconURL + ">");
      res.send();
    })

  });


});

app.listen(3000);
