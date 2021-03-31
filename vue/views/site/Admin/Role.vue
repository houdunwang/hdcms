<template>
    <div v-loading="loading">
        <hd-tab :tabs="tabs" />
        <el-alert type="info" effect="light" closable> 设置管理员【{{ admin.name }}】的角色 </el-alert>
        <el-card shadow="always" :body-style="{ padding: '20px' }" class="mt-3">
            <div slot="header">角色设置</div>
            <el-checkbox-group v-model="form.role">
                <el-checkbox :label="role.name" v-for="(role, index) in roles" :key="index">
                    {{ role.title }}
                </el-checkbox>
            </el-checkbox-group>
        </el-card>
        <el-button :disabled="!form.role" type="primary" size="default" @click="onSubmit" class="mt-3">保存提交</el-button>
    </div>
</template>

<script>
import tabs from './tabs'
export default {
    data() {
        return {
            admin: {},
            tabs,
            sid: this.$route.query.sid,
            id: this.$route.query.id,
            roles: [],
            form: { role: [] },
            loading: true
        }
    },
    async created() {
        this.admin = await this.axios.get(`user/${this.id}`)
        this.roles = await this.axios.get(`site/${this.sid}/role`)
        this.loading = false
    },
    methods: {
        async onSubmit() {
            await this.axios.put(`site/${this.sid}/admin/${this.id}/role`, this.form)
            this.$router.push({ name: 'site.admin.index', query: { sid: this.sid } })
        }
    }
}
</script>

<style></style>
