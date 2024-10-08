// Signup JavaScript code
fetch('/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
})
.then(response => response.json())
.then(data => {
    console.log(data);
    window.location.href = 'welcome.html'; // Redirect to welcome page
})
.catch(error => console.error(error));