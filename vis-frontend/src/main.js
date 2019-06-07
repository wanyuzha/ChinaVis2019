import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import echarts from 'echarts';
import iView from 'iview';
import echarts_gl from 'echarts-gl';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$bus = new Vue();
Vue.use(echarts);
Vue.use(iView);
Vue.use(echarts_gl);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
