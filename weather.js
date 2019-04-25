

let imageArray = []  // global variable to hold stack of images for animation 
let count = 0;          // global var
let imageCounter = 0;

getImages();

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

function getImages(){
	getTenImages();
	setInterval(setImages(),5000);
}
  function setImages(){
	  console.log("hi");
	  var image = document.getElementById("img3");
	  image.src = imageArray[imageCounter].src;
	  if(imageCounter == 10){
		imageCounter = 0;
	  }else{
		imageCounter++;
	  }
}
  
  function addToArray(newImage) {
	  if (count < 10) {
		  newImage.id = "doppler_"+count;
		  newImage.style.display = "none";
		  imageArray.push(newImage);
		  count = count+1;
		  if (count >= 10) {
			  console.log("Got 10 doppler images");
		  }
	  }
  }
  
  function tryToGetImage(dateObj) {
	  let dateStr = dateObj.getUTCFullYear();
	  dateStr += String(dateObj.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
	  dateStr += String(dateObj.getUTCDate()).padStart(2, '0');
  
	  let timeStr = String(dateObj.getUTCHours()).padStart(2,'0')
	  timeStr += String(dateObj.getUTCMinutes()).padStart(2,'0');
  
	  let filename = "DAX_"+dateStr+"_"+timeStr+"_N0R.gif";
	  let newImage = new Image();
	  newImage.onload = function () {
		  console.log("got image "+filename);
		  addToArray(newImage);
	  }
	  newImage.onerror = function() {
		  console.log("failed to load "+filename);
	  }
	  newImage.src = "http://radar.weather.gov/ridge/RadarImg/N0R/DAX/"+filename;
  }
  
  
  function getTenImages() {
	  let dateObj = new Date();  // defaults to current date and time
	  // if we try 150 images, and get one out of every 10, we should get enough
	  for (let i = 0; i < 150; i++) {
		  newImage = tryToGetImage(dateObj);
		  dateObj.setMinutes( dateObj.getMinutes()-1 ); // back in time one minute
	  }
  
  }