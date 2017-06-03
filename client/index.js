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
                    var serverToken = data;

                    //Get route to the calls 
                    $.ajax({

                        url:'http://localhost:3000/calls',
                        type:'GET',
                        
                        beforeSend:function(req){

                            req.setRequestHeader('X-TOKEN', serverToken);
                        },

                            sucess:function(response){

                                console.log("Token was accepted " + response);
                            }

                            //start of second ajax call
                    });

                }

            });
   

});


