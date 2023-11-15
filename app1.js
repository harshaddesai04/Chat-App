// @ts-nocheck

const HarshadSelectorBtn = document.querySelector('#Harshad-selector')
const ShubhamSelectorBtn = document.querySelector('#Shubham-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')
let profilepic = document.getElementById('profilepic')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'Harshad' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}

let messageSender = 'Harshad'

const updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerHTML = `<img id="profilepic" class="responsive" src="${name.toLowerCase()}.jpg" alt="" /> ${name} chatting...`
  profilepic = document.getElementById('profilepic')
  chatInput.placeholder = `Type here, ${name}...`

  if (name === 'Harshad') {
    profilepic.src = '	https://harshaddesai04.github.io/Chat-App/Harshad.jpg' //harshad.jpg
    HarshadSelectorBtn.classList.add('active-person')
    ShubhamSelectorBtn.classList.remove('active-person')
  }
  if (name === 'Shubham') {
    profilepic.src = 'Shubham.jpg'
    ShubhamSelectorBtn.classList.add('active-person')
    HarshadSelectorBtn.classList.remove('active-person')
  }
}

HarshadSelectorBtn.onclick = () => updateMessageSender('Harshad')
ShubhamSelectorBtn.onclick = () => updateMessageSender('Shubham')

const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }

  /* Save message to local storage */
  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message)

  /* Clear input field */
  chatInputForm.reset()

  /*  Scroll to the bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
  localStorage.clear()
  chatMessages.innerHTML = ''
})
