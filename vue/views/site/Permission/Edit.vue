<template>
    <div v-loading="loading">
        <hd-tab :tabs="tabs" />
        <el-alert type="info" class="mb-3"> 你正在设置「{{ site.title }}」站点的「{{ role.title }}」角色的权限 </el-alert>
        <el-radio-group v-model="mid" size="mini" class="mb-3">
            <el-radio-button :label="index" v-for="(module, index) in modules" :key="module.id">
                {{ module.title }}
            </el-radio-button>
        </el-radio-group>
        <div class="mb-5 shadow-sm border rounded-sm" v-for="(module, index) in modules" :key="module.id" v-show="mid == index">
            <!-- <div class="p-3 text-base">
                <el-button size="mini" @click="module.show = !module.show"> {{ module.title }}</el-button>
            </div> -->
            <div v-if="module.show" class="p-3 pt-3">
                <div v-for="(permission, index) in module.permissions" :key="index">
                    <div class="border-gray-100 text-gray-600 font-bold text-sm pt-3 pb-2">{{ permission.title }}</div>
                    <div class="grid grid-cols-4 text-sm border-b pb-3 ">
                        <div v-for="(rule, i) in permission.rules" :key="i" class="py-1">
                            <el-checkbox-group v-model="form.permissions">
                                <el-checkbox :label="rule.permission_name">
                                    <el-popover placement="top-start" title="权限标识" width="200" trigger="hover" :content="rule.name">
                                        <span slot="reference">
                                            <span class="font-normal">{{ rule.title }}</span>
                                            <el-tag type="info" size="mini" class="opacity-75">{{ rule.name }}</el-tag>
                                        </span>
                                    </el-popover>
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-button type="primary" size="default" @click="onSubmit">保存提交</el-button>
    </div>
</template>

<script>
import tabs from './tabs'
export default {
    data() {
        return {
            tabs,
            modules: [],
            site: {},
            role: {},
            form: { permissions: [] },
            loading: true,
            //当前菜单组编号
            mid: 0
        }
    },
    async created() {
        this.loading = true
        this.site = await axios.get(`site/${this.$route.query.sid}`)
        const modules = await axios.get(`permission/site/${this.site.id}/rules`)
        this.modules = modules.map(m => {
            m.show = true
            return m
        })
        this.role = await axios.get(`site/${this.site.id}/role/${this.$route.query.rid}`)
        //角色已经存在权限
        this.form.permissions = this.role.permissions.map(p => p.name)
        this.loading = false
    },
    methods: {
        async onSubmit() {
            await this.axios.put(`permission/site/${this.site.id}/role/${this.role.id}`, this.form)
            this.$router.push({ name: `site.role.index`, query: { sid: this.site.id } })
        }
    }
}
</script>

<style></style>
