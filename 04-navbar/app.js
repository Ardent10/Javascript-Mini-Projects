// classList - shows/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggles class

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function(){
    // console.log(links.classList);
    // console.log(links.classList.contains('random'));
    // console.log(links.classList.contains('links'));

    //Longer implementation of the same task that we want to do
    // if(links.classList.contains("show-links")){
    //     links.classList.remove("show-links");
    // }
    // else
    // {
    //     links.classList.add("show-links");
    // }

    //We can simply use the toggle method to do the same task
    links.classList.toggle("show-links");
});