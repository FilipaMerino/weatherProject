const express = require("express");

const https = require("https");

const app = express();


app.get("/", function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=1233736454d5aaae70c67fad70b09f02"

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){

      const weatherInfo = JSON.parse(data);

      const temp = weatherInfo.main.temp
      console.log(temp);

      const humidity = weatherInfo.main.humidity
      console.log(humidity);
    })

  });


  res.send("You're in!")
});

app.listen(3000);
