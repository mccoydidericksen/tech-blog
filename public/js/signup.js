const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-submit').value.trim();
    const password = document.querySelector('#password-submit').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

document
  .querySelector('#signup')
  .addEventListener('submit', signupFormHandler);