const swiper = new Swiper('.swiper', {
    speed: 400,
    spaceBetween: 5,
    slidesPerView: 2,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is >= 480px
        600: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is >= 640px
        720: {
          slidesPerView: 2,
          spaceBetween: 40
        }
      }
});

