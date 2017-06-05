// For error message
var error = document.getElementById('error-message')

// for submit button
var myForm = document.getElementById('myForm')

// for table
var table = document.getElementById('myTable')

// when button is clicked, submit form
myForm.addEventListener('submit', function (e) {
    // prevent page from refreshing
  e.preventDefault()

  startRequests()
}, false)

// function that starts the AJAX requests
function startRequests () {
 // values of input fields
  var userValue = document.getElementById('user').value
  var userPass = document.getElementById('password').value

   // auth credentials
  var user = {

    'email': userValue,
    'password': userPass
  }

  $.ajax({

    url: 'http://localhost:3000/authenticate',
    type: 'POST',
    data: {user},

    success: function (data) {
      myForm.style.display = 'none'
      getCalls(data)
    },

    error: function () {
      error.style.visibility = 'visible'

      setTimeout(function () {
        error.style.visibility = 'hidden'
      }, 3000)
    }

  })
}

// function that sends the GET request
function getCalls (token) {
  $.ajax({

    url: 'http://localhost:3000/calls',
    type: 'GET',

        // set request header for server to accept my token
    headers: {
      'X-TOKEN': token.token
    },

    success: function (calls) {
        // pass the call data to the drawTable function
      drawTable(calls)
    }

  })
}

function drawTable (data) {
    // rows
  var row
    // number of columns
  var cols = 3

    // add rows
  for (var i = 0; i < cols; i++) {
    row = table.insertRow(-1)

    for (var j = 0; j < cols; j++) {
      var cell = row.insertCell(-1)

          // value of current iteration will decide what is added to table
      if (j == 0) {
        cell.innerHTML = data.calls[i].sid
      } else if (j == 1) {
        cell.innerHTML = data.calls[i].from
      } else if (j == 2) {
        cell.innerHTML = data.calls[i].result
      }
    }
  }
        // table is displayed once loops complete
  table.style.visibility = 'visible'
}
