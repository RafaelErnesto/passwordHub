<template>
    <div>
        <vs-button class="logout" color="danger" @click="logout" type="filled">Logout</vs-button>
        <div class="content">
            <div class="form-pass">
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                    <vs-input v-if="this.editTag === '' || this.editTag === undefined" class="w-full" size="large" label-placeholder="Tag" v-model="tag" />
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                    <vs-input class="w-full" type="text" size="large" label-placeholder="Password" v-model="password" />
                    </div>
                </div>
            </div>
            <div class="vx-row buttons">
                <div class="vx-col w-full">
                <vs-button class="mr-3 mb-2" color="success" type="filled" @click="save">Save</vs-button>
                <vs-button color="danger"  class="mb-2" type="filled" @click="backHome">Cancel</vs-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var fs = require('fs')
    const remote = require('electron').remote
    const app = remote.app
    const userDataPath = app.getPath('userData')
    export default{
      data: function () {
        return {
          password: '',
          tag: '',
          editTag: this.$route.query.editTag
        }
      },
      methods: {
        save () {
          if (this.editTag === '' || this.editTag === undefined) {
            this.savePassword()
            this.$router.go(-1)
          } else {
            if (this.editTag !== '') {
              this.edit()
            }
          }
        },
        async savePassword () {
          const filename = `${userDataPath}/passwordhubfiles/words`
          let records = []
          let recordsArray = await this.readRecords(filename)
          if (recordsArray !== undefined && recordsArray !== '' && recordsArray !== 0) {
            records = JSON.parse(recordsArray)
          }
          let content = {
            'tag': this.tag,
            'password': this.password
          }
          records.push(content)
          fs.writeFile(filename, JSON.stringify(records, null, 2), (err) => {
            if (err) {
              alert('Error on saving tag')
            }
          })
        },
        async edit () {
          const filename = `${userDataPath}/passwordhubfiles/words`
          let records = []
          let recordsArray = await this.readRecords(filename)
          if (recordsArray !== undefined && recordsArray !== '' && recordsArray !== 0) {
            records = JSON.parse(recordsArray)
          }
          console.log(records)
          records = records.filter((record) => {
            return record['tag'] !== this.editTag
          })
          console.log(records)
          let editedRecord = {
            'tag': this.editTag,
            'password': this.password
          }
          records.push(editedRecord)
          fs.writeFile(filename, JSON.stringify(records, null, 2), (err) => {
            if (err) {
              alert('Error on saving tag')
            } else {
              this.backHome()
            }
          })
        },
        async readRecords (filename) {
          let result = await this.readProcess(filename).then((value) => {
            return value
          }).catch(() => {
            return 0
          })
          return result
        },
        readProcess (filename) {
          return new Promise(function (resolve, reject) {
            fs.readFile(filename, 'utf-8', (err, data) => {
              if (err) {
                reject(err)
              } else {
                resolve(data)
              }
            })
          })
        },
        logout () {
          this.$router.push({name: 'login'})
        },
        backHome () {
          this.$router.go(-1)
        }
      }
    }
</script>
<style scoped>

    .content{
        padding-top:25%;
        margin:auto;
        margin-left:35%;
    }
    .form-pass{
        display:flex;
        justify-content:center;
        flex-direction: column;  
        flex-basis:auto;
        align-items: baseline;
    }
   
   .buttons{
       padding: 1%;

   }

    .logout{
        margin-left:85%;
        margin-top:2%;
    }

</style>