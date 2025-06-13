fetch('components/navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-container').innerHTML = data;

    const toggleButton = document.querySelector(".toogle-button");
    const navList = document.querySelector(".nav-list-container");

    toggleButton.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevents click from bubbling to document
      navList.classList.toggle("active");

      // Toggle icon
      toggleButton.innerHTML = navList.classList.contains("active")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      const isClickInside = navList.contains(event.target) || toggleButton.contains(event.target);
      if (!isClickInside && navList.classList.contains("active")) {
        navList.classList.remove("active");
        toggleButton.classList.remove("active");
        toggleButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });

   // Load footer
  fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-container').innerHTML = data;

      // Wait until footer is inserted before adding scroll button listener
      const goToTop = document.querySelector('.go-to-up-arrow');

      // Show/hide button on scroll
      window.addEventListener('scroll', function () {
        if (!goToTop) return;
        goToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
      });

      // Scroll to top
      goToTop?.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

// Run after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Apply dark mode if already set
  if (localStorage.getItem('darkmode') === 'active') {
    document.body.classList.add('darkmode');
  }

  // Defer until theme switch button is available in DOM
  const observeThemeSwitch = setInterval(() => {
    const themeSwitch = document.getElementById('theme-switch');
    if (!themeSwitch) return;

    clearInterval(observeThemeSwitch); // Stop once found

    themeSwitch.addEventListener('click', () => {
      const darkmode = document.body.classList.contains('darkmode');

      if (darkmode) {
        document.body.classList.remove('darkmode');
        localStorage.setItem('darkmode', null);
      } else {
        document.body.classList.add('darkmode');
        localStorage.setItem('darkmode', 'active');
      }
    });
  }, 100); // Check every 100ms until button is loaded
});
