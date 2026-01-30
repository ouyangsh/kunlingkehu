import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'
import { handleJoinRequestAPI } from '@/service/signin'

export const useGlobalStore = defineStore('global', () => {
  const incomingRequest = ref(null)
  const showApprovePopup = ref(false)
  const showLogoutPopup = ref(false)
  const hasUnreadMessages = ref(false)
  const refreshId = ref(0)
  const socketTask = ref(null)

  const triggerRefresh = () => {
    refreshId.value++
  }
  let socketReconnectTimer = null

  const userStore = useUserStore()

  const connectWebSocket = () => {
    if (socketTask.value) return
    const baseUrl = import.meta.env.VITE_SERVER_BASEURL || 'https://119.23.182.252.sslip.io'
    const token = userStore.userInfo.token
    if (!token) return

    const wsUrl = baseUrl.replace(/^http/, 'ws') + `/ws/${token}/`
    console.log('Global WebSocket Connecting:', wsUrl)

    socketTask.value = uni.connectSocket({
      url: wsUrl,
      fail: (err) => {
        console.error('WebSocket connection failed', err)
        socketTask.value = null
        reconnectWebSocket()
      },
    })

    socketTask.value.onOpen(() => {
      console.log('Global WebSocket Open')
      if (socketReconnectTimer) {
        clearTimeout(socketReconnectTimer)
        socketReconnectTimer = null
      }
    })

    socketTask.value.onMessage((res) => {
      try {
        const data = JSON.parse(res.data)

        // 1. Join Request Notification
        if (data.type === 'join_request') {
          console.log('Received global join request', data)
          incomingRequest.value = data
          showApprovePopup.value = true
        }

        // 2. Refresh notification status
        if (data.type === 'new_notification') {
          hasUnreadMessages.value = true
          // 此处不再仅靠 emit，也会触发全局信号
          if (data.content) {
            uni.showToast({ title: data.content, icon: 'none', duration: 3000 })
          }
        }

        // 所有 WebSocket 消息都视作需要同步的信号
        triggerRefresh()
      } catch (e) {
        console.error('WebSocket parse error', e)
      }
    })

    socketTask.value.onError(() => {
      socketTask.value = null
      reconnectWebSocket()
    })

    socketTask.value.onClose(() => {
      socketTask.value = null
      reconnectWebSocket()
    })
  }

  const reconnectWebSocket = () => {
    if (socketReconnectTimer) return
    if (!userStore.isLogined) return
    socketReconnectTimer = setTimeout(() => {
      socketReconnectTimer = null
      connectWebSocket()
    }, 5000)
  }

  const closeWebSocket = () => {
    if (socketReconnectTimer) clearTimeout(socketReconnectTimer)
    if (socketTask.value) {
      socketTask.value.close()
      socketTask.value = null
    }
  }

  const processRequest = async (action) => {
    if (!incomingRequest.value) return
    try {
      uni.showLoading({ title: '处理中...' })
      await handleJoinRequestAPI({
        request_id: incomingRequest.value.request_id,
        action,
      })
      uni.showToast({ title: action === 'approve' ? '已同意' : '已拒绝', icon: 'none' })
      showApprovePopup.value = false
      incomingRequest.value = null
      triggerRefresh()
    } catch (e) {
      uni.showToast({ title: e.msg || '操作失败', icon: 'none' })
    } finally {
      uni.hideLoading()
    }
  }

  return {
    incomingRequest,
    showApprovePopup,
    showLogoutPopup,
    hasUnreadMessages,
    refreshId,
    triggerRefresh,
    connectWebSocket,
    closeWebSocket,
    processRequest,
  }
})
