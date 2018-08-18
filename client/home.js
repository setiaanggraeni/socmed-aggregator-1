$(document).ready(function() {
  let token = localStorage.getItem('token')
  let name = localStorage.getItem('name')
  $('#name').append(`${name}`)

  axios.get('http://localhost:3000/users/repo', {
      headers: {
          token: token
      }
  })
  .then(result => {
      data = result.data
      data.forEach(element => {
          $('#repositories').append(`<li> <a href="${element.html_url}">${element.name}</a></li>`)
      });
  })
  .catch(err => {
      console.log(err);
  })
})

function add() {
  let token = localStorage.getItem('token')
  var x = $("#repoName").val();
  axios.post('http://localhost:3000/users/repo/create', {
      name: x
  }, {
      headers: {
          token: token
      }
  })
  .then(newRepo => {
      $("#message").html('Success')
      location.reload()
  })
  .catch(err => {
      console.log(err)
  })
}

function search(){
  let token = localStorage.getItem('token')
  var x = $("#repoSearch").val();
  axios.get(`http://localhost:3000/users/repo/search?q=${x}`, {
      headers: {
          token: token
      }
  })
  .then(result => {
      data = result.data.items
      data.forEach(element => {
          $('#searchResult').append(`<li> <a href="${element.html_url}">${element.name}</li>`)
      })
      $("#messageSearch").html('Success')
  })
  .catch(err => {
      console.log(err);
  })
}