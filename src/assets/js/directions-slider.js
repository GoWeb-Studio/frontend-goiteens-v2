import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

new Swiper('.swiper', {
  direction: 'horizontal',
  breakpoints: {
    1280: {
      direction: 'vertical',
      speed: 20000,
    },
  },
  autoplay: {
    delay: 1,
  },
  speed: 20000,
  loop: true,
  modules: [Autoplay],
  spaceBetween: 12,
  slidesPerView: 'auto',
});
