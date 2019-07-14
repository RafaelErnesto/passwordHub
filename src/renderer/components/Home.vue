<template>
    <div>
        <vs-button class="logout" color="danger" @click="logout" type="filled">Logout</vs-button>
        <div class="form-pass">
            <div class="centerx default-input ">
                <vs-input  class="inputx" size="large" @keyup="searchTag" placeholder="Search" v-model="search" />
            </div>
            <div>
                <vs-button  color="primary" size="large" @click="addNew" type="filled">New password</vs-button>
            </div>
        </div>
        <div v-if="showResult" class="result-list">
            <vs-list>
                <vs-list-header title="Results"></vs-list-header>

                <vs-list-item v-for="(record,index) in resultSearch" :key="index" :title="record['tag']" :subtitle="record['password']">
                    <vs-button color="primary"  @click="editPass(record['tag'])">Edit</vs-button>
                </vs-list-item>

            </vs-list>
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
          search: '',
          resultSearch: [],
          showResult: false
        }
      },
      methods: {
        searchTag () {
          const filename = `${userDataPath}/passwordhubfiles/words`
          fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) {
              console.log('Error reading the file.')
            } else {
              if (data) {
                let parsedData = JSON.parse(data)
                console.log(parsedData)
                let searchResult = parsedData.filter((record) => {
                  return this.search === record['tag']
                })
                console.log(parsedData)
                console.log(searchResult)
                if (searchResult.length > 0) {
                  this.resultSearch = searchResult
                  this.showResult = true
                } else {
                  this.showResult = false
                }
              }
            }
          })
        },
        logout () {
          this.$router.push({name: 'login'})
        },
        editPass (tag) {
          this.$router.push({name: 'newPass', query: {editTag: tag}})
        },
        addNew () {
          this.$router.push({name: 'newPass'})
        }
      }
    }
</script>
<style scoped>
    .form-pass{
        padding-top:25%;
        margin:auto;
        display:flex;
        justify-content:center;
        flex-direction: row;  
        flex-basis:auto;
        align-items: baseline;
    }
   
   .form-pass div{
       padding-left: 1%;
   }

    .logout{
        margin-left:85%;
        margin-top:2%;
    }


    .result-list{
        width:60%;
        margin:auto;
        padding-top:10px;
    }
</style>