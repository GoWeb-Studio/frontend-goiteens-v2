import $ from 'jquery';
import slick from 'slick-carousel';

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
  prevArrow: $('.review-prev-but-js'),
  nextArrow: $('.review-next-but-js'),
};

$('.review-slider-js').slick(slickOptions);


