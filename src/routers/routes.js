import { createRouter, createWebHistory } from "vue-router";

import ScreenHome from "../screen/Home.vue";
import ScreenLogin from "../screen/Login.vue";

const routes = [
    { path: "/", name: "login", component: ScreenLogin },
    { path: "/home", name: "home", component: ScreenHome },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
