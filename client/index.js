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

    startRequests();
});

function startRequests(){


 //values of input fields
   var userValue = document.getElementById("user").value;
   var userPass = document.getElementById("password").value;


   //auth credentials
   var user = {

       "email": userValue, 
       "password":userPass
   };

    $.ajax({

      url: 'http://localhost:3000/authenticate',
                type: 'POST',
                data:{user},

            success:function(data){

                getCalls(data);
                
            },

            error:function(){

                error.textContent = "incorrect credentials";
            }
   });


}

//function that sends the GET request
function getCalls(token){

    $.ajax({

      url:'http://localhost:3000/calls',
      type:'GET',
        //set request header for server to accept my token
         headers: {
        'X-TOKEN': token.token
    },     


    success:function(calls){
        
        console.log(JSON.stringify(calls));
    }     
       
   });

}

function hideForm(){

    if (myForm.style.display = 'none') {

        $("myForm").show();
    } 
    
    else {
        $("myForm").hide();
    }
}
