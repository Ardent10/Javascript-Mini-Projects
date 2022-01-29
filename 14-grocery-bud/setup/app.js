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
//clear items
clearBtn.addEventListener('click', clearItems);
// load items 
window.addEventListener("DOMContentLoaded",setupItems);


// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    // console.log(grocery.value);
    const value=grocery.value;
    const id = new Date().getTime().toString();
    // console.log(id);

    if(value && !editFlag){
        // console.log("Add item to list");
       createListItem(id,value);

        //display alert
        displayAlert('Item added to the list', 'success');   

        //show container
        container.classList.add('show-container');

        //add to local storage
        addToLocalStorage(id,value);
        //set back to default
        setBackToDefault();
    }
    else if(value && editFlag){
        // console.log("editing");
        editElement.innerHTML = value;  
        displayAlert("Value changed", "success");
        // edit local storage
        editLocalStorage(editId, value);
        setBackToDefault();
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

//clear items
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length>0){
        items.forEach(function(item){
            list.removeChild(item);
        })
    }
    container.classList.remove('show-container');
    displayAlert('empty list', "danger");
    setBackToDefault();
    localStorage.removeItem('list');
}

//Edit function
function editItem(e){
    // console.log("Edit");
    const element = e.currentTarget.parentElement.parentElement;
    //set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = "edit";

}

//Delete function
function deleteItem(e){
//  console.log("Delete");  
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length===0){
        container.classList.remove("show-container");
    }
    displayAlert("Item removed", "danger");
    setBackToDefault();

    removeFromLocalStorage(id);
}



// set back to default
function setBackToDefault(){
    // console.log("Set back to default");
    grocery.value = "";
    editFlag = false;
    editId = "";
    submitBtn.textContent = "submit";

}


// ****** LOCAL STORAGE **********

function addToLocalStorage(id,value){
    // console.log("Added to local storage ");
    const grocery = {id,value}
    // console.log(grocery);
    let items = getLocalStorage();
    console.log(items); 
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}


function removeFromLocalStorage(id){
    //  console.log(id);
    let items= getLocalStorage();
    items = items.filter(function (item){
        if(item.id!==id){
            return item;
        }
    });
    // set up the local storage once again after removing an item.
    localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value){
    // console.log(id,value);
    let items = getLocalStorage();
    items= items.map(function(item){
        if(item.id===id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage(){
   return localStorage.getItem("list")?
    JSON.parse(localStorage.getItem("list"))
    : [];
}


// // localStorage API
// // setItem
// // getItem
// // removeItem
// // save as sttring

// localStorage.setItem('orange', JSON.stringify(['item', 'item3']))
// const oranges  = JSON.parse(localStorage.getItem('orange'));
// console.log(oranges);
// localStorage.removeItem("orange"); 


// ****** SETUP ITEMS **********
function setupItems(){
    let item = getLocalStorage();
    if(item.length > 0){
      item.forEach(function(item){
          createListItem(item.id,item.value);
      });
      container.classList.add('show-container');
    }
}

function createListItem(id,value){
    const element = document.createElement('article');
    // add class 
    element.classList.add('grocery-item');
    // add id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p  class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
      <button type="button" class="delete-btn"><i class="fas fa-trash"></i></button>
    </div>`;
    
    const deletBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');

    deletBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    //append child
    list.appendChild(element);
}