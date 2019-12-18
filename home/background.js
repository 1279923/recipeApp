window.onload = function(){
	
	var btn = document.getElementsByClassName("navIcon");
	for(let i=0; i<btn.length; i++){
		btn[i].addEventListener("click", function(){
			window.location.href = "https://1279923.github.io/recipeApp/"+String(this.id);
		})
	}
	
	
}