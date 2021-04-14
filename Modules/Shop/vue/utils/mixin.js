const mixin = {
    methods: {
        //访问用户空间
        space(user) {
            this.$router.push({ name: 'space.topic', params: { id: user.id } })
        }
    }
}

export default mixin
