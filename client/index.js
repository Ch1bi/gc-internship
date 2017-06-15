const $ = require('jquery')
const qs = require('qs')

const baseUrl = 'http://localhost:3000/'
const $error = $('#error-message')
const $form = $('#myForm')
const $table = $('#myTable')

$form.submit(startRequests)

function startRequests (e) {
  e.preventDefault()
  const formData = qs.parse($form.serialize())

  $.post({
    url: `${baseUrl}/authenticate`,
    headers: { 'Content-Type': 'text/html' },
    data: formData,
    success: res => { getCalls(res.token) },
    error: err => { $error.text(err.responseJSON.error) }
  })
}

function getCalls (token) {
  $.get({
    url: `${baseUrl}/calls`,
    headers: { 'X-TOKEN': token },
    success: res => { displayCalls(res.calls) }
  })
}

function displayCalls (calls) {
  const rows = calls.map(call => `
    <tr>
      <td>${call.sid}</td>
      <td>${call.from}</td>
      <td>${call.result}</td>
    </tr>
  `)
  $table.append(rows)
  $form.hide()
  $table.show()
}
