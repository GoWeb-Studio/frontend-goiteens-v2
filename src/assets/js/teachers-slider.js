import $ from 'jquery';
import slick from 'slick-carousel';

$('.teachers-slider').slick({
  lazyLoad: 'ondemand',
  mobileFirst: true,
  infinite: true,
  dots: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4000,
  cssEase: 'ease-out',
  slidesToShow: 2,
  slidesToScroll: 1,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 767.98,
      settings: {
        variableWidth: true,
        dots: true,
      },
    },
  ],
});