// code for changing login/signup button on the navbar to change to Logout for sysPref pagevar url =
if (window.parent.location.pathname === '/src/sysPref.html') {
  document.getElementById('login-logout-icon').innerText = 'logout';
  document.getElementById('login-logout-text').innerText = 'Logout';
}
