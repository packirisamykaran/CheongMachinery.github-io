
import products from "./productsDetails.js";

const submitBtn = document.getElementById("submit-btn");
const validationElement = document.getElementById("validation");

// Disable submit btn
submitBtn.disabled = true;

// Disable submit btn




// Validation
validationElement.onkeyup = function(){
    if(validationElement.value==="8"){
        submitBtn.disabled = false;

    }else{
        submitBtn.disabled = true;
    }
}
// Validation





// Product option

let productSelectDocument = document.getElementById("product-category");

for(const category in products){

    let option = document.createElement("option");
    option.value = category;
    option.text = category;
    productSelectDocument.add(option);
}



// Display Product category
const displayProducts = ()=>{
    let productsElement = document.getElementById("product-list");

    while(productsElement.firstChild){
        productsElement.removeChild(productsElement.firstChild);
    }

    let currentCat =  productSelectDocument.value;

    for(const item in products[currentCat]){
        
        
        let machineDisplay = document.createElement("div");
        machineDisplay.className = "item";

        let machineImg = document.createElement("img");
        machineImg.src = "./products/"+currentCat+"/"+item+".png";

        let nameElement = document.createElement("div");
        nameElement.className = "name";
        nameElement.textContent = item;


        machineDisplay.appendChild(machineImg);
        machineDisplay.appendChild(nameElement);

        productsElement.appendChild(machineDisplay);
    }

    
}

displayProducts();


productSelectDocument.onchange = ()=>{
    displayProducts()
}


// Display Product category


// Product option