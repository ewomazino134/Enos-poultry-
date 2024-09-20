 // Chat function
  function sendMessage(message) {
    const chatData = {
      message: message,
      timestamp: new Date()
    };
messageDB.put({
      _id: 'chat_' + new Date().getTime(),
      data: chatData
    }).then(() => {
      console.log('Message sent!');
    }).catch(error => {
      console.error(error);
    });
  }
  // Initialize PouchDB databases
const usersDB = new PouchDB('users');
const messagesDB = new PouchDB('messages');

// Fetch user profiles and display them in a list
usersDB.allDocs({ include_docs: true }).then(response => {
  const userList = document.getElementById('user-list');
  response.rows.forEach(row => {
    const user = row.doc;
    const userElement = document.createElement('li');
    userElement.textContent = user.name;
    userList.appendChild(userElement);
  });
});

// Handle message sending
document.getElementById('send-button').addEventListener('click', function() {
  const messageText = document.getElementById('message-text').value;
  sendMessage(messageText);
  const senderId = 'current-user-id'; // Replace with the current user's ID
  const receiverId = 'selected-user-id'; // Replace with the selected user's ID

  // Create a new message document
  const message = {
    _id: new Date().toISOString(),
    senderId,
    receiverId,
    messageText,
    timestamp: new Date()
  };

  // Save the message to the messages database
  messagesDB.put(message).then(response => {
    console.log('Message sent!');
  });
});

// Fetch and display chat history
messagesDB.allDocs({ include_docs: true }).then(response => {
  const chatLog = document.getElementById('chat-log');
  response.rows.forEach(row => {
    const message = row.doc;
    const messageElement = document.createElement('p');
    messageElement.textContent = `${message.senderId}: ${message.messageText}`;
    chatLog.appendChild(messageElement);
  });
});
// Get chat display area and message input field
const chatDisplay = document.getElementById('chat-display');
const messageInput = document.getElementById('message-input');

// Set up PouchDB live updates
messagesDB.changes({ live: true, since: 'now' }).on('change', function(change) {
  // Update chat display area in real-time
  displayMessage(change.doc);
});

// Send message function
function sendMessage() {
  const messageText = messageInput.value;
  // Create new message document
  const message = {
    _id: new Date().toISOString(),
    senderId: 'current-user-id',
    receiverId: 'selected-user-id',
    messageText: messageText,
    timestamp: new Date()
  };
  // Save message to PouchDB
  messagesDB.put(message).then(response => {
    console.log('Message sent!');
  });
}

// Display message function
function displayMessage(message) {
  const messageElement = document.createElement('p');
  messageElement.textContent = `${message.senderId}: ${message.messageText}`;
  chatDisplay.appendChild(messageElement);
}

// Add event listener to send button
document.getElementById('send-button').addEventListener('click', sendMessage);

// Function to retrieve logged-in user's ID
function getLoggedInUserId() {
  return localStorage.getItem('userId');
}

// Call function on page load
document.addEventListener('DOMContentLoaded', function() {
  const userId = getLoggedInUserId();
  initChatApplication(userId);
});

// Initialize chat application with user ID
function initChatApplication(userId) {
  // Pass user ID to chat functions
  sendMessage = function() {
    const messageText = messageInput.value;
    const message = {
      _id: new Date().toISOString(),
      senderId: userId,
      receiverId: 'selected-user-id',
      messageText: messageText,
      timestamp: new Date()
    };
    messagesDB.put(message).then(response => {
      console.log('Message sent!');
    });
  }
}

// Modified getLoggedInUserId() function
function getLoggedInUserId() {
  return localStorage.getItem('userId') || sessionStorage.getItem('userId');
}

// Retrieve user ID on page load
document.addEventListener('DOMContentLoaded', function() {
  const userId = getLoggedInUserId();
  if (userId) {
    initChatApplication(userId);
  } else {
    console.log('User not logged in');
  }
});

// Initialize chat application with user ID
function initChatApplication(userId) {
  // Pass user ID to chat functions
  sendMessage = function() {
    const messageText = messageInput.value;
    const message = {
      _id: new Date().toISOString(),
      senderId: userId,
      receiverId: 'selected-user-id',
      messageText: messageText,
      timestamp: new Date()
    };
    messagesDB.put(message).then(response => {
      console.log('Message sent!');
    });
  }
}