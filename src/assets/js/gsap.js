import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

let container = document.querySelector('.scroll-container');
let sections = gsap.utils.toArray('.scroll-panel');
let myAnimation = gsap.matchMedia(container);

myAnimation.add('(min-width: 1280px)', () => {
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 0.5,
      snap: 1 / (sections.length - 1),
      end: () => '+=' + container.offsetWidth,
    },
  });
});
