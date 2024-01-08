import { createApp } from 'vue';
import router from './js/router/router';
import emitter from 'tiny-emitter/instance'

import App from './App.vue';
import MButton from './components/base/MButton.vue';
import MIcon from './components/base/MIcon.vue';
import MInput from './components/base/MInput.vue';
import MTable from './components/base/MTable.vue';
import MCombobox from './components/base/MCombobox.vue';
import MDialog from './components/base/MDialog.vue';
import MFilter from './components/base/MFilter.vue';
import MToastMessage from './components/base/MISAToastMessage.vue';
import resource from './js/helpers/resource';
import MEnum from './js/helpers/enum';
import common from './js/helpers/common';

const app = createApp(App);

app.config.globalProperties.$resource = resource;
app.config.globalProperties.$enum = MEnum;
app.config.globalProperties.$langCode = 'VN';
app.config.globalProperties.$langCodeENG = 'ENG';
app.config.globalProperties.$emitter = emitter;
app.config.globalProperties.$common = common;

app
.component('m-button', MButton)
.component('m-icon', MIcon)
.component('m-input', MInput)
.component('m-table', MTable)
.component('m-combobox', MCombobox)
.component('m-dialog', MDialog)
.component('m-filter', MFilter)
.component('m-toast-message', MToastMessage)

app.use(router);

app.mount('#app');
