import Vue from 'vue'
import VueRouter from 'vue-router'
import Light from '.././components/Light.vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/red',
      component: Light,
      props: { color:'red', duration: 10}
    },
    {
      path: '/yellow',
      component: Light,
      props: { color:'yellow', duration: 3}
    },
    {
      path: '/green',
      component: Light,
      props: { color:'green', duration: 15}
    }
  ]
})