import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/home/Dashboard.vue';
import Emula from '@/views/home/Emula.vue';
import EmulationList from '@/views/emulation/EmulationList.vue';

const routes = [
    { path: '/', name: 'HomeRouter', component: Dashboard },
    { path: '/emula', name: 'EmulaRouter', component: Emula },
    { path: '/emulation', name: 'EmulationRouter', component: EmulationList }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;