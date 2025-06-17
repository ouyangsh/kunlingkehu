<template>
  <view class="function-grid flex-row">
    <view
      v-for="(item, index) in items"
      :key="index"
      class="function-item flex-col justify-center items-center"
      @click="handleItemClick(item, index)"
    >
      <span
        class="icon-text"
        :class="['font_family', item.icon]"
        :style="{ color: item.color }"
      ></span>
      <text class="function-label">{{ item.text }}</text>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['itemClick'])

const handleItemClick = (item, index) => {
  emit('itemClick', { item, index })
}
</script>

<style lang="scss" scoped>
@import '../../common/common.css';

.function-grid {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.function-item {
  flex: 1;
  padding: 1rem 0;
  margin: 0 0.3rem;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.1rem 0.5rem 0 rgb(146 154 169 / 10%);

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
}

.icon-text {
  font-size: 2rem;
}

.function-label {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  line-height: 1.2;
  color: #19213d;
  text-align: center;
  white-space: nowrap;
}
</style>
