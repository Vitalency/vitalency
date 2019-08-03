import Vuex from 'vuex'
import { auth, FacebookProvider } from '@/plugins/firebase.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null
    },
    getters: {
      activeUser: (state, getters) => {
        return state.user
      }
    },
    mutations: {
      setUser(state, payload) {
        state.user = payload
      }
    },
    actions: {
      autoSignIn({ commit }, payload) {
        commit('setUser', payload)
      },

      signInWithFacebook({ commit }) {
        debugger
        return new Promise((resolve, reject) => {
          auth.signInWithPopup(FacebookProvider)
          resolve()
        })
      },

      signOut({ commit }) {
        auth.signOut().then(() => {
          commit('setUser', null)
        })
      }
    }
  })
}

export default createStore
