
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
        machineDisplay.id = item;
        machineDisplay.onclick = ()=> displayItemDetails(item, currentCat)

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




// On click display product details
const displayDetailElement = document.getElementById("displayItemDetails")

displayDetailElement.style.visibility = "hidden"

const displayItemDetails = (item, currentCat)=>{

    while(displayDetailElement.firstChild){
        displayDetailElement.removeChild(displayDetailElement.firstChild);
    }

    let curCategory = products[currentCat];
    let equipment = curCategory[item];
    

    let divElement = document.createElement("div")
        divElement.className = "info-container";

    for(const detail in equipment){
        let itemElement = document.createElement("div");
        itemElement.className = "info-row";

        let colElement = document.createElement("div");
        colElement.classList = "key";
        colElement.textContent = detail;

        itemElement.appendChild(colElement)

        colElement = document.createElement("div");
        colElement.classList = "value";
        colElement.textContent = equipment[detail];
        
        itemElement.appendChild(colElement);

        divElement.appendChild(itemElement);
        
        console.log(detail, equipment[detail])


    }
    displayDetailElement.appendChild(divElement);

    displayDetailElement.style.visibility = "visible"

    
}

// On click display product details

// Close item detail

const itemDiplayCloseBtn  = document.getElementById("close-item-detail");
itemDiplayCloseBtn.onclick = ()=>{
    let itemDetailDisplay = document.getElementById("displayItemDetails");
    itemDetailDisplay.style.visibility = "hidden"
}

// close item detail