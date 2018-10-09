export default {
  methods: {
    isLogged: function () {
      let logged = localStorage.getItem('token')
      return logged !== null
    },
    storeToken (token) {
      localStorage.setItem('token', token)
    },
    logout: function (user) {
      localStorage.removeItem('token')
    }
  }
}
