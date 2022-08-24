<template>
  <v-form ref="form_create_song">
    <v-container style="padding-bottom: 100px">
      <v-row id="input-form-create-song">
        <v-col sm="12">
          <v-menu offset-y>
            <template v-slot:activator="{ attrs, on }">
              <v-text-field
                label="Chọn người dùng"
                v-bind="attrs"
                v-on="on"
                v-model="nameUserChoose"
                readonly
                :rules="selectRules"
              ></v-text-field>
            </template>
            <v-list-item-group
              style="background-color: #231b2e; height: 200px"
              class="overflow-y-auto"
              v-model="choosedUsers"
              :style="edit? 'display:none' : ''"
            >
              <v-list-item v-for="(user, i) in users" :key="i">
                <v-list-item-content>
                  <v-list-item-title
                    v-text="user.fullname + ' - id: ' + user.id"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-menu>
          <v-list-item-group
            style="background-color: #231b2e"
            v-model="choosedLine"
            multiple
          >
            <v-list-item v-for="(role, index) in roles" :key="index">
                <v-checkbox
                :label="role.display_name"
                v-model="indexChoosedRoles[index]"
                class="change-color-white"
                >
                </v-checkbox>
            </v-list-item>
          </v-list-item-group>
        </v-col>
        <v-col sm="12"> </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-alert
          dense
          type="success"
          width="50%"
          style="position: absolute; bottom: 30%; left: 25%; z-index: 1000"
          v-model="showUpdated"
          transition="fab-transition"
        >
          Thiết lập quyền thành công
        </v-alert>
        <v-btn @click="setupUserRole()">Thiết lập</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      roles: [],
      showUpdated: false,
      nameUserChoose: null,
      choosedUsers: null,
      choosedRoles: [],
      selectRules: [(value) => !!value || "Chưa chọn người dùng"],
      objectUsers: null,
      indexChoosedRoles: [],
      choosedLine: [],
      edit: false
    };
  },
  methods: {
    setupUserRole() {
      if (this.$refs.form_create_song.validate()) {
        var temp = []
        for(let i = 0; i < this.choosedLine.length; i++){
          temp.push(this.roles[this.choosedLine[i]].id)
        }
        axios
          .post("/user/role/store-user-role", {
            userId: this.objectUsers,
            roles: temp
          })
          .then((response) => {
            if (response.data.message === "success") {
              this.showUpdated = true;
              setTimeout(() => {
                this.showUpdated = false;
              }, 2000);
            }
          })
          .catch(() => {
            console.log("fail to setup");
          });
      }
    },
    getAllUser() {
      axios
        .get("/user/get-all-user")
        .then((response) => {
          this.users = response.data.users
          this.firstLoadEdit()
        })
        .catch(() => {
          console.log("fail to get users");
        });
    },
    getAllRole() {
      axios
        .get("/user/role/get-all-role")
        .then((response) => {
          this.roles = response.data.roles
          this.indexChoosedRoles = new Array(this.roles.length).fill(false)
        })
        .catch(() => {
          console.log("fail to get roles");
        });
    },
    firstLoadEdit(){
      if(this.$route.path.includes('edit')){
        this.edit = true
        var id = this.$route.params.id
        var index = this.users.findIndex(x => x.id == id)
        this.choosedUsers = index
        this.objectUsers = id
        this.nameUserChoose = this.users[index].fullname
      }
    }
  },
  created() {
    this.getAllUser();
    this.getAllRole();
  },
  watch: {
    choosedUsers() {
      this.objectUsers = null;
      this.nameUserChoose = null;
      if (this.choosedUsers || this.choosedUsers === 0) {
        this.nameUserChoose = this.users[this.choosedUsers].fullname;
        this.objectUsers = this.users[this.choosedUsers].id;
        axios
          .get("/user/role/get-role-of-user/" + this.objectUsers)
          .then((response) => {
            this.choosedRoles = response.data.userRoles
            this.indexChoosedRoles = new Array(this.roles.length).fill(false)
                this.choosedRoles.findIndex((x) => {
                    for(let j = 0; j < this.roles.length; j++){
                        if(x == this.roles[j].id){
                            this.indexChoosedRoles[j] = true
                        }
                    }
                })
          })
          .catch(() => {
            console.log("fail to get info role of user");
          });
      }
    },
    choosedRoles(){
        var temp = []
        for(let i = 0; i < this.choosedRoles.length; i++){
            for(let j = 0; j < this.roles.length; j++){
                if(this.choosedRoles[i] === this.roles[j].id){
                    temp.push(j)
                }
            }
        }
        this.choosedLine = temp
    },
    // "$route.path"() {
    //   this.firstLoadEdit()
    // }
  },
};
</script>

<style>
.input-chx .v-input--selection-controls__input {
  background-color: white;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background: grey;
}
.v-data-footer__icons-before .mdi-chevron-left::before{
  color: white;
}
.v-data-footer__icons-after .mdi-chevron-right::before{
  color: white;
}
</style>