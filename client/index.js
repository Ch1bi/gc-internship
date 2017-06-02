/* server side validation.

1. POST AJAX request to server. Send credentials as an object If credentials don't match - show error message

2. If credentials do match, hide login, GET AJAX Request and get call values for specific user

*/

//for submit button
var request = document.getElementById("#button");


//when button is clicked, submit form
button.addEventListener("click", function(){
    

//get values of the input boxes
var userCred = document.querySelector("#user").value;     
var userPass = document.querySelector("#password").value;     


//create form data object using FormData object and add values
var formData = new FormData();
formData.append("user", userCred);
formData.append("pass", userPass);

fetch("http://localhost:3000/authenticate",{

headers: {
  'Accept': 'application/json, *.*, X-TOKEN',
  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  
  },
  
    method: "POST",
    mode:"cors",
    credentials:"same-origin",
    body:formData

}).then(function(response){

    

});


});
