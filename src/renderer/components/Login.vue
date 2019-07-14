<template>
    <div class="login-container">
        <div class="vx-row mb-6">
            <div class="vx-col w-full">
                <vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border label="Username" v-model="username" />
            </div>
        </div>
        <div class="vx-row mb-6 p-5">
            <div class="vx-col w-full">
                <vs-input type="password" class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border label="Password" v-model="password" />
            </div>
        </div>
        <div class="vx-row">
            <div class="vx-col w-full">
                <vs-button class="mr-3 mb-2" size="large" color="success" @click="login">Login</vs-button>
                <vs-button class="mr-3 mb-2" size="large" color="primary" @click="register">Register</vs-button>
            </div>
        </div>
    </div>
</template>
<script>
    var fs = require('fs')
    var crypto = require('crypto')
    const remote = require('electron').remote
    const app = remote.app
    const userDataPath = app.getPath('userData')
    export default{
      data: function () {
        return {
          username: '',
          password: ''
        }
      },
      methods: {
        login () {
          const filename = `${userDataPath}/passwordhubfiles/register`
          if (this.username !== '' && this.password !== '') {
            fs.readFile(filename, 'utf-8', (err, data) => {
              if (err) {
                alert('An error ocurrerd')
                return 0
              } else {
                let filedata = JSON.parse(data)
                let sha = crypto.createHash('sha256')
                let authentication = filedata.filter((record) => {
                  return record['username'] === this.username && record['password'] === sha.update(this.password).digest('hex')
                })
                if (authentication.length > 0) {
                  this.$router.push({name: 'homepage'})
                }
              }
            })
          }
        },
        register () {
          this.$router.push({name: 'register'})
        }
      }
    }
</script>
<style scoped>
    .login-container{
        margin-left:35%;
        margin-top:20%;
    }
    .login-container div{
        padding-top:1%;
    }
</style>
        