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
                <vs-button class="mr-3 mb-2" size="large" color="success" @click="create">Save</vs-button>
            </div>
        </div>
    </div>
</template>
<script>
    // const {dialog} = require('electron').remote
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
        create () {
          if (this.username !== '' && this.password !== '') {
            let registrarion = this.register()
            if (registrarion === 1) {
              this.$router.push({name: 'homepage'})
            }
          }
        },
        register () {
          const filename = `${userDataPath}/passwordhubfiles/register`
          let sha = crypto.createHash('sha256')
          let content = [{
            'username': this.username,
            'password': sha.update(this.password).digest('hex')
          }]
          if (filename === undefined) {
            return 0
          }
          fs.writeFile(filename, JSON.stringify(content, null, 2), (err) => {
            if (err) {
              throw err
            }
          })
          return 1
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
        