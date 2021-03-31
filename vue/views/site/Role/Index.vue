<template>
    <div>
        <hd-tab :tabs="tabs" />
        <el-alert type="info"> <i class="fa fa-info-circle" aria-hidden="true"></i> 您正在管理【 {{ site.title }}】站点 </el-alert>

        <el-table :data="roles" style="width: 100%" border class="mt-3" v-loading="loading">
            <el-table-column prop="id" label="编号" width="60"> </el-table-column>
            <el-table-column prop="title" label="角色名称" width="200"> </el-table-column>
            <el-table-column prop="name" label="角色标识" width="200"> </el-table-column>
            <el-table-column label="权限" #default="{row:role}">
                <el-tag effect="plain" size="mini" v-for="permission in role.permissions" :key="permission.id" class="mr-1">
                    <el-popover placement="top-start" width="200" trigger="hover" :content="permission.name">
                        <span slot="reference">
                            {{ permission.title }}
                        </span>
                    </el-popover>
                </el-tag>
            </el-table-column>
            <el-table-column width="250" align="center" v-slot="{ row: role }">
                <el-button-group class="text-white">
                    <el-button type="success" size="mini" @click="$router.push({ name: 'site.role.edit', query: { sid, id: role.id } })">
                        编辑
                    </el-button>
                    <el-button type="danger" size="mini" @click="del(role)">删除</el-button>
                    <el-button type="primary" size="mini" @click="$router.push({ name: 'site.permission.edit', query: { sid, rid: role.id } })">
                        权限设置
                    </el-button>
                </el-button-group>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import tabs from './tabs'
export default {
    data() {
        return {
            tabs,
            site: {},
            roles: [],
            sid: this.$route.query.sid,
            loading: true
        }
    },
    async created() {
        this.site = await this.axios.get(`site/${this.sid}`)
        this.roles = await this.axios.get(`site/${this.sid}/role`)
        this.loading = false
    },
    methods: {
        async del(role) {
            await this.$confirm('确定删除角色吗', '温馨提示')
            await this.axios.delete(`site/${this.sid}/role/${role.id}`)
            this.roles.splice(this.roles.indexOf(role), 1)
        }
    }
}
</script>

<style></style>
