// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag=false;
let editId="";

// ****** EVENT LISTENERS **********
form.addEventListener("submit",addItem);


// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    // console.log(grocery.value);
    const value=grocery.value;
    const id = new Date().getTime().toString();
    // console.log(id);

    if(value && !editFlag){
        // console.log("Add item to list");
        
    }
    else if(value && editFlag){
        console.log("editing");
    }
    else
    {
        displayAlert('Please enter value', 'danger' );   
        // console.log("Empty value");
    }
}

//DISPLAY ALERT 
function displayAlert(text,action){
    alert.textContent= text;
    alert.classList.add(`alert-${action}`);
    
    //remove alert
    setTimeout(function(){
      alert.textContent="";
      alert.classList.remove(`alert-${action}`);  
    },1000);
}


// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
