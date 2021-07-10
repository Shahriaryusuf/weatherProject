const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){

res.sendFile( __dirname +"/index.html");   
});

//post data received from html form
app.post("/", function(req, res){

console.log(req.body.cityName);

const city = req.body.cityName;
const apiKey = "c27aa48047403f5ca39df367c855b5cb";
const unit = "metric";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;


https.get(weatherUrl,function(apiResponse){
console.log("your status code is = "+ apiResponse.statusCode);
//get the json data

apiResponse.on("data",function(data){

const weatherData = JSON.parse(data) 
const temp = weatherData.main.temp;

const weatherDesc = weatherData.weather[0].description;
const weatherIcon = " http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon + "@2x.png";
console.log(temp + " "+ weatherDesc);
res.write("<p>The weather is currently "+ weatherDesc +"</p>");
res.write("<h1>The temperature of "+ city+" "+temp+" degree Celcius</h1>");
res.write("<img src=" + weatherIcon+">");
res.send();

});


});




});


app.listen(3000,function(){
    console.log("server is running in port 3000.")
});



