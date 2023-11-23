import { log } from "console";
import express, { json, response } from "express";
import https from "https";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({extended : true}));
app.get("/",(req,res)=>{

    res.sendFile(__dirname+"/index.html");
})
app.post("/",(req,res)=>{

    const appkey = "6679602c066a498b35c36e79d8bd4785";
    const query = req.body.cityName;
    const unit = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?appid="+appkey+"&q="+query+"&units="+unit;
    https.get(url,(response)=>{
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const iconurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<h1>The temperature in "+query+" is "+temp+" Celcius</h1>");
            res.write("<img src = "+iconurl+" >");
            res.send();
        });

    });
});
app.listen(3000,()=>{
    console.log("weather server running");
})