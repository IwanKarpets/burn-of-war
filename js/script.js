$(document).ready(function () {
  $('.slider').slick({
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });
});

document.querySelector('.content-video__source svg').addEventListener('click', (e) => {
  e.target.style.display = 'none';
  document.querySelector('.content-video__source video').play();
  document.querySelector('.content-video__source video').setAttribute('controls', 'controls');
});

window.toggleMobileMenu = function (e) {
  e.preventDefault();
  document.querySelector('header').classList.toggle('is-mobile-menu-open');
  document.querySelector('body').classList.toggle('is-fixed');
};

const scrollToTopButton = document.getElementById('scrollBtn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
