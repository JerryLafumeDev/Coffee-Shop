
var trash = document.getElementsByClassName("fa-trash");
var coffee = document.getElementsByClassName("fa fa-coffee");
const completeBtn = document.querySelectorAll(".messages")


if (completeBtn.length > 0)
  completeBtn.forEach(order => order.addEventListener('click', markCompleted))

function markCompleted(click) {
  console.log(click.currentTarget.innerText);
  // click.currentTarget.classList.toggle('done')
  fetch('messages', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': click.currentTarget.innerText,
      'order': click.currentTarget.innerText,
      'flavor': click.currentTarget.innerText,
      'flavor2': click.currentTarget.innerText,
      'package': click.currentTarget.innerText,
      'completed': click.currentTarget.classList.contains('done')
    })
  }).then(function() {
    window.location.reload()
  })
})




Array.from(coffee).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages/down', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp,
            
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
      alert("Great!, Your Order will be ready shortly :). Thank you for your business and your trust. It is our pleasure to serve you and We sincerely appreciate your support!")
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const order = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'order': order
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
