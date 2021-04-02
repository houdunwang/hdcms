<template>
    <div class="home">
        <div class="mt-5">
            <h2 class="text-gray-600 opacity-90 text-center pb-3 text-xl">阅读协议</h2>
            <div class="h-80 overflow-y-auto text-gray-800 opacity-80 border p-3 rounded-md copyright leading-7">
                该类设置一个元素，以匹配当前断点。如果您更愿意为固定的屏幕尺寸进行设计，而不是尝试适应全流畅的视场，这非常有用。containermax-widthmin-width
                请注意，与其他框架中可能使用的容器不同，Tailwind 的容器不会自动中心，也没有任何内置的水平衬垫。 要以容器为中心，请使用实用程序：mx-auto
                就在一年多前，我们发布了英雄的第一个版本，这是一组美丽的UI图标，我们设计与尾风UI。从那时起，我们增加了数以吨计的新图标，并设计和推出了一个专门的网络体验。
                今天，我们很高兴终于发布了英雄v1.0，其中包括超过450+免费图标在两种风格，官方反应和Vue库，和图马资产。
                该类设置一个元素，以匹配当前断点。如果您更愿意为固定的屏幕尺寸进行设计，而不是尝试适应全流畅的视场，这非常有用。containermax-widthmin-width
                请注意，与其他框架中可能使用的容器不同，Tailwind 的容器不会自动中心，也没有任何内置的水平衬垫。 要以容器为中心，请使用实用程序：mx-auto
                就在一年多前，我们发布了英雄的第一个版本，这是一组美丽的UI图标，我们设计与尾风UI。从那时起，我们增加了数以吨计的新图标，并设计和推出了一个专门的网络体验。
                今天，我们很高兴终于发布了英雄v1.0，其中包括超过450+免费图标在两种风格，官方反应和Vue库，和图马资产。
                该类设置一个元素，以匹配当前断点。如果您更愿意为固定的屏幕尺寸进行设计，而不是尝试适应全流畅的视场，这非常有用。containermax-widthmin-width
                请注意，与其他框架中可能使用的容器不同，Tailwind 的容器不会自动中心，也没有任何内置的水平衬垫。 要以容器为中心，请使用实用程序：mx-auto
                就在一年多前，我们发布了英雄的第一个版本，这是一组美丽的UI图标，我们设计与尾风UI。从那时起，我们增加了数以吨计的新图标，并设计和推出了一个专门的网络体验。
                今天，我们很高兴终于发布了英雄v1.0，其中包括超过450+免费图标在两种风格，官方反应和Vue库，和图马资产。
                该类设置一个元素，以匹配当前断点。如果您更愿意为固定的屏幕尺寸进行设计，而不是尝试适应全流畅的视场，这非常有用。containermax-widthmin-width
                请注意，与其他框架中可能使用的容器不同，Tailwind 的容器不会自动中心，也没有任何内置的水平衬垫。 要以容器为中心，请使用实用程序：mx-auto
                就在一年多前，我们发布了英雄的第一个版本，这是一组美丽的UI图标，我们设计与尾风UI。从那时起，我们增加了数以吨计的新图标，并设计和推出了一个专门的网络体验。
                今天，我们很高兴终于发布了英雄v1.0，其中包括超过450+免费图标在两种风格，官方反应和Vue库，和图马资产。
            </div>
            <div class="flex justify-center mt-5">
                <el-checkbox v-model="accept">接受协议</el-checkbox>
            </div>
            <div class="flex justify-center mt-10 mb-5">
                <el-button type="success" size="default" @click="$router.push({ name: 'welcome' })">上一步</el-button>
                <el-button type="primary" size="default" @click="$router.push({ name: 'env' })" v-if="accept">下一步</el-button>
                <el-button plain disabled v-else>下一步</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    created() {
        this.$store.state.step = 1
    },
    data() {
        return {
            accept: false
        }
    }
}
</script>

<style>
.copyright {
    text-indent: 2rem;
}
</style>
