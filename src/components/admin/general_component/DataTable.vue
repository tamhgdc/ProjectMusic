<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="10"
    :loading='loading'
    loading-text="Đang lấy dữ liệu..."
    :footer-props="{
      'items-per-page-text': 'Số dòng mỗi trang:',
    }"
    class="elevation-1"
    style="background-color: #170f23"
  >
    <template v-slot:top>
      <v-toolbar
        flat
        color="success"
      >
        <v-toolbar-title>Danh sách</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-if="to"
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              :to="to"
            >
              Thêm mới
            </v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Bạn đã chắc chắn xóa chưa?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Hủy bỏ</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Xóa</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        color="white"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        color="white"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    props:['desserts', 'headers','to', 'loading'],
    data: () => ({
      dialogDelete: false,
      editedIndex: -1,
      dialog: false,
      nameRouter : null
    }),

    watch: {
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created(){
      var split = this.$route.path.split('/')
      this.nameRouter = split[split.length - 1]
    },

    methods: {
      editItem (item) {
          if(this.$route.path.includes('admin')){
            this.$router.push('/admin/'+ this.nameRouter +'/edit/' + item.id)
          }else if(this.$route.path.includes('playlist')){
            this.$router.push(this.nameRouter +'/edit/' + item.id)
          }
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style>
#input-edit-form input{
  color:black !important;
}
</style>