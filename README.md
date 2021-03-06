# Мессенджер

Учебный проект Яндекс.Практикума: приложение "Мессенджер". Смотреть на [Netlify](https://keen-northcutt-57a9f4.netlify.app) или [Heroku](https://immense-scrubland-27655.herokuapp.com).

## Установка

Для работы необходим [Node.js >=12.13.0](https://nodejs.org/en/), установленный на вашем компьютере. А также [git](https://git-scm.com/downloads) (не забудьте добавить его в `PATH`).

Скачайте репозиторий и установите зависимости, запустив `npm i` в корне репозитория. Доступные команды: 
- `npm run start` — старт проекта в дев-режиме (локальный сервер и авто-сборка при изменениях в коде),
- `npm run build` — сборка для production,
- `npm run test` — запуск тестов

## Инструментарий

Типизация:
- [TypeScript](https://www.typescriptlang.org/)

Процессинг CSS:
- [SASS](https://sass-lang.com/)
- [PostCSS](https://github.com/postcss/postcss)

Линтинг и форматрирование: 
- [ESLint](https://eslint.org/) ([Airbnb config](https://github.com/airbnb/javascript)), 
- [stylelint](https://stylelint.io/) ([stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard#readme)), 
- [Prettier](https://prettier.io/), 
- [EditorConfig](https://editorconfig.org/)

Сборка:

[webpack](https://webpack.js.org/)

## Зависимости

Проект использует базовые стили из [html5-boilerplate](https://github.com/h5bp/html5-boilerplate).

В качестве шаблонизатора используется [handlebars](https://handlebarsjs.com/).

Для генерации ID инстансам компонент используется [nanoid](https://github.com/ai/nanoid)

## Производительность

Очень плохая. Нужно попробовать прекомпилировать шаблоны и статические компоненты
