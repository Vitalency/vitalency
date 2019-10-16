<template>
  <div class="flex">
    <div class="hero">
      <header class="p-4 mb-8 tablet:mb-0">
        <a href="/"><img src="~assets/images/logo-full-white.svg" alt="vitalency logo" /></a>
      </header>
      <div class="hero-content-container">
        <div class="hero-content">
          <div class="hero-content-info">
            <div
              style="line-height: 1.25;"
              class="text-5xl font-title mb-2"
            >Thank You!</div>
            <p class="text-xl text-white mb-8 tablet:mb-0">
              You're all set! Your coach will be in touch soon to get started!
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-sidebar"></div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      script: [
        { src: 'https://js.chargebee.com/v2/chargebee.js', 'data-cb-site': 'vitalency-test' }
      ]
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
