import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import pl from './locales/pl.json';
import 'flag-icons/css/flag-icons.min.css';

const i18n = createI18n({
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages: { en, pl }, // set locale messages
  });

  const app = createApp(App);
  app.use(i18n);
  app.mount('#app');
