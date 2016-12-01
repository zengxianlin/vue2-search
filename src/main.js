/*
* @Author: zengxianlin
* @Date:   2016-12-01 18:29:57
* @Last Modified by:   877529974@qq.com
* @Last Modified time: 2016-12-01 18:30:08
*/
'use strict';
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
