<template>
  <div class="flex">
    <div class="hero">
      <header class="p-4 mb-8 tablet:mb-0">
        <img src="~assets/images/logo-full-white.svg" alt="vitalency logo" />
      </header>
      <div class="hero-content-container">
        <div class="hero-content">
          <div class="hero-content-info">
            <div
              style="line-height: 1.25;"
              class="text-5xl font-title mb-2"
            >Check-ins to keep you in check</div>
            <p class="text-xl text-white mb-8 tablet:mb-0">
              Support your day to day with a health coach to stay on track with
              your pregnancy. Set goals that work for you and your baby’s health
              - we’ll follow your lead.
            </p>
          </div>
          <div class="flip-container mb-8">
            <div class="signup-form-container" :class="{ flipped: isUserAuthed }">
              <header class="p-4">
                <div class="font-title font-semibold text-3xl mb-1">Join Vitalency</div>
                <p class="text-lg">
                  Your first step is meeting your awesome new health coach.
                  Answer just a few questions below and you'll hear from your
                  health coach soon to get started!
                </p>
              </header>
              <form class="signup-form" @submit.prevent="submitDetails">
                <div v-if="formState === 1">
                  <div
                    class="mb-2 font-title font-semibold text-lg"
                  >Are you expecting or have you delivered?</div>
                  <div class="flex items-center mb-1">
                    <button
                      type="button"
                      class="btn flex-1 mr-sm"
                      @click="setPregnancyDetail(true)"
                    >Expecting</button>
                    <button
                      type="button"
                      class="btn flex-1 ml-sm"
                      @click="setPregnancyDetail(false)"
                    >Delivered</button>
                  </div>
                </div>

                <div v-if="formState === 2">
                  <div v-if="!healthConditions">
                    <div
                      class="mb-2 font-title font-semibold text-lg"
                    >Do you have any current medical conditions?</div>
                    <div class="flex items-center mb-1">
                      <button
                        type="button"
                        class="btn flex-1 mr-sm"
                        @click="sethealthCondition(false)"
                      >No</button>
                      <button
                        type="button"
                        class="btn flex-1 ml-sm"
                        @click="sethealthCondition(true)"
                      >Yes</button>
                    </div>
                  </div>

                  <div v-if="healthConditions">
                    <div
                      class="mb-2 font-title font-semibold text-lg"
                    >What are the medical conditions details?</div>
                    <div class="flex items-center mb-1">
                      <textarea class="vt-textarea p-2" v-model="healthConditionDetail"></textarea>
                    </div>
                    <button type="button" class="btn btn-primary btn-full" @click="nextForm">Next</button>
                  </div>
                </div>

                <div v-if="formState === 3">
                  <div
                    class="mb-2 font-title font-semibold text-lg"
                  >What are you looking to achieve by working with a Vitalency Health Coach?</div>
                  <div class="flex items-center mb-1">
                    <textarea class="vt-textarea p-2" v-model="goalDetail"></textarea>
                  </div>
                  <button type="button" class="btn btn-primary btn-full" @click="nextForm">Next</button>
                </div>

                <div v-if="formState === 4">
                  <label class="vt-input-container mb-1">
                    <span
                      style="top: 0; left: 16px; line-height: 42px;"
                      class="vt-input-label absolute"
                    >Email</span>
                    <input type="email" class="vt-input" v-model="emailAddress" />
                  </label>
                  <button type="submit" class="btn btn-primary btn-full">Get started</button>
                </div>
              </form>
            </div>
            <div class="thank-you-container" :class="{ flipped: isUserAuthed }">
              <div>
                <div class="mb-2">
                  <img src="~assets/images/logo-icon.svg" alt="vitalency logo" />
                </div>
                <div class="font-title font-semibold text-3xl mb-1">Thank you!</div>
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
  data() {
    return {
      formState: 1,
      emailAddress: '',
      isPregnant: '',
      healthConditions: false,
      healthConditionDetail: '',
      goalDetail: '',
      isUserAuthed: false
    }
  },
  methods: {
    setPregnancyDetail(pregnantState) {
      this.isPregnant = pregnantState
      this.nextForm()
    },
    sethealthCondition(healthConditionState) {
      this.healthConditions = healthConditionState
      if (healthConditionState === false) {
        this.nextForm()
      }
    },
    nextForm() {
      this.formState++
    },
    submitDetails(event) {
      // Validate this is a real email address before we send it. If it's not, exit
      if (!this.validateEmailAddress(this.emailAddress)) return

      const newProspect = {
        emailAddress: this.emailAddress,
        isPregnant: this.isPregnant,
        healthConditions: this.healthConditions,
        healthConditionDetail: this.healthConditionDetail.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'),
        goalDetail: this.goalDetail.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
      }

      this.uploadEmailAddressToFirestore(newProspect).then(() => {
        this.isUserAuthed = true
      })
    },
    validateEmailAddress(emailAddress) {
      // Validate it's even provided
      if (!emailAddress) return false

      // Use the regex provided by https://www.regular-expressions.info/email.html to test this is a valid email
      const emailAddressRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      return emailAddressRegex.test(emailAddress)
    },
    uploadEmailAddressToFirestore(newProspect) {
      return firebase
        .firestore()
        .collection('signUpEmails')
        .add(newProspect)
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
    min-width: 480px;
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

.vt-textarea {
  @apply font-semibold;
  @apply font-title;
  width: 100%;
  height: 84px;
  color: #ff6b81;
  background: rgba(255, 107, 129, 0.04);
  border: 1px solid rgba(255, 107, 129, 0.4);
  border-radius: 8px;
  resize: none;
}

.vt-textarea:focus {
  @apply outline-none;
}

.vt-input-container {
  @apply block;
  @apply relative;
}

.vt-input {
  @apply pl-8;
  @apply font-semibold;
  @apply font-title;
  width: 100%;
  height: 42px;
  color: #ff6b81;
  background: rgba(255, 107, 129, 0.04);
  border: 1px solid rgba(255, 107, 129, 0.4);
  border-radius: 21px;
}

.vt-input:focus {
  @apply outline-none;
}

.vt-input:invalid {
  border-color: #ff6f79;
}

.vt-input-label {
  @apply font-title;
  @apply font-bold;
  color: #ff6b81;
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

.btn:hover,
.btn:active {
  @apply text-white;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.16);
  background: radial-gradient(250.55px at 0% 100%, #ff7f50 0%, #ff6b81 100%);
}

.btn:focus {
  @apply outline-none;
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
