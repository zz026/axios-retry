import { createPinia } from 'pinia';
import useCommonStore from './modules/common';

export {
  useCommonStore
};

export default function setupPinia(app) {
  const pinia = createPinia();
  app.use(pinia);
}
