<template>
    <div>
        <el-radio-group v-model="wid" v-if="showWechatButton" size="mini" @change="load(1)">
            <el-radio-button :label="wechat.id" v-for="wechat in wechats" :key="wechat.id">
                {{ wechat.title }}
            </el-radio-button>
        </el-radio-group>
        <!-- 素材类型选择按钮 -->
        <div v-if="wid">
            <el-radio-group v-model="type" size="mini" v-if="showTypeButton" class="mt-2 block" @change="load(1)">
                <el-radio-button :label="t.type" v-for="(t, index) in types" :key="index">
                    {{ t.title }}
                </el-radio-button>
            </el-radio-group>
            <el-radio-group v-model="duration" size="mini" v-if="type != 'news' && showDurationButton" @change="load(1)" class="mt-2 block">
                <el-radio-button label="short">临时素材</el-radio-button>
                <el-radio-button label="long">永久素材</el-radio-button>
            </el-radio-group>
            <el-table :data="list.data" border stripe class="mt-3" v-loading="loading">
                <el-table-column v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width"> </el-table-column>
                <el-table-column label="模块" width="150" prop="duration" #default="{ row: material }">
                    {{ material.module && material.module.title }}
                </el-table-column>
                <el-table-column label="素材预览" width="200" #default="{ row: material }">
                    <el-popover placement="top" width="200" trigger="hover" v-if="material.type == 'image' || material.type == 'thumb'">
                        <el-image :src="material.file" fit="cover"></el-image>
                        <el-image slot="reference" :src="material.file" fit="cover" class="w-10 h-10"></el-image>
                    </el-popover>
                    <audio controls preload="auto" class="relative outline-none w-full h-10" v-else-if="material.type == 'voice'">
                        <source :src="material.file" type="audio/mp3" />
                    </audio>
                    <el-popover placement="top" width="500" trigger="hover" v-else-if="material.type == 'video'">
                        <video muted controls width="100%" class="outline-none">
                            <source :src="material.file" type="video/mp4" />
                        </video>
                        <i slot="reference" class="fas fa-video w-10 h-10 text-xl"></i>
                    </el-popover>
                </el-table-column>
                <el-table-column label="保存时间" width="150" prop="duration" #default="{ row: material }">
                    {{ material.duration == 'short' ? '临时素材' : '永久素材' }}
                </el-table-column>
                <el-table-column label="创建时间" width="150" prop="created_at" #default="{ row: material }">
                    {{ material.created_at | fromNow }}
                </el-table-column>
                <el-table-column width="190" #default="{ row: material }" align="center">
                    <el-button-group>
                        <el-button type="success" size="mini" @click="edit(material)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="del(material)">删除</el-button>
                        <slot :material="material"> </slot>
                    </el-button-group>
                </el-table-column>
            </el-table>
            <el-pagination
                v-if="list.meta"
                class="mt-3 block"
                :current-page="list.meta.current_page"
                @current-change="load"
                :page-size="10"
                :total="list.meta.total"
                :hide-on-single-page="true"
                background
            >
            </el-pagination>
            <!-- 管理素材 -->
            <el-button type="danger" size="mini" @click="add()" class="mt-3" v-if="showAddButton">添加素材</el-button>
            <el-dialog title="素材管理" :visible.sync="showDialog" width="60%" top="1rem" :append-to-body="true" :close-on-click-modal="false">
                <component
                    :is="component"
                    :material="material"
                    :site_id="site_id"
                    :wechat_id="wid"
                    :module_id="module_id"
                    :durationType="duration"
                    :showDurationButton="showDurationButton"
                    :key="showDialog"
                    class="mt-3"
                    @onSubmit="onSubmit"
                />
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { types, columns } from './data'
export default {
    props: {
        //站点编号
        site_id: { required: true },
        //微信编号
        wechat_id: { default: null },
        //模块编号
        module_id: { default: null },
        //素材类型
        materialType: { type: String, default: 'image' },
        //临时或永久
        durationType: { type: String, default: 'short' },
        //公众号选择按钮
        showWechatButton: { type: Boolean, default: true },
        //素材类型选择按钮
        showTypeButton: { type: Boolean, default: true },
        //素材临时、永久素材选择按钮
        showDurationButton: { type: Boolean, default: true },
        //是否显示添加按钮
        showAddButton: { type: Boolean, default: true }
    },
    data() {
        return {
            loading: false,
            //公众号集合
            wechats: [],
            //选择的微信
            wid: this.wechat_id,
            //素材类型
            types,
            //选择的类型
            type: this.materialType,
            //素材时效
            duration: this.durationType,
            //表格列表
            columns,
            //素材列表
            list: {},
            //显示对话框
            showDialog: false,
            //编辑的数据
            material: null
        }
    },
    async created() {
        await this.loadWechats()
        this.load()
    },
    computed: {
        //素材编辑组件
        component() {
            return `hdWechatMaterial${_.upperFirst(this.type)}`
        }
    },
    methods: {
        //加载公众号列表
        async loadWechats() {
            this.wechats = await axios.get(`/api/site/${this.site_id}/wechat`)
            if (!this.wid && this.wechats.length) {
                this.wid = this.wechats[0].id
            }
        },
        //加载素材
        async load(page = 1) {
            this.loading = true
            const url = `/api/site/${this.site_id}/wechat/${this.wid}/material?type=${this.type}&duration=${this.duration}&page=${page}&module=${this.module_id}`
            this.list = await axios.get(url)
            this.loading = false
        },
        //编辑素材
        edit(material) {
            this.material = material
            this.showDialog = true
        },
        //添加素材
        add() {
            this.material = null
            this.showDialog = true
        },
        async del(material) {
            this.$confirm(`确定删除【${material.title}】吗？`, '温馨提示').then(async _ => {
                await axios.delete(`/api/site/${this.site_id}/wechat/${this.wid}/material/${material.id}`)
                this.load()
            })
        },
        //组件提交回调
        onSubmit() {
            this.load()
            this.showDialog = false
        }
    }
}
</script>

<style></style>
