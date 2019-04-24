"strict mode";

function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {
  var x = document.getElementById("city").textContent;
  let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q="+x+",CA,US&units=imperial&APPID=6df68ea9b43b94f07396f918a9edb37b";
  let xhr = createCORSRequest('GET', url);

  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  xhr.onload = function() {
      let responseStr = xhr.responseText;  // get the JSON string
      let object = JSON.parse(responseStr);  // turn it into an object
      // console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted
      data(object);
  };
  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

function data(object){
  let temp1 = document.getElementById("temp1");
  temp1.textContent= Math.round(object.list[0].main.temp);
  let temp2 = document.getElementById("temp2");
  temp2.textContent= Math.round(object.list[1].main.temp);
  let temp3 = document.getElementById("temp3");
  temp3.textContent= Math.round(object.list[2].main.temp);
  let temp4 = document.getElementById("temp4");
  temp4.textContent= Math.round(object.list[3].main.temp);
  let temp5 = document.getElementById("temp5");
  temp5.textContent= Math.round(object.list[4].main.temp);
  let temp6 = document.getElementById("temp6");
  temp6.textContent= Math.round(object.list[5].main.temp);

  var date = new Date();
  var elementID = "curtime";
  var elementID1 = "time1";
  var elementID2 = "time2";
  var elementID3 = "time3";
  var elementID4 = "time4";
  var elementID5 = "time5";

  timeForward(date,0,elementID);
  timeForward(date,1,elementID1);
  timeForward(date,2,elementID2);
  timeForward(date,3,elementID3);
  timeForward(date,4,elementID4);
  timeForward(date,5,elementID5);

  let condition = document.getElementById("condition");
  condition.textContent = object.list[0].weather[0].icon;
  if(object.list[0].weather[0].icon == "01d"){
    //clear sky
  }
  else if(object.list[0].weather.icon == "02d"){
    //few clouds
  }
  else if(object.list[0].weather.icon == "03d"){
    //scattered clouds
  }
  else if(object.list[0].weather[0]=="11d"){
    //thunderstorm
  }
  else if(object.list[0].weather.icon == "09d"){
    //drizzle
  }
  else if(object.list[0].weather.icon == "10d"){
    //Rain
  }
  else if(object.list[0].weather.icon == "13d"){
    //Snow
  }
  else if(object.list[0].weather.icon == "50d"){
    //atmosphere
  }

}

function timeForward(date,time,elementID) {
  var hours = date.getHours() + time;
  var hours = hours % 24;
  var ampm = 'AM';
  if (hours == 0){
    hours = 12;
  }
  else if(hours > 12){
    ampm = 'PM';
    hours = hours - 12;
  }
  var strTime = hours + ampm;
  let currentTime = document.getElementById(elementID);
  currentTime.textContent = strTime;
}

function newRequest(){
  let title = document.getElementById("city");
  title.textContent = document.getElementById("userInput").value;
  makeCorsRequest();
}
// run this code to make request when this script file gets executed
makeCorsRequest();
