import $ from 'jquery';
import slick from 'slick-carousel';

const listTeacher = document.querySelector('.teacher-list');
const notDesktopResolution = window.matchMedia('(max-width: 1279.99px)').matches;

if (notDesktopResolution) {
  listTeacher.classList.add('teachers-slider');
}

const slickOptions = {
  lazyLoad: 'ondemand',
  dots: false,
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  speed: 600,
  cssEase: 'ease-out',
  centerPadding: 0,
  prevArrow: $('.prev-but-js'),
  nextArrow: $('.next-but-js'),
};

$('.slider-js').slick(slickOptions);

$('.teachers-slider').slick({
  lazyLoad: 'ondemand',
  mobileFirst: true,
  infinite: true,
  dots: true,
  arrows: false,
  autoplay: false,
  autoplaySpeed: 2000,
  cssEase: 'ease-out',
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 767.98,
      settings: {
        variableWidth: true,
      },
    },
  ],
});
