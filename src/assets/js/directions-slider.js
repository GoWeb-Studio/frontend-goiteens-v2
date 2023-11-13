import $ from 'jquery';
import slick from 'slick-carousel';

$('.directions-slick-carousel').slick({
  speed: 15000,
  autoplay: true,
  autoplaySpeed: 0,
  arrows:false,
  cssEase: 'linear',
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  swipeToSlide: true,
  centerMode: true,
  adaptiveHeight: true,
  focusOnSelect: true,
  mobileFirst: true,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1279,
      settings: {
        vertical: true,
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});
