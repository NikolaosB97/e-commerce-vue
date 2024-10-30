// src/main.js


import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { Field, Form, ErrorMessage } from 'vee-validate';

const app = createApp(App);

app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

app.use(router);
app.mount('#app');
