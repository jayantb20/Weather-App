//jshint cersion:6
const express = require("express");
const app = express();
const port= 3000;
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res) => {

  res.sendFile(__dirname + "/index.html");
});




app.post("/",(req,res) => {

  const query =  req.body.cityName;
    const apiKey = "9a0a7ddb0f98064b2fa70476eca16ea2";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey +"&units="+ unit;

  https.get(url, (response) => {

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp =weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const weatherDescription = weatherData.weather[0].description;
      res.write("<h1>the Temperature in " + query + " is: " + temp + " degree Celcius</h1>");
      res.write("<h3>The weather description is: " + weatherDescription + "</h3>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    })
  })

})
app.listen(port, () => {
  console.log("this is port 3000");

})