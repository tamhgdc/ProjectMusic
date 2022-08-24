import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/main/Main'
import MusicChart from '../components/musicchart/MusicChart'
import Radio from '../components/radio/Radio'
import Album from '../components/album/Album'
import NewSongs from '../components/newsongs/NewSongs'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import PublicChat from '../components/chat/PublicChat'
import SongAdmin from '../components/admin/song/Song'
import ListSong from '../components/admin/song/ListSong'
import CreateSong from '../components/admin/song/CreateSong'
import DashBoard from '../components/admin/DashBoard'
import AlbumAdmin from '../components/admin/album/Album'
import ListAlbum from '../components/admin/album/ListAlbum'
import CreateAlbum from '../components/admin/album/CreateAlbum'
import SetupAccount from '../components/admin/setup_account/SetupAccount'
import ListGenre from '../components/admin/genre/ListGenre'
import CreateGenre from '../components/admin/genre/CreateGenre'
import GenreAdmin from '../components/admin/genre/Genre'
import UserAdmin from '../components/admin/user/UserAdmin'
import ListSinger from '../components/admin/user/ListSinger'
import ListUser from '../components/admin/user/ListUser'
import ListComposer from '../components/admin/user/ListComposer'
import CreatePlaylist from '../components/playlist/CreatePlaylist'
import PlaylistHome from '../components/playlist/Playlist'
import ListPlaylist from '../components/playlist/ListPlaylist'
import SlideAdmin from '../components/admin/slide/Slide'
import ListSlide from '../components/admin/slide/ListSlide'
import CreateSlide from '../components/admin/slide/CreateSlide'
import RoleAdmin from '../components/admin/role/Role'
import ListRole from '../components/admin/role/ListRole'
import CreateRole from '../components/admin/role/CreateRole'
import SetupRoleAdmin from '../components/admin/setup_role/SetupRole'
import CreateUserRole from '../components/admin/setup_role/CreateUserRole'
import ListUserRole from '../components/admin/setup_role/ListUserRole'
import ShowMV from '../components/mv/ShowMV'
import MV from '../components/mv/MV'
import RouteMV from '../components/mv/RouteMV'
import Post from '../components/post/Post'
import ListPost from '../components/post/ListPost'
import Category from '../components/category/Category'
import ListCategory from '../components/category/ListCategory'
// import Top100 from '../components/top100/Top100'
import Individual from '../components/individual/Individual'
import MyMusicSong from '../components/individual/MyMusicSong'
import MyMusicPlaylist from '../components/individual/MyMusicPlaylist'
import MyMusicAlbum from '../components/individual/MyMusicAlbum'
import MyMusicMv from '../components/individual/MyMusicMv'


Vue.use(VueRouter)

