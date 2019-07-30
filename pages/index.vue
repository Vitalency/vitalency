<template>
  <div class="flex">
    <div class="hero">
      <header class="p-4">
        <img src="~assets/images/logo-full-white.svg" alt="vitalency logo" />
      </header>
      <div class="pl-8">
        <div class="hero-content">
          <div>
            Check-ins to keep you in check
          </div>
          <div class="signup-form">Join Vitalency</div>
        </div>
      </div>
    </div>
    <div class="hero-sidebar">
      <header class="flex justify-end p-4">
        <div class="btn">
          SIGN IN
        </div>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style>
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
  opacity: 0.08;
  background: url('~assets/images/pattern-white.svg');
}

.hero-sidebar {
  @apply bg-white;
  @apply flex-1;
}

.hero-content {
  @apply flex;
  @apply items-center;
  @apply justify-between;
  position: relative;
  z-index: 1;
  width: 100%;
  background: gray;
}

.signup-form {
  @apply bg-white;
  @apply p-4;
  @apply border;
  @apply rounded;
  width: 50%;
  max-width: 368px;
  transform: translateX(50%);
}

.btn {
  @apply px-2;
  @apply py-1;
  font-size: 12px;
  height: 42px;
  background: rgba(255, 107, 129, 0.04);
  border: 1px solid rgba(255, 107, 129, 0.4);
  border-radius: 21px;
}
</style>
