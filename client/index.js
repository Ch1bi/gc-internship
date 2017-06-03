/* server side validation.

1. POST AJAX request to server. Send credentials as an object If credentials don't match - show error message

2. If credentials do match, hide login, GET AJAX Request and get call values for specific user

*/

//for submit button
var request = document.getElementById("myForm");

//when button is clicked, submit form
request.addEventListener("submit", function(){

   var userValue = document.getElementById("user").value;
   var userPass = document.getElementById("password").value;

 
   //auth credentials
   var postData = {

       "user": userValue,
       "password":userPass
   };



   $.ajax({
                url: 'http://localhost:3000/authenticate',
                type: 'POST',
                data:postData,
                success: function (data) {
                }

            });
   

});


