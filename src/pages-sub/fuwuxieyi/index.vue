<route lang="json5">
{
  style: {
    navigationBarTitleText: '服务协议',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="服务协议" quanjucolor="!bg-#FFFFFF">
    <div class="p30rpx text-30rpx text-#19213D">
      服务协议
      服年底时，已支付的退税金额同比大幅增长（数量上增长7.9%，金额上增长14.5%），这与纳税人提交的退税申请自身的发展情况相符。与此同时，截至目前已提交的申报总数为2413.1万份，比上一年增加了4.9%，其中67.5%（1627.9万份）有退税结果，623.9万份有应缴余额。
      就申报方式而言，“致电我们”电话申报计划仍是主要的个性化协助系统，有近112.8万份申报，比上一年增加了5.4%，占通过个性化协助完成的申报总数的57.5%。同时，在办公室完成了83.16万份申报，比上一年增加了6.6%。
      如此一来，超195.9万份申报是通过在办公室或电话方式为纳税人提供特定协助完成的，这比上一年增加了近11万份，证实了对于那些不太习惯需要个性化协助的新技术（无论是否需要前往实体办公室）的纳税人来说，这两种替代方式是被接受的。
      截至目前，超2.65万名纳税人在收到税务总局的预防性通知后更正了他们的申报，从而避免了税务总局随后可能进行的核查、利息的产生以及可能的处罚。对于这些纳税人，所得税网上申报平台本身会提供已纳入数据的补充申报建议。
      如此一来，超195.9万份申报是通过在办公室或电话方式为纳税人提供特定协助完成的，这比上一年增加了近11万份，证实了对于那些不太习惯需要个性化协助的新技术（无论是否需要前往实体办公室）的纳税人来说，这两种替代方式是被接受的。
      截至目前，超2.65万名纳税人在收到税务总局的预防性通知后更正了他们的申报，从而避免了税务总局随后可能进行的核查、利息的产生以及可能的处罚
    </div>
  </buju>
</template>

<script setup lang="js">
import { useUserStore } from '@/store'

const userStore = useUserStore()

// 用户信息
const userInfo = computed(() => userStore.userInfo)

// 页面加载时获取用户信息
onMounted(() => {
  console.log('个人信息页面加载，用户信息：', userInfo.value)
})
</script>

<style lang="scss" scoped>
.user-info-container {
}

.info-list {
  background-color: #fff;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 40rpx;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.label {
  font-size: 28rpx;
  font-weight: 400;
  color: #777;
}

.value {
  font-size: 28rpx;
  font-weight: 400;
  color: #333;
  text-align: right;
}
</style>
