window.onload = function(){
	
	var btn = document.querySelectorAll("button");
	for(let i=0; i<btn.length; i++){
		btn[i].addEventListener("click", function(){
			window.location.href = "https://1279923.github.io/"+String(this.id);
		})
	}
	
	
}