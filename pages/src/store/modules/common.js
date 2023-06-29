import { defineStore } from 'pinia';

export default defineStore('common', {
  state: () => ({
    text: 'Hello Pinia!',
    routerList: []
  }),
  actions: {
    Add_routerList(fns) {
      this.routerList.push(fns)
    },
    Clear_routerList() {
      this.routerList = []
    },
  },
})