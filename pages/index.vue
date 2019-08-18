<template>
  <div class="flex">
    <div class="hero">
      <header class="p-4 mb-8 tablet:mb-0">
        <img src="~assets/images/logo-full-white.svg" alt="vitalency logo" />
      </header>
      <div class="hero-content-container">
        <div class="hero-content">
          <div class="hero-content-info">
            <div style="line-height: 1.25;" class="text-5xl font-title mb-2">
              Check-ins to keep you in check
            </div>
            <p class="text-xl text-white mb-8 tablet:mb-0">
              Support your day to day with a health coach to stay on track with
              your pregnancy. Set goals that work for you and your baby’s health
              - we’ll follow your lead.
            </p>
          </div>
          <div class="flip-container mb-8">
            <div
              class="signup-form-container"
              :class="{ flipped: isFacebookAuthed }"
            >
              <header class="p-4">
                <div class="font-title font-semibold text-3xl mb-1">
                  Join Vitalency
                </div>
                <p class="text-lg">
                  Your first step is meeting your awesome new health coach.
                  Connect to your facebook below and you'll hear from your
                  health coach soon to get started!
                </p>
              </header>
              <div class="signup-form">
                <button
                  class="btn btn-primary btn-full"
                  @click="loginWithFacebook"
                >
                  Get started using Facebook
                </button>
              </div>
            </div>
            <div
              class="thank-you-container"
              :class="{ flipped: isFacebookAuthed }"
            >
              <div>
                <div class="mb-2">
                  <img
                    src="~assets/images/logo-icon.svg"
                    alt="vitalency logo"
                  />
                </div>
                <div class="font-title font-semibold text-3xl mb-1">
                  Thank you!
                </div>
                <p class="text-lg">
                  Your Vitalency health coach will be reaching out to you soon
                  to get started. We're very excited to work with you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-sidebar"></div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  components: {},
  computed: {
    isFacebookAuthed() {
      return this.$store.state.isFacebookAuthed
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

<style>
body {
  @apply font-body;
  @apply text-base;
  color: #2f3542;
}

p {
  color: #747d8c;
}

.hero {
  @apply relative;
  flex: 3;
  min-height: 100vh;
  background: radial-gradient(1128.82px at 0% 100%, #ff7f50 0%, #ff6b81 100%);
}

.hero::after {
  content: '';
  @apply absolute;
  @apply top-0;
  @apply left-0;
  @apply w-full;
  @apply h-full;
  @apply pointer-events-none;
  opacity: 0.08;
  background: url('~assets/images/pattern-white.svg');
}

.hero-sidebar {
  @apply hidden;
  @apply relative;
  @apply bg-white;
  @apply flex-1;
  min-width: 250px;
}

@screen tablet {
  .hero-sidebar {
    @apply block;
  }
}

.hero-sidebar::after {
  content: '';
  @apply absolute;
  @apply top-0;
  @apply left-0;
  @apply w-full;
  @apply h-full;
  @apply pointer-events-none;
  opacity: 0.04;
  background: url('~assets/images/pattern-dark.svg');
}

.hero-content-container {
  @apply items-center;
  @apply justify-end;
  @apply px-4;
}

@screen tablet {
  .hero-content-container {
    @apply flex;
    @apply pl-8;
    @apply pr-0;
    height: calc(100% - 92px);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1000px;
}

@screen tablet {
  .hero-content {
    @apply flex;
    @apply items-center;
    @apply justify-between;
  }
}

.hero-content-info {
  @apply text-white;
}

@screen tablet {
  .hero-content-info {
    margin-right: -120px;
  }
}

.flip-container {
  @apply relative;
  @apply w-full;
  perspective: 800px;
}

@screen tablet {
  .flip-container {
    @apply w-1/2;
    transform: translateX(50%);
    min-width: 368px;
  }
}

.signup-form-container,
.thank-you-container {
  @apply overflow-hidden;
  @apply rounded-lg;
  @apply bg-white;
  backface-visibility: hidden;
  box-shadow: 0px 8px 24px rgba(154, 44, 51, 0.16);
  transition: 0.5s;
  transform-style: preserve-3d;
}

.signup-form-container {
  z-index: 2;
  transform: rotateY(0deg);
}

.signup-form-container.flipped {
  transform: rotateY(-180deg);
}

.thank-you-container {
  @apply flex;
  @apply items-center;
  @apply absolute;
  @apply top-0;
  @apply left-0;
  @apply w-full;
  @apply h-full;
  @apply p-4;
  z-index: 1;
  transform: rotateY(180deg);
}

.thank-you-container.flipped {
  transform: rotateY(0deg);
}

.signup-form {
  @apply p-4;
  background: #fdfdfd;
  box-shadow: 0px -1px 0px #f1f2f6;
}

.btn {
  @apply inline-block;
  @apply px-2;
  @apply border;
  @apply font-title;
  @apply font-extrabold;
  @apply no-underline;
  @apply whitespace-no-wrap;
  @apply select-none;
  @apply cursor-pointer;
  color: #ff6b81;
  height: 42px;
  line-height: 42px;
  background: rgba(255, 107, 129, 0.04);
  border: 1px solid rgba(255, 107, 129, 0.4);
  border-radius: 21px;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-color: rgba(255, 107, 129, 0.4);
  transition: all 150ms;
}

.btn-primary {
  @apply text-white;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.16);
  background: radial-gradient(250.55px at 0% 100%, #ff7f50 0%, #ff6b81 100%);
}

.btn-full {
  @apply w-full;
}
</style>
