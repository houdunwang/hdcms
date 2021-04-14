<template>
    <div>
        <hd-skeleton-list v-if="loading" :num="2" class="md:full border-0" />
        <div class="py-4 border-b border-gray-200" v-else v-for="topic in topics" :key="topic.id">
            <div class="row flex items-center">
                <div class="col-auto">
                    <x-user-avatar :user="topic.user" />
                </div>
                <div class="col">
                    <router-link
                        :to="{ name: 'front.topic.show', params: { id: topic.id } }"
                        class="text-base font-medium text-gray-700 opacity-80 hover:opacity-90"
                    >
                        {{ topic['title'] | truncate }}
                    </router-link>
                    <div class="text-xs text-gray-500 mt-2">
                        <span class="badge bg-red">推荐</span>
                        <a href="#" @click.prevent="space(topic.user)">{{ topic.user.name }}</a>
                        • 更新于{{ topic['updated_at'] | fromNow }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            topics: []
        }
    },
    async created() {
        this.loading = true
        this.topics = await axios.get(`topic/recommend`)
        this.loading = false
    }
}
</script>

<style></style>
