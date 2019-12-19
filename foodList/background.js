console.log("fl bg");

window.addEventListener("load", function(){
	



document.addEventListener("click", function(e){
	e = e.target;
	if(e.className == "button removeItem"){
		id = e.parentElement.parentElement.dataset.id
		console.log("clicked id:" + id);
		//console.log(document.querySelectorAll("tr")[id]);
		var elmt = document.querySelectorAll("tr");
		for(let i=0; i<elmt.length; i++){
			if(elmt[i].dataset.id == id){
				elmt[i].outerHTML = "";
				break;
			}
		}
		
		
		
	}
})




})