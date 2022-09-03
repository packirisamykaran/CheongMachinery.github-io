
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
let option = document.createElement("option");
option.value = "All";
option.text = "All";
productSelectDocument.add(option);
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

    if(currentCat==="All"){
        for(const category in products){
            addProducts(category)
        }
    }
    else{
        addProducts(currentCat);
    }

    

    
}


function checkFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
     
    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}
 



const addProducts = (currentCat)=>{

    let productsElement = document.getElementById("product-list");

    for(const item in products[currentCat]){
        
        
        let machineDisplay = document.createElement("div");
        machineDisplay.className = "item";
        machineDisplay.id = item;
        machineDisplay.onclick = ()=> displayItemDetails(item, currentCat)

        let machineImg = document.createElement("img");
        machineImg.id = item;

        machineImg.src = "./products/"+currentCat+"/"+item+".png";

        let pngExists = checkFileExist(machineImg.src);

        if(pngExists){
            machineImg.src = "./products/"+currentCat+"/"+item+".png";
        }else{
            machineImg.src = "./products/"+currentCat+"/"+item+".jpg";
        }
        
        // try {
        //     machineImg.src = "./products/"+currentCat+"/"+item+".png";
        // } catch (error) {
        //     // machineImg.src = "./products/"+currentCat+"/"+item+".jgp";
        //     console.log(error)
        // }

        // // let machineImg = new Image();
        // machineImg.onload=function() { // when .png ok
        //     machineImg.src = "./products/"+currentCat+"/"+item + '.png';
        //   };
        //   machineImg.onerror=function() { // when .png failed
        //     machineImg.src = "./products/"+currentCat+"/"+item + '.jpg';      
        //   };
        //   machineImg.src="./products/"+currentCat+"/"+item + '.png'; // execute the test


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

    let divElement = document.getElementById("info-container");

    while(divElement.firstChild){
        divElement.removeChild(divElement.firstChild);
    }


    let displayImgElement = document.getElementById("display-img");
   try {
    displayImgElement.src = "./products/"+currentCat+"/"+item+".png"
   } catch (error) {
    // displayImgElement.src = "./products/"+currentCat+"/"+item+".jpg"
    console.log("error")
   }

    let curCategory = products[currentCat];
    let equipment = curCategory[item];


    

    

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
    displayDetailElement.style.zIndex = "1"

    
}

// On click display product details

// Close item detail

const itemDiplayCloseBtn  = document.getElementById("close-item-detail");
itemDiplayCloseBtn.onclick = ()=>{
    let itemDetailDisplay = document.getElementById("displayItemDetails");
    itemDetailDisplay.style.visibility = "hidden"
    itemDetailDisplay.style.zIndex = "-1"
    
}

// close item detail