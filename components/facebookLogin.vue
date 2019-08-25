<template>
    <div class="signup-form">
        <label class="vt-input-container mb-1">
            <span
                style="top: 0; left: 16px; line-height: 42px;"
                class="vt-input-label absolute"
            >
            Email
            </span>
            <input type="text" class="vt-input" v-model="emailAddress"/>
        </label>
        <button
            type="button"
            class="btn btn-primary btn-full"
            @click="sendForm"
        >
            Get started
        </button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  components: {},
  data() {
    return {
      emailAddress: ''
    }
  },    
  computed: {
    isUserAuthed() {
      return this.$store.state.isUserAuthed
    }
  },  
  middleware: 'auth',
  methods: {
    loginWithFacebook: function() {
      // Setup the facebook provider and request the attributes we need
      this.provider = new firebase.auth.FacebookAuthProvider()
      this.provider.addScope('user_birthday')
      this.provider.addScope('email')
      this.provider.addScope('user_gender')
      this.provider.addScope('user_location')
      this.provider.addScope('user_link')

      // Make the auth request using a popup. We may want to consider the redirect workflow if we are mostly seeing mobile users.
      firebase
        .auth()
        .signInWithPopup(this.provider)
        .then((result) => {
          // We'll update the user's data every time they authenticate with facebook
          this.writeUserDetailsToFirestore({
            uid: result.user.uid,
            firstName: result.additionalUserInfo.profile.first_name,
            lastName: result.additionalUserInfo.profile.last_name,
            gender: result.additionalUserInfo.profile.gender,
            facebookProfileLink: result.additionalUserInfo.profile.link,
            birthday: result.additionalUserInfo.profile.birthday
          })

          // Update our store so we know this person is authenticated, and then redirect to the thank you page
          this.$store.commit('setUser', result.user)
          this.$store.commit('authFacebook', true)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message

          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with that email address.')
          } else {
            alert(`Error code ${errorCode} with message "${errorMessage}"`)
          }
        })
    },

    writeUserDetailsToFirestore(userDetails) {
      const birthday = new Date(userDetails.birthday)

      // The UID will be used as the key
      firebase
        .firestore()
        .collection('users')
        .doc(userDetails.uid)
        .set({
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          gender: userDetails.gender,
          facebookProfileLink: userDetails.facebookProfileLink,
          birthday: {
            month: birthday.getMonth() + 1,
            day: birthday.getDate(),
            year: birthday.getFullYear()
          }
        })
    }
  }
}
</script>