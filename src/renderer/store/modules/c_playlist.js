import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    show: false,
    playlist: [],
    cycle: localStorage.cycle ? localStorage.cycle : 'list' // list: 列表循环; random: 随机; single: 单曲
  },
  mutations: {
    update(state, val) {
      state.playlist = val
    },
    toggle(state) {
      state.show = !state.show
    },
    cycleChange(state) {
      let arr = ['list', 'single', 'random']
      arr.every((item, index) => {
        if (item === state.cycle) {
          state.cycle = arr[(index + 1) % 3]
          localStorage.cycle = state.cycle
          return false
        } else {
          return true
        }
      })
    }
  },
  actions: {
    last({state}) {
      if (state.playlist.length) {
        const cur = Vue.store.state.api.play.info
        let index = -1
        state.playlist.forEach((item, i) => {
          if (item.id === cur.id && item.source === cur.source) {
            console.log(i)
            index = i
          }
        })
        switch (state.cycle) {
          case 'list':
            index = (index + state.playlist.length - 1) % state.playlist.length
            break
          case 'random':
            const copy = index // 副本
            index = parseInt(Math.random() * (state.playlist.length - 1), 10) + 1
            if (index === copy) { // 如果随机以后和原本一样，再随机一次
              index = parseInt(Math.random() * (state.playlist.length - 1), 10) + 1
            }
            break
        }
        Vue.store.dispatch('api/play', state.playlist[index])
      }
    },
    next({state}) {
      if (state.playlist.length) {
        const cur = Vue.store.state.api.play.info
        let index = -1
        state.playlist.forEach((item, i) => {
          if (item.id === cur.id && item.source === cur.source) {
            console.log(i)
            index = i
          }
        })
        switch (state.cycle) {
          case 'list':
            index = (index + state.playlist.length + 1) % state.playlist.length
            break
          case 'random':
            index = parseInt(Math.random() * (state.playlist.length - 1), 10) + 1
        }
        Vue.store.dispatch('api/play', state.playlist[index])
      }
    }
  }
}
