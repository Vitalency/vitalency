export default function ({ store, redirect, route }) {
  if (store.state.user !== null & route.name === 'registered') {
    redirect('/registered')
  }

  if (store.state.user === null && isAdminRoute(route)) {
    redirect('/login')
  }
}

function isAdminRoute(route) {
  if (route.matched.some(record => record.path === '/registered')) {
    return true
  }
}
