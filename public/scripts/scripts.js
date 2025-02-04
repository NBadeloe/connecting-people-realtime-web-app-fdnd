let socket = io()
let messageContainer = document.querySelector('section ul')
let input = document.querySelector('input')
let form = document.querySelector('form')
let message = document.querySelector('li')
var isDown = false;


// let userName= prompt(' What is your name')
// // appendMessage('You joined')
// socket.emit('new-user', userName)

form.addEventListener('submit', (e) =>{
  e.preventDefault()
  let message = input.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  input.value = ''

})

socket.on('chat-message', data =>{
  appendMessage(`${data.userName}:${data.message}`)
})

socket.on('user-connected', (userName) => {
  // appendMessage(`${userName} has connected`)
})

let current = null
let offset = [0,0]; 
let mousePosition;
let row = -1;
let column = 0

function appendMessage(message) {

  let messageElement = document.createElement('li')
  messageElement.classList.add('postit')
  messageElement.innerText = message
  messageElement.addEventListener('mousedown', function(e) {
    isDown = true;
    current = e.target
    offset = [
        current.offsetLeft - e.clientX,
        current.offsetTop - e.clientY
    ];
  }, true);
  
  document.addEventListener('mouseup', function() {
    isDown = false;
    current = null
  }, true);


  if((messageContainer.children.length) % 5 === 0) {
    row++
    column = 0
  }
  messageElement.style.top = (14 * row) + 'em'
  messageElement.style.left = ((13 * column) + 1) + 'em'
  column++
  messageContainer.append(messageElement)

  let colors = [
    "#66e5bf", "#a675f5", "#ffffff"]

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    // generate number between 0 and 2
    
    var numb = getRandomInt(3);
    // expected output: 0, 1 or 2

   var color = colors[numb];
   // get color that matches key in array
   messageElement.style.backgroundColor = color;

}

document.addEventListener('mousemove', function(event) {
  event.preventDefault();
  if (isDown) {
      mousePosition = {
  
          x : event.clientX,
          y : event.clientY
  
      };
      current.style.left = (mousePosition.x + offset[0]) + 'px';
      current.style.top  = (mousePosition.y + offset[1]) + 'px';
  }
}, true);

// const postit = document.querySelector('.postit');
// console.log(postit)