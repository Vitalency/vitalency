export default function({ store, redirect, route }) {
  // Take authenticated users right to Thank You
  if (route.name === 'index' && store.state.user !== null) {
    this.$store.commit('isfacebookAuthed', true)
  }

  // Otherwise, redirect from everywhere to the login page
  if (store.state.user === null && route.name !== 'index') {
    redirect('/')
  }
}
