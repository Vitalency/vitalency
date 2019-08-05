<template>
  <div class="flex">
    <div class="hero">
      <header class="p-4">
        <img src="~assets/images/logo-full-white.svg" alt="vitalency logo" />
      </header>
      <div style="height: calc(100% - 92px);" class="flex items-center pl-8">
        <div class="hero-content">
          <div style="margin-right: -120px;" class="text-white">
            <div style="line-height: 1.25;" class="text-5xl font-title mb-2">
              Check-ins to keep you in check
            </div>
            <p class="text-xl text-white">
              Support your day to day with a health coach to stay on track with
              your pregnancy. Set goals that work for you and your baby’s health
              - we’ll follow your lead.
            </p>
          </div>
          <div class="signup-form-container overflow-hidden">
            <header class="p-4">
              <div class="font-title font-semibold text-3xl mb-1">
                Thank you!
              </div>
            </header>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-sidebar">
      <header class="flex justify-end p-4 z-10">
        <button class="btn" @click="logout">
          SIGN OUT
        </button>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  components: {},
  methods: {
    logout: function() {
      this.$store.dispatch('signOut').then(() => this.$router.go({ path: '/' }))
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

.vt-input-label {
  @apply font-title;
  @apply font-bold;
  color: #ff6b81;
}

.hero {
  @apply relative;
  height: 100vh;
  flex: 3;
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
  @apply relative;
  @apply bg-white;
  @apply flex-1;
  min-width: 250px;
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

.hero-content {
  @apply flex;
  @apply items-center;
  @apply justify-between;
  position: relative;
  z-index: 1;
  width: 100%;
}

.signup-form-container {
  @apply bg-white;
  @apply rounded-lg;
  width: 50%;
  min-width: 368px;
  transform: translateX(50%);
  box-shadow: 0px 8px 24px rgba(154, 44, 51, 0.16);
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
