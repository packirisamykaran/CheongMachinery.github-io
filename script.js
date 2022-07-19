

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


// OnSubmit



// OnSubmit
