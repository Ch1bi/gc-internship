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

   //Post route to authenticate
   $.ajax({
                url: 'http://localhost:3000/authenticate',
                type: 'POST',
                data:{user},
                success: function (data) {

                    //storing the token for use in 2nd request
                    var token = data;
                    console.log(token.token);

                    //Get route to the calls 
                    $.ajax({

                        url:'http://localhost:3000/calls',
                        type:'GET',

                        //set request header for server to accept my token
                       beforeSend:function(req){

                           req.setRequestHeader("X-TOKEN", token.token)
                       },          
                            success:function(response){

                                console.log(response);

                                //hide form 
                                

                            }

                            //start of second ajax call
                    }).fail(function(){

                        console.log("something went wrong with your request. Please try again");
                    });

                }
                //start of the first ajax call

                //if the credentials are wrong, display error
            }).fail(function(){

                error.textContent = "incorrect credentials";
            })
   

});


