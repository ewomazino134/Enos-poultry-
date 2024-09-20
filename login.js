// Initialize PouchDB
const db = new PouchDB('myDatabase');

// Google Auth client ID
const clientId = '519397314241-vt6isfa29adjg8hnicrfiq4e3gr8qtpu.apps.googleusercontent.com';

// Initialize Google Auth
window.onload = function () {
  google.accounts.id.initialize({
    client_id: '519397314241-vt6isfa29adjg8hnicrfiq4e3gr8qtpu.apps.googleusercontent.com',
    callback: handleGoogleAuth,
  });
  google.accounts.id.renderButton(
    document.getElementById('google-auth-container'),
    {
      type: 'standard',
      theme: 'outline',
      size: 'large',
    }
  );
};

// Handle Google Auth sign-in and sign-out events
function handleGoogleAuth(response) {
  if (response.credential) {
    // Sign-in successful, get user data
    const userData = {
      name: response.profileObj.name,
      email: response.profileObj.email,
    };

    // Store user data in PouchDB
    db.put({
      _id: userData.email,
      data: userData,
    }).then(() => {
      // Redirect to welcome page
      window.location.href = 'welcome.html';
    }).catch((error) => {
      console.error('Error storing user data:', error);
    });
  } else {
    // Sign-out or error
    console.log('Google Auth sign-out or error');
  }
}

// Logout function
function logout() {
  // Revoke Google Auth token
  google.accounts.id.revoke(
    {
      client_id: clientId,
      callback: () => {
        // Remove user ID from local storage and session storage
        localStorage.removeItem('userId');
        sessionStorage.removeItem('userId');
        window.location.href = 'login.html';
      },
    },
    { revokeToken: true }
  );
}

// Event listener for logout button click
document.getElementById('logout-btn').addEventListener('click', logout);