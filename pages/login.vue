<template>
  <div class="w-full max-w-xs">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent="login"
    >
      <div class="mb-4">
        <label
class="block text-gray-700 text-sm font-bold mb-2"
for="email">Email address</label>
        <input
          id="email"
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Email"
        />
      </div>
      <div class="mb-6">
        <label
class="block text-gray-700 text-sm font-bold mb-2"
for="password">Password</label>
        <input
          id="password"
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="******************"
        />
        <p class="text-xs italic">
          Please choose a password.
        </p>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >Forgot Password?</a>
      </div>
    </form>

    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent="loginWithFacebook"
    >
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In With Facebook
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  components: {},
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          function (user) {
            alert('Well done!')
          },
          function (error) {
            alert('Ooops! ' + error.message)
          }
        )
    },
    loginWithFacebook: function () {
      debugger

      this.$store.dispatch('signInWithFacebook').then(() => {
        this.$router.push('/registered')
      }).catch((error) => {
        debugger
        alert('Ooops! ' + error.message)
      })

      // this.provider = new firebase.auth.FacebookAuthProvider()
      // firebase
      //   .auth()
      //   .signInWithPopup(this.provider)
      //   .then((result) => {
      //     this.$router.push('/')
      //   })
      //   .catch((error) => {
      //     alert('!Ooops! ' + error.message)
      //   })
    }
  }
}
</script>
<style></style>
