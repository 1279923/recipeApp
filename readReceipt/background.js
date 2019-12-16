window.onload = function(){


document.getElementById("toHome").addEventListener("click", function(){
	window.location.href = "https://1279923.github.io/recipeApp/home";
})

'use strict';

var videoElement = document.querySelector('video');
var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');

audioSelect.onchange = getStream;
videoSelect.onchange = getStream;

getStream().then(getDevices).then(gotDevices);

function getDevices() {
  // AFAICT in Safari this only gets default devices until gUM is called :/
  return navigator.mediaDevices.enumerateDevices();
}

function gotDevices(deviceInfos) {
  window.deviceInfos = deviceInfos; // make available to console
  console.log('Available input and output devices:', deviceInfos);
  for (const deviceInfo of deviceInfos) {
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'audioinput') {
      option.text = deviceInfo.label || `Microphone ${audioSelect.length + 1}`;
      audioSelect.appendChild(option);
    } else if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    }
  }
}

function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const audioSource = audioSelect.value;
  const videoSource = videoSelect.value;
  const constraints = {
    //audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  console.log(constraints)
  return navigator.mediaDevices.getUserMedia(constraints).
    then(gotStream).catch(handleError);
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  //audioSelect.selectedIndex = [...audioSelect.options].
    //findIndex(option => option.text === stream.getAudioTracks()[0].label);
  videoSelect.selectedIndex = [...videoSelect.options].
    findIndex(option => option.text === stream.getVideoTracks()[0].label);
  videoElement.srcObject = stream;
}

function handleError(error) {
  console.error('Error: ', error);
}

const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');
captureButton.addEventListener('click', () => {
	canvas.height = player.videoHeight
	canvas.width = player.videoWidth
	// Draw the video frame to the canvas.
	context.drawImage(player, 0, 0, canvas.width, canvas.height);
	
	document.getElementById('photoSave').style.display = 'block';
	
	console.log("photo taken")
});

document.getElementById("stopStream").addEventListener("click", function(){ player.srcObject.getVideoTracks().forEach(track => track.stop()); });

var key = "AIzaSyDfyMyp9I2tL5XWfe-G8FY_3nkbbjmmA5c";

document.getElementById("ocr").addEventListener("click", function(){
	console.log("read image")
	
	var jpegUrl = canvas.toDataURL("image/jpeg").split(',')[1];
	//console.log(jpegUrl)
	
	var http = new XMLHttpRequest();
	var url = 'https://vision.googleapis.com/v1/images:annotate?key='+key;
	http.open('POST', url, true);

	http.setRequestHeader('Content-type', 'application/json');

	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			var response = "\n\n生データ↓\n\n"
			response += JSON.parse(http.responseText).responses[0].fullTextAnnotation.text;
			response += "\n";
			console.log(response);	
			document.getElementById("ocrRes").innerText = response
			
			var tempStr = "";
			var resClean = "\n";
			var resEdit = response.split("\n");
			resEdit.forEach(line => {
				if( !isNaN(line.slice(0,3)) && (line[3]==" ") ){
					tempStr = line.slice(3);
					for(let i=tempStr.length-1; i > -1; i--){
						if(!isNaN(tempStr[i]) || tempStr == " "){
							tempStr = tempStr.slice(0, -1);
						}else{
							break;
						}
					}
					resClean += tempStr;
					resClean += "\n";
				}
			})
			resClean += "\n";
			console.log(resClean)
			document.getElementById("resClean").innerText = resClean;
			
			document.getElementById('scanResult').style.display = 'block';
		}
	}
	
	var request = {
	  "requests":[
		{
		  "image":{
			"content": jpegUrl
		  },
		  "features":[
			{
			  "type":"TEXT_DETECTION",
			  "maxResults":1
			}
		  ]
		}
	  ]
	}
	
	http.send(JSON.stringify(request));
	
})




}
