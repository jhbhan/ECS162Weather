
function createCORSRequest(method, url) {
	let request = new XMLHttpRequest();
	request.open(method,url,true);
	return request
}

function updateHTML(object){
	//update current
	let picture = document.getElementById('current_picture');
	let temperature = document.getElementById('current_temperature');
	var date = new Date;
	var weatherClass = "current_weather";
	updateTime(date, weatherClass);
	temperature.textContent= Math.round(object.list[0].main.temp);
}

function updateTime(date, weatherClass){
	if (weatherClass == "current_weather"){
		var hours = date.getHours();
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
		let currentTime = document.getElementById(current_time);
  		currentTime.textContent = strTime;
	}
	else if(weatherClass == "hour_update"){
		for (let i = 1; i < 6; i++) {
			var hours = date.getHours() + i;
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
			let currentTime = document.getElementById("time{i}").children[0];
  			currentTime.textContent = strTime;
		}
	}
}

function newRequest() {
	let city = document.getElementById('city').value;
	let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=Davis,CA,US&units=imperial&APPID=9452c055be7dbf04b6ffb4fa9741a64a"
		
	let request = createCORSRequest('GET', url)

	if (!request){
		alert('CORS not supported')
		return;
	}

	request.onload = function(){
		let object = JSON.parse(request.responseText);
		console.log(JSON.stringify(object, undefined, 2));

		updateHTML(object);
	};
	request.onerror = function(){
		alert('Woops, there was an error');
	};
	request.send();
//run makeCORSRequest when the script files executed
}