<template>
    <div v-loading="loading" :class="{ 'h-screen': loading }">
        <!-- 视频播放 -->
        <div v-if="loading == false">
            <div class="bg-gray-900" v-if="video.id && video.permissions.show">
                <div class="container-xl">
                    <div id="mse" style="z-index:1000"></div>
                </div>
            </div>
            <div v-else style="background-image:linear-gradient(150deg, #2d1582, #19a0ff)">
                <div class="container-xl py-28 flex flex-col items-center justify-center">
                    <h1 class="text-white text-center text-6xl opacity-100 leading-snug">投资学习永远是最值得的</h1>
                    <h2 class="text-3xl font-weight-light text-white text-center opacity-60 mt-5  mb-6">
                        本课程为会员订制课程，请订阅会员或购买该课程
                    </h2>
                    <router-link :to="{ name: 'front.subscribe.index' }" class="btn btn-success btn-lg inline-block">
                        订阅会员观看所有视频
                    </router-link>
                </div>
            </div>
        </div>
        <!-- 视频播放END -->
        <!-- 课程标题 -->
        <div class="container-xl mt-3">
            <div class="card">
                <div class="card-body row">
                    <div class="col-12 col-md-7">
                        <h5 class="text-base pt-2 text-gray-500">
                            {{ video.title }}
                        </h5>
                        <router-link :to="{ name: 'front.lesson.show', params: { id: lesson.id } }" class="text-sm font-weight-light pt-2 text-gray-500">
                            <i aria-hidden="true" class="fa fa-folder-o"></i>
                            <i class="far fa-folder-open"></i> {{ lesson.title }}
                        </router-link>
                    </div>
                    <div class="col-12 col-md-5 mt-2 mt-md-0 d-flex justify-content-md-end justify-content-start flex-wrap">
                        <div class="btn-group align-items-center mr-1">
                            <router-link :to="{ name: 'front.video.show', params: { id: prev.id } }" class="btn btn-outline-info" v-if="prev">上集</router-link>
                            <router-link :to="{ name: 'front.video.show', params: { id: next.id } }" class="btn btn-outline-success" v-if="next">
                                下集
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 课程标题END -->
        <!-- 评论与课程列表 -->
        <div class="container-xl mt-3 md:flex">
            <div class="md:w-9/12 md:mr-5 mb-5 order-2 md:order-1">
                <comment-list :key="$route.params.id" :action-list="`comment/video/${$route.params.id}`" :action-post="`comment/video/${$route.params.id}`" />
            </div>
            <div class="md:w-3/12 order-1 md:order-2">
                <div class="card">
                    <div class="card-header h-14">
                        课程列表
                    </div>
                    <div class="card-body">
                        <div v-for="v in lesson.videos" :key="v.id" class="py-4 border-b border-gray-200 flex justify-between">
                            <router-link
                                :to="{ name: 'front.video.show', params: { id: v.id } }"
                                :class="{ 'text-blue-800 font-bold': video.id == v.id }"
                                class="text-base text-gray-500 font-normal hover:text-gray-900"
                            >
                                {{ v['title'] | truncate }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 评论与课程列表END -->
    </div>
</template>

<script>
import Player from 'xgplayer'
export default {
    route: { path: `video/:id/show/:comment_id?`, meta: { auth: true } },
    beforeRouteLeave(to, from, next) {
        this.player.destroy(true)
        next()
    },
    data() {
        return {
            loading: true,
            player: null,
            video: {},
            lesson: { videos: [] }
        }
    },
    computed: {
        currentIndex() {
            return this.lesson.videos.findIndex(l => l.id == this.video.id)
        },
        next() {
            return this.lesson.videos[this.currentIndex + 1]
        },
        prev() {
            return this.lesson.videos[this.currentIndex - 1]
        }
    },
    watch: {
        $route(to) {
            this.load(to.params.id, true)
            console.log(333333)
        }
    },
    created() {
        this.load(this.$route.params.id)
    },
    methods: {
        async load(id) {
            this.video = await this.axios.get(`video/${id}`)
            this.lesson = this.video.lesson
            this.loading = false

            if (this.player) this.player.destroy(true)
            setTimeout(() => {
                this.player = new Player({
                    id: 'mse',
                    url: this.video.path,
                    autoplay: this.player,
                    fluid: true,
                    poster: '/images/poster.jpeg',
                    playbackRate: [0.5, 0.75, 1, 1.5, 2]
                })
                //没有评论参数时滚动顶部播放器位置
                if (!this.$route.params.comment_id) {
                    document.documentElement.scroll({ top: 0, behavior: 'smooth' })
                }
            })
        }
    }
}
</script>

<style></style>
