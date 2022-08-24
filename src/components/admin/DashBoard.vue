<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  beforeCreate() {
    if (localStorage.getItem("music_token")) {
      axios
        .get("/user/checkRole")
        .then((response) => {
          if (!response.data.permissions) {
            this.$router.push("/");
          } else {
            this.$store.dispatch(
              "updatePermissions",
              response.data.permissions
            );
            var arrAccepted = response.data.permissions
            var arrItemSideBarAccept = []
            if (arrAccepted.some((x) => x == "list_song")) {
              arrItemSideBarAccept.push({
                title: "Bài hát",
                icon: "mdi-account-music",
                to: "/admin/song",
              });
            }
            if (arrAccepted.some((x) => x == "list_album")) {
              arrItemSideBarAccept.push({
                title: "Album",
                icon: "mdi-album",
                to: "/admin/album",
              });
            }
            if (arrAccepted.some((x) => x == "list_genre")) {
              arrItemSideBarAccept.push({
                title: "Thể loại",
                icon: "mdi-format-list-bulleted-type",
                to: "/admin/genre",
              });
            }
            if (arrAccepted.some((x) => x == "list_user")) {
              arrItemSideBarAccept.push({
                title: "Người dùng",
                icon: "mdi-account-settings",
                to: "/admin/user",
              });
            }
            if (arrAccepted.some((x) => x == "list_singer")) {
              arrItemSideBarAccept.push({
                title: "Ca sỹ",
                icon: "mdi-account-star",
                to: "/admin/user/singer",
              });
            }
            if (arrAccepted.some((x) => x == "list_composer")) {
              arrItemSideBarAccept.push({
                title: "Người sáng tác",
                icon: "mdi-account-star",
                to: "/admin/user/composer",
              });
            }
            if (arrAccepted.some((x) => x == "list_role")) {
              arrItemSideBarAccept.push({
                title: "Vai trò",
                icon: "mdi-account-star",
                to: "/admin/role",
              });
            }
            if (arrAccepted.some((x) => x == "add_setup-account")) {
              arrItemSideBarAccept.push({
                title: "Thiết lập quyền",
                icon: "mdi-account-star",
                to: "/admin/setup-role",
              });
            }
            if (
              arrAccepted.some((x) => x == "delete_singer") &&
              arrAccepted.some((x) => x == "delete_composer")
            ) {
              arrItemSideBarAccept.push({
                title: "Định dạng tài khoản",
                icon: "mdi-account-cog-outline",
                to: "/admin/setup-account",
              });
            }
            this.$store.dispatch(
              "sideBar/updateItemSideBars",
              arrItemSideBarAccept
            )
            var arrItemBelow = []
            if(arrAccepted.some(x => x == 'list_slide')){
                arrItemBelow.push(
                    { title: "Slide", icon: "mdi-image-area", to: "/admin/slide" },
                )
            }
            this.$store.dispatch("sideBar/updateItemBelowSideBars", arrItemBelow)
          }
        })
        .catch(() => {
          this.$router.push("/");
        });
    } else {
      this.$router.push("/");
    }
  },
  mounted() {
    this.$store.dispatch("updateShowMenu", false);
  },
};
</script>