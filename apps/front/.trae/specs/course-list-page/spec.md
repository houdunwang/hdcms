# 课程列表页重构规格说明

## Why
当前的课程列表页面 (`lesson.tsx`) 视觉设计较为基础，缺乏品牌识别度和视觉层次感。用户需要一个更具吸引力的课程展示页面，能够突出课程特色、引导用户浏览并提升学习体验。

## What Changes
- 重新设计课程卡片组件，增强视觉层次和信息呈现
- 优化标签筛选交互，改用更具设计感的标签组
- 引入品牌色彩体系和字体系统
- 添加动效增强用户体验（卡片悬停、页面加载动画）
- 优化移动端响应式布局
- 使用 shadcn-ui 组件重构现有代码

## Impact
- Affected specs: 课程列表页、课程筛选功能
- Affected code: `/src/routes/_front/lesson.tsx`

## ADDED Requirements
### Requirement: 课程卡片新设计
系统 SHALL 提供更具视觉冲击力的课程卡片展示

#### Scenario: 课程卡片展示
- **WHEN** 页面加载时
- **THEN** 课程卡片以网格形式展示，每张卡片包含封面图、标题、描述、标签、时长、章节数等信息

#### Scenario: 卡片悬停效果
- **WHEN** 用户鼠标悬停在课程卡片上
- **THEN** 卡片产生微妙的提升效果和阴影变化，增强交互反馈

### Requirement: 标签筛选优化
系统 SHALL 提供直观的课程分类筛选功能

#### Scenario: 标签切换
- **WHEN** 用户点击不同分类标签
- **THEN** 筛选对应分类的课程，标签状态实时更新

## MODIFIED Requirements
### Requirement: 页面布局
原布局较为简单，需要增强视觉层次：
- 页面顶部增加更具设计感的标题区域
- 课程卡片使用更大的封面图比例
- 增加章节预览下拉菜单的视觉权重

## REMOVED Requirements
### Requirement: 旧卡片样式
**Reason**: 设计过时，缺乏品牌特色
**Migration**: 使用新设计的卡片组件替换
