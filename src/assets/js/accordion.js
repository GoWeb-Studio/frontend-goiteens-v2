const accordionItem = document.querySelectorAll('.accordion-item');
accordionItem.forEach(item => item.addEventListener('click', toggleAccordion));

function toggleAccordion(e) {
  const currentTarget = e.currentTarget;
  const target = e.target;

  if (currentTarget !== target.closest('.accordion-item')) {
    return;
  }

  const ariaExpanded = currentTarget.getAttribute('aria-expanded');
  const accordionAnswer = currentTarget.querySelector('.accordion-answer');

  if (ariaExpanded === 'false') {
    currentTarget.setAttribute('aria-expanded', 'true');
    accordionAnswer.style.maxHeight = accordionAnswer.scrollHeight + 'px';
  } else {
    currentTarget.setAttribute('aria-expanded', 'false');
    accordionAnswer.style.maxHeight = 0;
  }
}
