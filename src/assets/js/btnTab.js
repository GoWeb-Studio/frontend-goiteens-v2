const btnTabRef = document.querySelectorAll('.tab-btn');
const tabContentRef = document.querySelectorAll('.tab-content');

function handleClickTab(e) {
  const btn = e.currentTarget;

  // Удалить класс 'active' с всех кнопок
  btnTabRef.forEach(btn => {
    btn.classList.remove('active');
  });

  // Добавить класс 'active' на нажатую кнопку
  btn.classList.add('active');

  // Удалить класс 'active' со всего контента
  tabContentRef.forEach(content => {
    content.classList.remove('active');
  });

  // Добавить класс 'active' к соответствующему контенту
  const contentId = btn.dataset.target;
  const content = document.querySelector(contentId);
  if (content) {
    content.classList.add('active');
  }
}

btnTabRef.forEach(el => {
  el.addEventListener('click', handleClickTab);
});
