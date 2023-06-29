import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import setupPinia, { useCommonStore } from "@/store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

setupPinia(app);

router.beforeEach((from, to, next) => {
  const commonStore = useCommonStore()
  commonStore.routerList.forEach(fn => {
    fn && fn()
  })
  next()
})

app
  .use(router)
  .use(ElementPlus)
  .mount("#app");
