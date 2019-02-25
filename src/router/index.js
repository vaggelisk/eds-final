import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import EnginePerformance from '@/components/EnginePerformance'
import ComponentsDiagnostics from '@/components/ComponentsDiagnostics'
import Troubleshooting from '@/components/Troubleshooting'
import Maintenance from '@/components/Maintenance'
import SpareParts from '@/components/SpareParts'

Vue.use(Router);

var router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: {
        name: "Dashboard"
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/engine-performance',
      name: 'EnginePerformance',
      component: EnginePerformance
    },
    {
      path: '/components-diagnostics',
      name: 'componentsDiagnostics',
      component: ComponentsDiagnostics
    },
    {
      path: '/troubleshooting',
      name: 'Troubleshooting',
      component: Troubleshooting
    },
    {
      path: '/maintenance',
      name: 'Maintenance',
      component: Maintenance
    },
    {
      path: '/spare-parts',
      name: 'SpareParts',
      component: SpareParts
    }
  ]
});


export default router;

