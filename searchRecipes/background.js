window.onload = function(){
	
	
	
	
	
	
document.getElementById("toHome").addEventListener("click", function(){
	window.location.href = "https://1279923.github.io/recipeApp/home";
})

var img = document.getElementsByClassName("recipeImg");
for(let i=0; i<img.length; i++){
	img[i].addEventListener("click", function(){
		document.getElementsByClassName("ingredientList")[this.dataset.id].style.display = "block";
	})
}




}