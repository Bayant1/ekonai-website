$(document).ready(function () {
  // Mobile Menu Toggle
  $('#menu-toggle').click(function () {
    $('#mobile-menu').toggleClass('hidden');
    $('#menu-icon').toggleClass('fa-bars fa-times'); // toggle between bars and X
  });

  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: true, // Whether animation should happen only once
  });

 

  // Scroll-to-Top Button Logic
  const scrollToTopButton = document.getElementById('scrollToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopButton.style.display = 'block';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  });

  // Scroll to the top when the button is clicked
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

 
});