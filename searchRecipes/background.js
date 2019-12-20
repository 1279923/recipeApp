window.addEventListener("load", function(){
	
	


var img = document.getElementsByClassName("recipeImg");
for(let i=0; i<img.length; i++){
	img[i].addEventListener("click", function(){
		document.getElementsByClassName("ingredientList")[this.dataset.id].style.display = "block";
	})
}




})