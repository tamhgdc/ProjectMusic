import axios from 'axios'
export const singerInforMixin = {
    data(){
        return{
            singerInfo: {},
            isHiddenInforCard: true,
            isHovering: false,
            inforSingerLoaded: []
        }
    },
    methods: {
        getInforSinger(id) {
            if (!this.isHovering) {
              this.isHovering = true;
              axios
                .get("/user/singer/get-info-singer/" + id)
                .then((response) => {
                  this.singerInfo = response.data.singer;
                  this.isHiddenInforCard = false;
                  if (this.inforSingerLoaded.findIndex((x) => x.id == id) < 0) {
                    this.inforSingerLoaded.push({
                      id: id,
                      singer: this.singerInfo,
                    });
                  }
                })
                .catch(() => {
                  console.log("fail to load infor singer");
                });
            }
        },
        leaveInforCard() {
            this.isHiddenInforCard = true;
            this.singerInfo = {};
            this.isHovering = false;
        },
        checkLoad(id) {
            var index = this.inforSingerLoaded.findIndex((x) => x.id == id);
            if (index < 0) {
              this.getInforSinger(id);
            } else {
              this.singerInfo = this.inforSingerLoaded[index].singer;
              this.isHiddenInforCard = false;
            }
        }
    }
}