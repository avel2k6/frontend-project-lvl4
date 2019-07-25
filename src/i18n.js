import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ruJson from '../assets/ru.json';


i18next
  .use(initReactI18next)
  .init({
    lng: 'ru',
    resources: ruJson,
  });

export default i18next;
