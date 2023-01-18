
// Frontend JS for signup page, this is loaded via the script tag in the signup.handlebars file
const signupFormHandler = async function(event) {
  event.preventDefault();

  const email = document.querySelector('#email-signup');
  const password = document.querySelector('#password-signup');
  const username = document.querySelector('#user-signup')

  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
         email: email.value,
      password: password.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to sign up');
  }
};

document
  .querySelector('.form--signup')
  .addEventListener('submit', signupFormHandler);
