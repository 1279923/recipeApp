console.log("fl bg");

window.addEventListener("load", function(){
	btnFunc();
})

function btnFunc(){
	var elmt = document.getElementsByClassName("qb");
	for(let i=0; i<elmt.length; i++){
		elmt[i].children[0].addEventListener("click", function(){
			inp = this.parentElement.parentElement.children[0]
			inp.value = parseInt(inp.value)+10;
		})
		
		elmt[i].children[1].addEventListener("click", function(){
			inp = this.parentElement.parentElement.children[0]
			inp.value = parseInt(inp.value)-10;
		})
	}
}

document.addEventListener("click", function(e){
	e = e.target;
	if(e.className.split(" ").includes("removeItem")){
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