<template>
  <v-form ref="form_create_role">
    <v-container style="background-color: rgb(23 15 32 / 1);">
      <v-row id="input-form-create-song">
        <v-col class="pa-0" sm="12">
          <v-text-field
            v-model="name"
            label="Tên vai trò"
            clearable
            :rules="rules"
            color="white"
          ></v-text-field>
        </v-col>
        <v-col class="pa-0" sm="12">
          <v-text-field
            v-model="display_name"
            label="Mô tả"
            clearable
            :rules="rules"
            color="white"
          ></v-text-field>
        </v-col>
      </v-row>
      <div v-for="(permission, index) in permissions" :key="index">
          <v-row>
            <p class="text-uppercase text-decoration-underline text-primary title" style="color: #ffc107">{{ permission.name }}</p>
          </v-row>
          <v-row class="mb-6" style="border-bottom: 2px solid white">
            <v-col md="3" v-for="(per, inx) in permission.child" :key="inx + '-child'">
                <v-checkbox
                v-model="choosedPermission[index][inx]"
                :label="per.name"
                :ref='per.id'
                :data='index + "-" + inx'
                class="change-color-white"
                @click="clickCheckbox(per.id)"
                >
                </v-checkbox>
            </v-col>
          </v-row>
      </div>
      <v-row class="pt-10" v-if="!$route.params.id" justify="center" align="center">
                    <v-alert
                      dense
                      type="success"
                      width="50%"
                      style="position: absolute; bottom: 30%; left: 25%;z-index: 1000;"
                      v-model="showUpdated"
                      transition="fab-transition"
                    >
                      Thêm thành công
                    </v-alert>
            <v-btn @click="createRole()">Tạo vai trò</v-btn>
      </v-row>
      <v-row class="pt-10" v-else justify="center" align="center">
                    <v-alert
                      dense
                      type="success"
                      width="50%"
                      style="position: absolute; bottom: 30%; left: 25%;z-index: 1000;"
                      v-model="showUpdated"
                      transition="fab-transition"
                    >
                      Sửa thành công
                    </v-alert>
            <v-btn @click="editRole()">Sửa vai trò</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            name: null,
            display_name: null,
            rules: [
                (value) => !!value || "Chưa nhập ký tự",
                (value) => (value && value.length >= 2) || "Ít nhất 2 ký tự",
            ],
            showUpdated: false,
            permissions: [],
            choosedPermission : [],
            choosedId: []
        }
    },
    created(){
      this.getFullPermission()
      if(this.$route.params.id){
        this.getFullInforRole()
      }
    },
    methods: {
        createRole(){
          axios.post('/user/role/store',{
            name: this.name,
            display_name: this.display_name,
            permissionIds: this.choosedId
          })
          .then( (response) => {
            if(response.data.message === 'success'){
              this.showUpdated = true
              setTimeout(() => {
                this.showUpdated = false
              }, 2000)
              this.$refs.form_create_role.reset()
              this.name = null
              this.display_name = null
            }
          })
          .catch( (response) => {
            console.log(response)
          })
        },
        getFullInforRole(){
            axios.get('/user/role/get-full-infor-role/' + this.$route.params.id)
            .then( (response) => {
                this.name = response.data.role.name
                this.display_name = response.data.role.display_name

                this.choosedPermission = new Array(this.permissions.length).fill(false)
                for(let i = 0; i < this.permissions.length; i++){
                  this.choosedPermission[i] = new Array(this.permissions[i].child.length).fill(false)
                }

                for(let i = 0; i < response.data.role.permissions.length; i++){
                  var temp = response.data.role.permissions[i].id
                  this.choosedId.push(temp)
                  var position = (this.$refs[temp][0]).$attrs.data
                  position = position.split('-')
                  this.choosedPermission[position[0]][parseInt(position[1])] = true
                }

                //đây là phần xử lý nếu thích header là checkbox
                // for(let i = 0; i < this.permissions.length; i++){
                //   var flag = true
                //   for(let j = 1; j < this.choosedPermission[i].length; j++){
                //     if(!this.choosedPermission[i][j]){
                //       flag = false
                //       break
                //     }
                //   }
                //   this.choosedPermission[i][0] = flag
                // }
            })
            .catch( () => {
                console.log('fail to get infor role')
            })
        },
        editRole(){
            if(this.$refs.form_create_role.validate()){
                axios.post('/user/role/store-edit',{
                    name : this.name,
                    display_name : this.display_name,
                    permissionIds: this.choosedId,
                    roleId: this.$route.params.id
                })
                .then( (response) => {
                    if(response.data.message === 'success'){
                        this.showUpdated = true
                        setTimeout(() => {
                        this.showUpdated = false
                        }, 2000)
                    }
                })
                .catch( () => {
                    console.log('fail to edit role')
                })
            }
        },
        getFullPermission(){
            axios.get('/permission')
            .then( (response) => {
                this.permissions = response.data.data
                
                this.choosedPermission = new Array(this.permissions.length).fill(false)
                for(let i = 0; i < this.choosedPermission.length; i++){
                    this.choosedPermission[i] = new Array(this.permissions[i].child.length).fill(false)
                }
            })
            .catch(() => {
                console.log('fail to load all permissions')
            })
        },
        clickCheckbox(id){
            if(this.choosedId.some(x => x == id)){
                this.choosedId = this.choosedId.filter(x => x != id)
            }else{
                this.choosedId.push(id)
            }
        }
    }
}
</script>

<style>
.change-color-white .v-icon{
    color: white !important;
}
.change-color-white .v-label{
    color: white !important;
}
</style>