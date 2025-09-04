  $(document).on('click', '.logout-link', function(e) {
        localStorage.removeItem('jwtToken'); // Clear the token
        sessionStorage.removeItem('jwtToken');localStorage.clear();
 // Clear from session storage too, just in case
      window.location.href = '/SHOP/home.html'; // Redirect to home or login page
    });

