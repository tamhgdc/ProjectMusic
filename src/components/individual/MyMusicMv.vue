<template>
    <div>
        <v-row class="py-5">
            <v-col sm="12" class="pa-0">
                <v-list color="transparent" class="pa-0">
                    <v-list-item-group active-class="border-active" mandatory class="d-flex rv-min-height-indi">
                        <v-list-item class="rv-width mr-5 d-flex">
                            <v-list-item-content class="choose-header-indi-level2" @click="choose(1)">
                                Yêu thích
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="rv-width mr-5 d-flex">
                            <v-list-item-content class="choose-header-indi-level2" @click="choose(2)">
                                Đã tải lên
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { individualMixin } from "@/mixin/IndividualMixin.js";
export default {
    mixins: [individualMixin],
    data() {
        return{

        }
    },
    methods: {

    }
}
</script>
