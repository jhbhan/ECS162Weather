
function createCORSRequest(method, url) {
	let request = new XMLHttpRequest();
	request.open(method,url,true);
	return request
}

function updateHTML(object){
	var time = document.getElementById('current_time');
	var picture = document.getElementById('current_picture');
	var temperature = document.getElementById('current_temperature');

	temperature.innerText = object[main][temp];
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