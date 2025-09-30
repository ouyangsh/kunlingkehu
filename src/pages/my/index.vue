<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的',
  },
}
</route>
<template>
  <index v-show="suoyin == 'index'"></index>
  <shaicha v-show="suoyin == 'shaicha'"></shaicha>
  <wendang v-show="suoyin == 'wendang'"></wendang>
  <zixun v-show="suoyin == 'zixun'"></zixun>
  <shaicha v-show="suoyin == 'shaicha'"></shaicha>
  <userCenter v-show="suoyin == 'userCenter'"></userCenter>
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
