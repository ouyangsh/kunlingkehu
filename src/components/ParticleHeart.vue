<template>
  <view class="particle-heart-container" @touchstart="handleTouch" @touchmove="handleTouch" @click="handleHeartClick">
    <canvas 
      :canvas-id="canvasId" 
      :id="canvasId" 
      class="heart-canvas"
      :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
    ></canvas>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, getCurrentInstance, watch } from 'vue'

const props = defineProps({
  active: { type: Boolean, default: true },
  memberCount: { type: Number, default: 0 },
  checkedCount: { type: Number, default: 0 },
  isMeChecked: { type: Boolean, default: false }
})

const emit = defineEmits(['heartClick'])

const instance = getCurrentInstance()
const canvasId = `heartCanvas_${Math.random().toString(36).substr(2, 9)}`

const canvasWidth = ref(300)
const canvasHeight = ref(300)
let ctx = null
let animationFrame = null
let particles = []
let isDestroyed = false

// Watch active prop to restart animation when it becomes true
watch(() => props.active, (newVal) => {
  if (ctx && !isDestroyed) {
    if (animationFrame) {
      clearTimeout(animationFrame)
    }
    // Always draw once when active state changes to ensure visibility
    animate()
  }
})

// Particle Class
class Particle {
  constructor(x, y, targetX, targetY) {
    const colors = [
        'rgba(255, 105, 180, ', // HotPink
        'rgba(255, 20, 147, ',  // DeepPink
        'rgba(219, 112, 147, ', // PaleVioletRed
        'rgba(255, 182, 193, ', // LightPink
        'rgba(255, 133, 192, '  // Custom Pink
    ]
    this.x = Math.random() * canvasWidth.value
    this.y = Math.random() * canvasHeight.value
    this.baseX = targetX
    this.baseY = targetY
    this.size = Math.random() * 8 + 6 
    this.speed = Math.random() * 0.035 + 0.02
    this.colorBase = colors[Math.floor(Math.random() * colors.length)]
    this.rotation = Math.random() * Math.PI * 2
    this.vx = 0
    this.vy = 0
    this.isLit = false
  }

  draw(context) {
    const s = this.size
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.rotation)
    
    if (this.isLit) {
        // Bright glowing heart with shimmer
        const shimmer = Math.sin(Date.now() / 200 + this.baseX) * 0.15 + 0.85
        context.setFillStyle(this.colorBase + shimmer + ')')
        context.setGlobalAlpha(1.0)
    } else {
        // Much more subtle grey heart for background
        context.setFillStyle('rgba(200, 200, 200, 0.2)')
        context.setGlobalAlpha(0.3)
    }
    
    context.beginPath()
    context.moveTo(0, s * 0.3)
    context.arc(-s / 2, 0, s / 2, 0, Math.PI, true)
    context.arc(s / 2, 0, s / 2, 0, Math.PI, true)
    context.lineTo(0, s * 1.2)
    context.closePath()
    context.fill()
    context.restore()
  }

  update(mouseX, mouseY, memberCount, checkedCount, isMeChecked) {
    const cCount = Number(checkedCount)
    const mCount = Number(memberCount)
    
    // Explicit Full Completion check
    if (mCount > 0 && cCount >= mCount) {
        this.isLit = true
    } else {
        // Determine lighting status
        const centerX = canvasWidth.value / 2
        if (mCount === 2) {
            // Couple mode: Left = Me, Right = Partner
            const isPartnerChecked = cCount === 2 || (cCount === 1 && !isMeChecked)
            if (this.baseX < centerX - 2) { 
                this.isLit = isMeChecked
            } else if (this.baseX > centerX + 2) {
                this.isLit = isPartnerChecked
            } else {
                this.isLit = cCount > 0
            }
        } else if (mCount > 2) {
            const ratio = cCount / mCount
            // Calibration: x range is approx [-80, 80] with scale 5
            const relativeX = (this.baseX - centerX)
            const normalizedX = (relativeX + 80) / 160 
            this.isLit = normalizedX < ratio
        } else {
            this.isLit = cCount > 0
        }
    }

    const time = Date.now() / 1000
    const pulse = Math.sin(time * 1.8) * 12
    const tx = this.baseX + (this.baseX - canvasWidth.value / 2) * (pulse / 100)
    const ty = this.baseY + (this.baseY - canvasHeight.value / 2) * (pulse / 100)

    if (mouseX && mouseY) {
      const dx = mouseX - this.x
      const dy = mouseY - this.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 80) {
        const force = (80 - dist) / 80
        this.vx -= (dx / dist) * force * 6
        this.vy -= (dy / dist) * force * 6
        this.rotation += 0.05
      }
    }

    this.vx += (tx - this.x) * this.speed
    this.vy += (ty - this.y) * this.speed
    this.vx *= 0.82
    this.vy *= 0.82

    this.x += this.vx
    this.y += this.vy
    this.rotation += 0.003
  }
}

const initHeart = () => {
    particles = []
    const totalCount = 280 
    const outlineCount = 80 // Dedicated to the border
    const fillCount = totalCount - outlineCount
    const centerX = canvasWidth.value / 2
    const scale = 5.0 
    const centerY = canvasHeight.value / 2 - (6 * scale) 

    // 1. Generate Outline Particles
    for (let i = 0; i < outlineCount; i++) {
        const t = (i / outlineCount) * Math.PI * 2
        const x = scale * (16 * Math.pow(Math.sin(t), 3))
        const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
        const jitter = (Math.random() - 0.5) * 4
        particles.push(new Particle(0, 0, centerX + x + jitter, centerY + y + jitter))
    }

    // 2. Generate Fill Particles
    for (let i = 0; i < fillCount; i++) {
        const t = Math.random() * Math.PI * 2
        const r = Math.pow(Math.random(), 0.6) // Distribution biased slightly towards the edge for better transition
        const x = r * scale * (16 * Math.pow(Math.sin(t), 3))
        const y = -r * scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
        const jitter = (Math.random() - 0.5) * 6
        particles.push(new Particle(0, 0, centerX + x + jitter, centerY + y + jitter))
    }
}

const handleTouch = (e) => {
    if (e.touches && e.touches[0]) {
        mouseX = e.touches[0].x
        mouseY = e.touches[0].y
        setTimeout(() => {
            mouseX = null
            mouseY = null
        }, 150)
    }
}

let mouseX = null
let mouseY = null

const handleHeartClick = () => {
    emit('heartClick')
}

const animate = () => {
    if (!ctx || isDestroyed) return
    ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
    
    // Draw particles
    for (const p of particles) {
        // Only update particle positions when active
        if (props.active) {
            p.update(mouseX, mouseY, props.memberCount, props.checkedCount, props.isMeChecked)
        }
        p.draw(ctx)
    }
    
    ctx.draw()
    
    // Only continue animation loop when active
    if (props.active) {
        animationFrame = setTimeout(animate, 16)
    }
}

onMounted(() => {
  nextTick(() => {
    const query = uni.createSelectorQuery().in(instance)
    query.select('.particle-heart-container').boundingClientRect(data => {
      if (data) {
        canvasWidth.value = data.width
        canvasHeight.value = data.height
        ctx = uni.createCanvasContext(canvasId, instance)
        initHeart()
        animate()
      }
    }).exec()
  })
})

onUnmounted(() => {
  isDestroyed = true
  if (animationFrame) {
    clearTimeout(animationFrame)
  }
})
</script>

<style scoped>
.particle-heart-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}
.heart-canvas {
  background: transparent;
}
</style>
