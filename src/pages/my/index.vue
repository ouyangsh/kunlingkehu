<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的',
  },
}
</route>
<template>
  <index v-if="suoyin == 'index'"></index>
  <shaicha v-if="suoyin == 'shaicha'"></shaicha>
  <wendang v-if="suoyin == 'wendang'"></wendang>
  <zixun v-if="suoyin == 'zixun'"></zixun>
  <shaicha v-if="suoyin == 'shaicha'"></shaicha>
  <userCenter v-if="suoyin == 'userCenter'"></userCenter>
</template>

<script lang="ts" setup>
import index from '@/pages/index/index.vue'
import shaicha from '@/pages/shaicha/index.vue'
import wendang from '@/pages/wendang/index.vue'
import zixun from '@/pages/zixun/index.vue'
import userCenter from '@/pages/user-center/index.vue'
import { useNavigationStore } from '@/store/navigation'

const navigationStore = useNavigationStore()
const suoyin = computed(() => navigationStore.suoyin)
</script>
