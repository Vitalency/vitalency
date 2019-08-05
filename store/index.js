import Vuex from 'vuex'
import { auth } from '@/plugins/firebase.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      isFacebookAuthed: false
    },
    getters: {
      activeUser: (state, getters) => {
        return state.user
      }
    },
    mutations: {
      setUser(state, payload) {
        state.user = payload
      },
      authFacebook(state, payload) {
        state.isFacebookAuthed = payload
      }
    },
    actions: {
      signOut({ commit }) {
        auth.signOut().then(() => {
          commit('setUser', null)
        })
      }
    }
  })
}

export default createStore
