/*sliding*/
itemWidth = 0;
function init() { 
    /*alert("hi");*/
    var wb = document.getElementById("weatherBox"); 
    var container = wb.parentElement;
    var rangeWidth = container.clientWidth;
    alert("hi");

   /* var test = document.getElementById("container");
    var width = test.clientWidth;
     alert("hi");
    alert("width"+width);*/
    var itemWidth = rangeWidth/6;
    alert("item"+itemWidth);
    //alert("The width of the range is " + width + " pixels.");
     
    
    /*adjust the width of forecast box*/
    var forecast = document.getElementsByClassName("forecast");
    var n = forecast.length;
    for(i = 0; i<10; i++)
    {
        forecast[i].style.width = itemWidth;
    }
    test.style.left = "0px";
    //alert("The width of the range is " + forecast[0].clientWidth + " pixels.");
    /*var steppers = document.getElementsByClassName("stepper"); 
    var n = steppers.length; 
    for (i = 0; i < n; i++) { 
    
    } 
    */
}
/* called when button is pushed */

function gotNewPlace() {
	// get what the user put into the textbox
	var newPlace = document.getElementById("zipbox").value;

	// make a new script element
	var script = document.createElement('script');

	// start making the complicated URL
	script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+newPlace+"')&format=json&callback=callbackFunction"
	//script.src = "https://query.yahooapis.com/v1/public/yql?q=select item.condition.text from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+newPlace+"')&format=json&callback=callbackFunction"
	script.id = "jsonpCall";

	// remove old script
	var oldScript = document.getElementById("jsonpCall");
	if (oldScript != null) {
		document.body.removeChild(oldScript);
	}

	// put new script into DOM at bottom of body
	document.body.appendChild(script);
}

/*check which picture to use*/
function checkImg(text) {
    var imgSrc;
    if(text == "Partly Cloudy" || text == "Cloudy" || text == "Mostly Cloudy"){
        imgSrc = "./WeatherApp/cloudy.png";
        return imgSrc;
    }else if(text == "Sunny"){
        imgSrc = "./WeatherApp/sunny.png";
        return imgSrc;
    }else if(text == "Mostly Sunny"){
        imgSrc = "./WeatherApp/sunny.png";
        return imgSrc;
    }else if(text == "Showers" || text == "Rain"){
        imgSrc = "./WeatherApp/rain.png";
        return imgSrc;
    }else if(text == "Thunderstorms"){
        imgSrc = "./WeatherApp/thunder.png";
        return imgSrc;
    }else if(text == "Snow"){
        imgSrc = "./WeatherApp/snow.png";
        return imgSrc;
    }else{
        imgSrc = "./WeatherApp/cloudy.png";
    }
    return imgSrc;
}


/* called when new weather arrives */
var month = new Array();
month = {"Jan":"January","Feb":"February","Mar":"March", "Apr":"April","May": "May","Jun": "June", 
"Jul":"July", "Aug":"August","Sep":"September", "Oct":"October", "Nov":"November", "Dec":"December"};



