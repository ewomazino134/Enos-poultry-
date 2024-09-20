// Initialize PouchDB
const db = new PouchDB('myDatabase');

// Login function
function login(username, password) {
  // Retrieve user data from database
  db.get(username).then(doc => {
    if (doc.data.password === password) {
      // Login successful, redirect to welcome page
      window.location.href = 'welcome.html';
    } else {
      console.error('Invalid password');
    }
  }).catch(error => {
    console.error('User not found');
  });
}

// Signup function
function signup(username, password, email, fname, lname) {
  // Create user data object
  const userData = {
    name: username,
    email: email,
    fname: fname,
    lname: lname,
    password: password
  };

  // Store user data in database
  db.put({
    _id: username,
    data: userData
  }).then(() => {
    // Signup successful, redirect to welcome page
    window.location.href = 'welcome.html';
  }).catch(error => {
    console.error('Error signing up');
  });
}

// Handle form submission
document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('fname').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const email = document.getElementById('email').value;
  const fname = document.getElementById('fname').value;
  const lname = document.getElementById('lname').value;

  if (password === confirmPassword) {
    signup(username, password, email, fname, lname);
  } else {
    console.error('Passwords do not match');
  }
});