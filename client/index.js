/* server side validation.

1. POST AJAX request to server. Send credentials as an object If credentials don't match - show error message

2. If credentials do match, hide login, GET AJAX Request and get call values for specific user

*/

//For error message
var error = document.getElementById("error-message");

//for submit button
var myForm = document.getElementById("myForm");

//when button is clicked, submit form
myForm.addEventListener("submit", function(){


//values of input fields
   var userValue = document.getElementById("user").value;
   var userPass = document.getElementById("password").value;

 
   //auth credentials
   var user = {

       "email": userValue, 
       "password":userPass
   };

   var postRequest = $.ajax({

      url: 'http://localhost:3000/authenticate',
                type: 'POST',
                data:{user}                  
       
   });

   postRequest.done(function(data){

    var token = data;
    console.log(token.token);
    getCalls(token);
});

postRequest.fail(function(){

    error.textContent = "incorrect credentials";
});



});

//function that sends the GET request
function getCalls(token){

    //Inner GET request to call route
    $.ajax({

      url:'http://localhost:3000/calls',
      type:'GET',
        //set request header for server to accept my token
         beforeSend:function(req){

        req.setRequestHeader("X-TOKEN", token.token);
                            },                 
       
   })
   //populate table if GET is successful
   .done(function(data){

       console.log(data);
       drawTable(data);
       
   })

   .fail(function(){

       console.log("something went wrong with GET request");
   })


}

//function that will dynamically create table
function drawTable(info){

    console.log("drawing table...");

//create table
var table = document.createElement("table");
table.border = 1;

var columns = 3;

var row = table.insertRow(-1);
for(var i = 0; i < columns; i++){

    var header = document.createElement("th");
    header.textContent = "Calls";
    row.appendChild(header);
}

var tableDiv = document.getElementById("call-data");
    tableDiv.innerHTML = "";
    tableDiv.appendChild(table);



}


