<template>
    <div>
        <div class="mb-3">
            <el-radio-group v-model="material.wechat_id" size="mini" @change="load(1)">
                <el-radio-button :label="wechat.id" v-for="wechat in wechats" :key="wechat.id">
                    {{ wechat.title }}
                </el-radio-button>
            </el-radio-group>
        </div>
        <!-- 素材类型选择按钮 -->
        <div v-if="wechat">
            <el-radio-group v-model="material.type" size="mini" v-if="showTypeButton" class="mt-2 block" @change="load(1)">
                <el-radio-button :label="t.type" v-for="(t, index) in types" :key="index">
                    {{ t.title }}
                </el-radio-button>
            </el-radio-group>
            <el-radio-group
                v-model="material.duration"
                size="mini"
                @click="load"
                v-if="material.type != 'news' && showDurationButton"
                @change="load(1)"
                class="mt-2 block"
            >
                <el-radio-button label="short">临时素材</el-radio-button>
                <el-radio-button label="long">永久素材</el-radio-button>
            </el-radio-group>
            <el-table :data="list.data" border stripe class="mt-3" v-loading="loading">
                <el-table-column v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width"> </el-table-column>
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
            <el-dialog title="素材管理" :visible.sync="showDialog" width="60%" top="1rem" :append-to-body="true">
                <component
                    class="mt-3"
                    :is="component"
                    :material="material"
                    :wechat="wechat"
                    :showDurationButton="showDurationButton"
                    :key="material.key"
                    @onSubmit="onSubmit"
                />
            </el-dialog>
        </div>
    </div>
</template>

<script>
//素材类型
const types = [
    { title: '图片素材', type: 'image' },
    { title: '语音素材', type: 'voice' },
    { title: '视频素材', type: 'video' },
    { title: '缩略图素材', type: 'thumb' },
    { title: '图文素材', type: 'news' }
]
const columns = [
    { label: '编号', id: 'id', width: 60 },
    { label: '素材说明', id: 'title' }
]
import material from './material'
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
        showWeChatButton: { type: Boolean, default: true },
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
            //当前公众号编号
            wid: this.wechat_id,
            //素材类型
            types,
            //表格列表
            columns,
            //素材列表
            list: {},
            //显示对话框
            showDialog: false,
            //编辑的数据
            material: _.cloneDeep(material)
        }
    },
    created() {
        this.material.type = this.materialType
        this.material.duration = this.durationType
        this.loadWechats()
    },
    computed: {
        //当前公众号
        wechat() {
            return this.wechats.find(w => w.id == this.material.wechat_id)
        },
        //素材编辑组件
        component() {
            return `hdWechatMaterial${_.upperFirst(this.material.type)}`
        }
    },
    methods: {
        //加载公众号列表
        async loadWechats() {
            this.wechats = await axios.get(`/api/site/${this.site_id}/wechat`)
            if (!this.material.wechat_id && this.wechats) this.material.wechat_id = this.wechats[0].id
            this.load()
        },
        //加载素材
        async load(page = 1) {
            this.loading = true
            const material = this.material
            this.list = await axios.get(
                `/api/site/${this.site_id}/wechat/${material.wechat_id}/material?type=${material.type}&duration=${material.duration}&page=${page}`
            )
            this.loading = false
        },
        //初始化素材表单
        initMaterial() {
            this.material = _.cloneDeep(this.material)
            this.material.content = []
            this.material.description = { title: '', introduction: '' }
        },
        //编辑素材
        edit(material) {
            this.material = _.cloneDeep(material)
            this.showDialog = true
        },
        //添加素材
        add() {
            this.initMaterial()
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
            this.initMaterial()
        }
    }
}
</script>

<style></style>
