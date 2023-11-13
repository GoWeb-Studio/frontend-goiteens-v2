# ПОСИЛАННЯ НА МАКЕТ

🔗 https://www.figma.com/file/aUvLD5kEKDQMZ1teOwXsDf

# 🥤 Starter kit for SoftRyzen

## 1) Запуск збірки

Встановлення залежностей проекту:

```
pnpm install / yarn / npm i
```

Щоб запустити проект в режимі розробки:

```
pnpm start / yarn start / npm start
```

Щоб створити білд для продакшену:

```
pnpm build / yarn build / npm run build
```

## 2) Інформація про збірку

- В збірці використовується шаблонизатор
  [Nunjucks](https://mozilla.github.io/nunjucks/templating.html)

  > Сторінки проекту зберігаються у папці **«pages»**.
  >
  > Секційні фрагменти зберігаються у папці **«partials»**.

- В збірці використовується CSS framework [Tailwind](https://tailwindcss.com/docs/installation) і
  SASS (SCSS)

- В збірці є автоматична оптимізація усіх зображень.

- В збірці є автоматичне створення WEBP зображень: треба додати вихідне jpg або png зображення і
  збірка автоматично створить webp, з назвою картинки як і в вихідного зображення.

- В збірці є автоматичне створення SPRITE.SVG, треба закинути свою svg за шляхом
  "src\assets\images\sprite". Звернутися до спрайту: "./assets/images/sprite.svg#logo". Айдишником
  svg у спрайті буде назва самої svg у папці "sprite".
