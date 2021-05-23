import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faAsterisk,faExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash);
library.add(faAsterisk);
library.add(faExclamation);

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
