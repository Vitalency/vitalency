<template>
    <div class="error-flex-container">
        <div class="flex-item">
            <a href="/">
                <img src="~assets/images/logo-full-white.svg">
                <br>
                <div v-if="error.statusCode === 404">
                    <h1 class="font-title text-3xl">Page not found</h1>
                    <p>
                        Unfortunately, what you were looking for isn't here.
                    </p>
                    <p>
                        Fortunately, if you're looking for motivation, we can help! Click here to get started!
                    </p>
                </div>
                <div v-else>
                    <h1 class="font-title text-3xl">Something went wrong</h1>
                    <p>
                        Click here to get back to our main page!
                    </p>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style>
html {
    background-color: #ff6e79;
}

body {
    @apply font-body;
    @apply text-base;
}

html, body, #__nuxt, #__nuxt #__layout, #__nuxt #__layout>div {
    height: 100%;
}

.error-flex-container {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.error-flex-container .flex-item {
    text-align: center;
    color: white;
}

.error-flex-container h1 {
    font-size: 24px;
}

.error-flex-container img {
    margin: 0px auto;
}

.error-flex-container p {
    margin-top: 1em;
}
</style>
