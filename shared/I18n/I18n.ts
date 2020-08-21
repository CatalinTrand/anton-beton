import I18n from 'i18n-js';
import en from './locales/en.json';
import ro from './locales/ro.json';

I18n.locale = 'ro';
I18n.default = 'en';

I18n.fallbacks = true;
I18n.translations = {
  ro,
  en,
};

export default I18n;