function callbackFunction(data) {
	// data contains object returned from server
      /*abstract time and date*/
      var time = document.getElementById("time");
      time.innerHTML = "Today"+' '+JSON.stringify(data.query.results.channel.lastBuildDate).replace(/"\w+,\s[0-9]+\s\w+\s\w+\s|\s\w+"/g, '');
      var date = document.getElementById("date");
      var v1 = JSON.stringify(data.query.results.channel.lastBuildDate).replace(/"\w+,\s|\s\w+\s[0-9]+\s[0-9]+:[0-9]+\s\w+\s\w+"/g,'');
	  var v2 = JSON.stringify(data.query.results.channel.lastBuildDate).replace(/"\w+,\s[0-9]+|\s|[0-9]+\s[0-9]+:[0-9]+\s\w+\s\w+"/g,'');
	  var v3 = JSON.stringify(data.query.results.channel.lastBuildDate).replace(/"\w+,\s[0-9]+\s\w+\s|\s+[0-9]+:[0-9]+\s\w+\s\w+"/g,'');
	  var v5 = month[v2];
	  date.innerHTML = v5+' '+v1+", "+v3;
	  /*abstract information of today*/
	  /*city name*/
	  var cityName = document.getElementById("cityName");
	  cityName.innerHTML = data.query.results.channel.location.city+','+ data.query.results.channel.location.region;
	  /*temperature*/
	  var temperature = document.getElementById("temperature");
	  temperature.innerHTML = data.query.results.channel.item.condition.temp;
	  /*weather*/
	  var weather = document.getElementById("weather");
	  weather.innerHTML = data.query.results.channel.item.condition.text;
	  /*image*/
	  var weatherImg = document.getElementById("weatherImg");
	  weatherImg.src = checkImg(data.query.results.channel.item.condition.text);
	  
	  /*humidity*/
	  var humidity = document.getElementById("humidity");
	  humidity.innerHTML = "    "+data.query.results.channel.atmosphere.humidity+'%';
	  var humImg = document.getElementById("humImg");
	  humImg.src = "./WeatherApp/drop.png";
	  
	  /*windSpeed*/
	  var windSpeed = document.getElementById("windSpeed");
	  windSpeed.innerHTML = data.query.results.channel.wind.speed+"mph";
	  var windSpeedImg = document.getElementById("windSpeedImg");
	  windSpeedImg.src = "./WeatherApp/wind.png";
	  
	  /*next ten days*/
	  var forecastDate = document.getElementsByClassName("forecastDate");
	  var forecastImg = document.getElementsByClassName("forecastImg");
	  var forecastWeather = document.getElementsByClassName("forecastWeather");
	  var forecastTemp = document.getElementsByClassName("forecastTemp");
	  var items = data.query.results.channel.item.forecast;
      
	  var wind = data.query.results.channel.wind;
	  
	  var humidity =  data.query.results.channel.atmosphere.humidity;
	  document.getElementsByClassName("forecastDate")[0].innerHTML = JSON.stringify(items[0].day);
	  alert("hi");
	  //specialItem.textContent = JSON.stringify(inf.date+' '+wind.speed+' '+humidity+'%'+' '+inf.temp+' '+inf.text);
	  var i;
	  for(i=0; i<10; i++)
	  {
	    forecastDate[i].innerHTML = items[i].day;
	    forecastImg[i].src = checkImg(items[i].text);
	    forecastWeather[i].innerHTML = items[i].text;
	    forecastTemp[i].innerHTML = items[i].high+' '+items[i].low;
	   }
	  
}

/*global variable for moving*/
left = 0;
/*Button for left sliding*/
function buttonLefttAction() {
    var forecast = document.getElementsByClassName("forecast");
    var container = document.getElementById("container");
     var width = container.clientWidth;
    /*var width = forecast[0].clientWidth;
    var container = document.getElementById("container");
    var container = document.getElementById("container");
	
	/*slide until reach the end of sliding box*/
	if (left < 0) {
		left = left+(width/5);
	 }
	//var forecast = document.getElementByClassName("forecast");
	container.style.left = left+"px";
}

/*Button for right sliding*/
function buttonRightAction() {
    var forecast = document.getElementsByClassName("forecast");
    /*var width = forecast[0].clientWidth;*/
    var container = document.getElementById("container");
    var width = container.clientWidth;
    //alert(width);
    /*var container = document.getElementById("container");;*/
	/*var style = forecast[0].currentStyle || window.getComputedStyle(forecast[0]);
	var margin_left = style.marginLeft;
	var margin_right = style.marginRight;*/
	/*slide until reach the end of sliding box*/
	if (-left <= (width)-(width/5)) {
		left = left-(width/5);
	}
	//var forecast = document.getElementByClassName("forecast");
	container.style.left = left+"px";
}


