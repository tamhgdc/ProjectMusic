import Vue from "vue";
import Vuex from 'vuex'


import { actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'

import FixedPlay from './modules/FixedPlay'
import Menu from './modules/Menu'
import SliderTop from "./modules/SliderTop";
import JustNow from "./modules/JustNow";
import SelectedToday from "./modules/SelectedToday";
import XonerConer from "./modules/XonerConer";
import Radio from "./modules/Radio";
import NewSongEachDay from "./modules/NewSongEachDay";
import Chart from "./modules/Chart";
import LineChart from "./modules/LineChart";
import MusicChart from "./modules/MusicChart";
import Sidebar from "./modules/Sidebar";
import Schedule from "./modules/Schedule";
import Album from "./modules/Album";
import SidebarRight from "./modules/SidebarRight";
import WeeklyRank from "./modules/WeeklyRank";
import NewSongs from "./modules/NewSongs";
import Login from "./modules/Login";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        play: true,
        bgImgGlobal: '',
        srcPlay: null,
        navRight: false,
        loadingAlbum: false,
        itemSideBars: [],
        itemBelowSideBars: [],
        right: null,
        nameCom: "SidebarRight",
        showSidebarLeft: true,
        isHiddenSideBarLeft: false,
        showMenu: true,
        showFixedPlay: false,
        user: {},
        width: 218.5,
        isShow: true,
        permissions: []
    },
    getters,
    mutations,
    actions,
    modules: {
        fixedplay: FixedPlay,
        menu: Menu,
        sliderTop: SliderTop,
        justNow: JustNow,
        selectedToday: SelectedToday,
        xonerConer: XonerConer,
        radio: Radio,
        newSongEachDay: NewSongEachDay,
        chart: Chart,
        lineChart: LineChart,
        musicChart: MusicChart,
        sideBar: Sidebar,
        schedule: Schedule,
        album: Album,
        sidebarRight: SidebarRight,
        weeklyRank: WeeklyRank,
        newSongs: NewSongs,
        login: Login

    }
})