export const routes = [
    {
        path: '/',
        name: 'homepage',
        component: Main
    },
    {
        path: '/music-chart',
        name: 'music-chart',
        component: MusicChart
    },
    {
        path: '/radio',
        name: 'radio',
        component: Radio
    },
    {
        path: '/playlist',
        component: PlaylistHome, children: [
            {path: '', name: 'playlist-list', component: ListPlaylist},
            {path: 'singer/:singer_id/genre/:genre_id', name: 'playlist-genre-details', component: Album},
            {path: 'create', name: 'playlist-create', component: CreatePlaylist},
            {path: 'edit/:id', name: 'playlist-edit', component: CreatePlaylist},
            {path: ':id', name: 'playlist-details', component: Album}
        ]
    },
    {
        path: '/album',
        name: 'album',
        component: Album, children: [
            {path: ':id', name: 'album-details', component: Album}
        ]
    },
    {
        path: '/new-songs',
        name: 'newsongs',
        component: NewSongs
    },
    {
        path: '/mymusic',
        component: Individual,
        children: [
            {
                path: '',
                name: "mymusic-song",
                component: MyMusicSong,
            },
            {
                path: 'playlist',
                name: "mymusic-playlist",
                component: MyMusicPlaylist,
            },
            {
                path: 'album',
                name: "mymusic-album",
                component: MyMusicAlbum,
            },
            {
                path: 'mv',
                name: "mymusic-mv",
                component: MyMusicMv,
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/public-chat/:id',
        name: "public-chat",
        component: PublicChat
    },
    {
        path: '/top-100',
        name: "top-100",
        component: NewSongs
    },
    {
        path: '/mv',
        component: RouteMV,
        children: [
            {
                path: '',
                name: "mv",
                component: MV,
            },
            {
                path: ':id',
                name: "show-mv",
                component: ShowMV,
            }
        ]
    },
    {
        path: '/post',
        component: Post,
        children: [
            {
                path: '',
                name: "post",
                component: ListPost,
            },
            // {
            //     path: ':id',
            //     name: "show-mv",
            //     component: ShowMV,
            // }
        ]
    },
    {
        path: '/hub',
        component: Category,
        children: [
            {
                path: '',
                name: "category",
                component: ListCategory,
            },
            // {
            //     path: ':id',
            //     name: "show-mv",
            //     component: ShowMV,
            // }
        ]
    },
    {
        path: '/admin',
        name: 'dashboard',
        component: DashBoard,
        children: [
            { 
                path: 'song', 
                component: SongAdmin,
                children: [
                    {
                        path: '', 
                        name: 'list-song', 
                        component: ListSong
                    },
                    {
                        path: 'create', 
                        name: 'create-song', 
                        component: CreateSong
                    },
                    {
                        path: 'edit/:id', 
                        name: 'edit-song', 
                        component: CreateSong
                    }
                ] 
            },
            {
                path: 'album', 
                component: AlbumAdmin,
                children: [
                    {
                        path: '', 
                        name: 'list-album', 
                        component: ListAlbum
                    },
                    {
                        path: 'create', 
                        name: 'create-album', 
                        component: CreateAlbum
                    },
                    {
                        path: 'edit/:id', 
                        name: 'edit-album', 
                        component: CreateAlbum
                    }
                ] 
            },
            {
                path: 'genre', 
                component: GenreAdmin,
                children: [
                    {
                        path: '', 
                        name: 'list-genre', 
                        component: ListGenre
                    },
                    {
                        path: 'create', 
                        name: 'create-genre', 
                        component: CreateGenre
                    },
                    {
                        path: 'edit/:id', 
                        name: 'edit-genre', 
                        component: CreateGenre
                    }
                ] 
            },
            {
                path: 'setup-account',
                name: 'setup-account',
                component: SetupAccount
            },
            {
                path: 'user', 
                component: UserAdmin,
                children: [
                    {
                        path: '', 
                        name: 'list-user', 
                        component: ListUser
                    },
                    {
                        path: 'singer', 
                        name: 'list-singer', 
                        component: ListSinger
                    },
                    {
                        path: 'composer', 
                        name: 'list-composer', 
                        component: ListComposer
                    }
                ] 
            },
            {
                path: 'slide', 
                component: SlideAdmin,
                children: [
                    {
                        path: '', 
                        name: 'list-slide', 
                        component: ListSlide
                    },
                    {
                        path: 'create', 
                        name: 'create-slide', 
                        component: CreateSlide
                    },
                    {
                        path: 'edit/:id', 
                        name: 'edit-slide', 
                        component: CreateSlide
                    }
                ] 
            },
            {
                path: 'role', 
                component: RoleAdmin,
                children: [
                    {
                        path: '', 
                        name: 'list-role', 
                        component: ListRole
                    },
                    {
                        path: 'create', 
                        name: 'create-role', 
                        component: CreateRole
                    },
                    {
                        path: 'edit/:id', 
                        name: 'edit-role', 
                        component: CreateRole
                    }
                ] 
            },
            {
                path: 'setup-role', 
                component: SetupRoleAdmin,
                children: [
                    {
                        path: '', 
                        name: 'list-user-roles', 
                        component: ListUserRole
                    },
                    {
                        path: 'create', 
                        name: 'create-user-roles', 
                        component: CreateUserRole
                    },
                    {
                        path: 'edit/:id', 
                        name: 'edit-user-roles', 
                        component: CreateUserRole
                    }
                ] 
            }
        ]
    },
    {
        path: '/:catchAll(.*)*',
        name: "PageNotFound",
        component: Main,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
  
export default router
