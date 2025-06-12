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

  // Fetch footer from component file 
  fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    })

    // Show/hide button on scroll
  window.addEventListener('scroll', function() {
    const goToTop = document.querySelector('.go-to-up-arrow');
    if (window.scrollY > 300) {
      goToTop.style.display = 'block';
    } else {
      goToTop.style.display = 'none';
    }
  });

  // Smooth scroll to top on click
  document.querySelector('.go-to-up-arrow').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
