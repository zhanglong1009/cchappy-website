<template>
  <div class="app">
    <div ref="sceneRef" class="particle-scene"></div>
    
    <!-- 返回按钮 -->
    <button class="back-button" @click="handleBack" :class="{ 'active': isAnimating }">
      <span class="back-icon">⬅️</span>
      <span class="back-text">返回上一页</span>
    </button>
    
    <div class="menu-container" :class="{ 'sucked': isAnimating }">
      <nav class="menu">
        <a href="https://www.cchappy.top/3d/shengdanshu.html" class="menu-item" target="_blank" :class="{ 'sucked': isAnimating }">
          <div class="menu-item-inner">
            <div class="menu-item-icon">🎄</div>
            <h3 class="menu-item-title">圣诞树</h3>
            <p class="menu-item-desc">绚丽的3D圣诞树动画效果</p>
          </div>
        </a>
        <a href="https://www.cchappy.top/3d/tanhua.html" class="menu-item" target="_blank" :class="{ 'sucked': isAnimating }">
          <div class="menu-item-inner">
            <div class="menu-item-icon">🌸</div>
            <h3 class="menu-item-title">昙花</h3>
            <p class="menu-item-desc">唯美短暂的昙花绽放效果</p>
          </div>
        </a>
        <a href="https://www.cchappy.top/3d/shanmai.html" class="menu-item" target="_blank" :class="{ 'sucked': isAnimating }">
          <div class="menu-item-inner">
            <div class="menu-item-icon">⛰️</div>
            <h3 class="menu-item-title">山脉</h3>
            <p class="menu-item-desc">壮观的3D山脉景观动画</p>
          </div>
        </a>
      </nav>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const sceneRef = ref(null);
let scene, camera, renderer, particles, animationId;
let particlePositions, particleVelocities, particleCount;

// 动画状态
const isAnimating = ref(false);
let animationProgress = 0;
let blackHolePosition = { x: 0, y: 0, z: 0 };

// 初始化场景
const initScene = () => {
  if (!sceneRef.value) return;

  // 场景设置 - 宇宙深色背景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000011);

  // 相机设置 - 透视相机适合3D空间
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  // 渲染器设置
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  sceneRef.value.appendChild(renderer.domElement);

  // 创建粒子系统 - 宇宙星河效果
  createParticles();

  // 添加事件监听器
  window.addEventListener('resize', onWindowResize);
  
  // 开始动画
  animate();
};

// 创建粒子 - 宇宙星河效果
const createParticles = () => {
  particleCount = 2000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  
  particleVelocities = new Float32Array(particleCount * 3);

  // 初始化粒子位置和颜色 - 宇宙星河分布
  for (let i = 0; i < particleCount * 3; i += 3) {
    // 三维空间随机分布
    positions[i] = (Math.random() - 0.5) * 100;
    positions[i + 1] = (Math.random() - 0.5) * 100;
    positions[i + 2] = (Math.random() - 0.5) * 100;
    
    // 缓慢随机速度 - 无规律流动
    particleVelocities[i] = (Math.random() - 0.5) * 0.01;
    particleVelocities[i + 1] = (Math.random() - 0.5) * 0.01;
    particleVelocities[i + 2] = (Math.random() - 0.5) * 0.01;
    
    // 随机生成粒子大小 - 星星大小变化
    const size = 0.1 + Math.random() * 0.5;
    sizes[i / 3] = size;
    
    // 随机星球颜色 - 模拟宇宙中不同颜色的星球
    const randomColor = () => {
      // 生成随机HSL颜色
      // 色相：0-360，涵盖所有颜色
      // 饱和度：0.6-1.0，确保颜色鲜艳
      // 亮度：0.5-1.0，确保颜色明亮可见
      const hue = Math.random();
      const saturation = 0.6 + Math.random() * 0.4;
      const lightness = 0.5 + Math.random() * 0.5;
      
      // HSL转RGB
      const hslToRgb = (h, s, l) => {
        let r, g, b;
        if (s === 0) {
          r = g = b = l;
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
        }
        return { r, g, b };
      };
      
      return hslToRgb(hue, saturation, lightness);
    };
    
    // 生成随机星球颜色
    const color = randomColor();
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  
  particlePositions = geometry.attributes.position.array;

  // 创建圆形粒子纹理
  const createCircleTexture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 64;
    canvas.width = size;
    canvas.height = size;
    
    // 创建径向渐变，中心透明，边缘不透明
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    // 绘制圆形
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
    
    return new THREE.CanvasTexture(canvas);
  };
  
  // 创建材质 - 适合宇宙星星，使用圆形纹理
  const material = new THREE.PointsMaterial({
    size: 0.6,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    map: createCircleTexture(), // 使用圆形纹理
    alphaMap: createCircleTexture(),
    transparent: true,
    depthWrite: false
  });

  // 创建粒子系统
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
};

// 窗口大小调整
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

// 返回按钮点击事件
const handleBack = () => {
  if (isAnimating.value) return;
  
  // 开始动画
  isAnimating.value = true;
  animationProgress = 0;
  
  // 黑洞位置设置为屏幕中心
  blackHolePosition = { x: 0, y: 0, z: 0 };
};

// 动画循环 - 粒子无规律缓慢流动或被黑洞吸入
const animate = () => {
  animationId = requestAnimationFrame(animate);
  
  if (particles) {
    if (isAnimating.value) {
      // 黑洞吸入动画 - 减慢动画进度增长，让动画更长
      animationProgress += 0.01;
      
      for (let i = 0; i < particleCount * 3; i += 3) {
        // 计算粒子到黑洞的距离
        const dx = blackHolePosition.x - particlePositions[i];
        const dy = blackHolePosition.y - particlePositions[i + 1];
        const dz = blackHolePosition.z - particlePositions[i + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        // 黑洞引力强度 - 适中的引力，让粒子缓慢被吸入
        const gravityStrength = Math.min(1, 60 / (distance * distance)) * animationProgress;
        
        // 更新粒子位置，被黑洞吸入 - 减慢吸入速度
        particlePositions[i] += dx * gravityStrength * 0.1;
        particlePositions[i + 1] += dy * gravityStrength * 0.1;
        particlePositions[i + 2] += dz * gravityStrength * 0.1;
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
      
      // 动画进度达到1.0时再执行跳转，让动画完全结束
      if (animationProgress >= 1.0) {
        // 添加一个短暂的延迟，给动画一个机会来完成
        setTimeout(() => {
          window.history.back();
        }, 1000);
        // 不需要取消动画帧，跳转后页面会卸载，自动清理
      }
    } else {
      // 粒子缓慢无规律流动
      for (let i = 0; i < particleCount * 3; i += 3) {
        // 更新粒子位置
        particlePositions[i] += particleVelocities[i];
        particlePositions[i + 1] += particleVelocities[i + 1];
        particlePositions[i + 2] += particleVelocities[i + 2];
        
        // 随机微小速度变化 - 无规律流动
        particleVelocities[i] += (Math.random() - 0.5) * 0.0005;
        particleVelocities[i + 1] += (Math.random() - 0.5) * 0.0005;
        particleVelocities[i + 2] += (Math.random() - 0.5) * 0.0005;
        
        // 速度限制 - 保持缓慢流动
        const maxSpeed = 0.015;
        if (particleVelocities[i] > maxSpeed) particleVelocities[i] = maxSpeed;
        if (particleVelocities[i] < -maxSpeed) particleVelocities[i] = -maxSpeed;
        if (particleVelocities[i + 1] > maxSpeed) particleVelocities[i + 1] = maxSpeed;
        if (particleVelocities[i + 1] < -maxSpeed) particleVelocities[i + 1] = -maxSpeed;
        if (particleVelocities[i + 2] > maxSpeed) particleVelocities[i + 2] = maxSpeed;
        if (particleVelocities[i + 2] < -maxSpeed) particleVelocities[i + 2] = -maxSpeed;
        
        // 边界循环 - 粒子在空间中循环
        if (particlePositions[i] > 50) particlePositions[i] = -50;
        if (particlePositions[i] < -50) particlePositions[i] = 50;
        if (particlePositions[i + 1] > 50) particlePositions[i + 1] = -50;
        if (particlePositions[i + 1] < -50) particlePositions[i + 1] = 50;
        if (particlePositions[i + 2] > 50) particlePositions[i + 2] = -50;
        if (particlePositions[i + 2] < -50) particlePositions[i + 2] = 50;
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
    }
  }

  renderer.render(scene, camera);
};

// 组件挂载时初始化
onMounted(() => {
  initScene();
});

// 组件卸载时清理
onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  window.removeEventListener('resize', onWindowResize);
  if (renderer && sceneRef.value) {
    sceneRef.value.removeChild(renderer.domElement);
    renderer.dispose();
  }
});
</script>

<style>
/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  background: #000022;
}

/* 应用容器 */
.app {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

/* 粒子场景 */
.particle-scene {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

/* 菜单容器 */
.menu-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
}

/* 菜单 */
.menu {
  display: flex;
  gap: 2rem;
  padding: 0;
  background: transparent;
  border-radius: 2rem;
  max-width: 1200px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

/* 菜单项 */
.menu-item {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0;
  border-radius: 1.5rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  min-width: 280px;
  max-width: 320px;
  height: 220px;
  flex-shrink: 0;
  transform: translateY(0);
  opacity: 0.9;
}

/* 菜单项内部 */
.menu-item-inner {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 2;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 菜单项悬停效果 */
.menu-item:hover {
  transform: translateY(-12px) scale(1.05);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 80px rgba(150, 200, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
  opacity: 1;
}

/* 菜单项内部悬停效果 */
.menu-item:hover .menu-item-inner {
  transform: translateY(-8px);
}

/* 菜单项图标 */
.menu-item-icon {
  font-size: 3.5rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 0 20px rgba(150, 200, 255, 0.5));
  transform: scale(1);
}

/* 菜单项图标悬停效果 */
.menu-item:hover .menu-item-icon {
  transform: scale(1.3) rotate(15deg);
  filter: drop-shadow(0 0 40px rgba(200, 230, 255, 1));
  animation: pulse 2s infinite ease-in-out;
}

/* 菜单项标题 */
.menu-item-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #ffffff, #aaccff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  text-shadow: 0 0 20px rgba(150, 200, 255, 0.3);
}

/* 菜单项描述 */
.menu-item-desc {
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0;
  color: rgba(200, 220, 255, 0.8);
  text-align: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.7;
}

/* 菜单项悬停时的描述效果 */
.menu-item:hover .menu-item-desc {
  opacity: 1;
  color: rgba(220, 240, 255, 1);
  transform: translateY(-3px);
}

/* 菜单项悬停时的标题效果 */
.menu-item:hover .menu-item-title {
  text-shadow: 0 0 30px rgba(150, 200, 255, 0.6);
}

/* 脉冲动画 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1.3) rotate(15deg);
  }
  50% {
    transform: scale(1.5) rotate(15deg);
  }
}

/* 菜单加载动画 */
.menu-item {
  animation: menuItemFadeIn 0.8s ease-out forwards;
  opacity: 0;
}

.menu-item:nth-child(1) {
  animation-delay: 0.2s;
}

.menu-item:nth-child(2) {
  animation-delay: 0.4s;
}

.menu-item:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes menuItemFadeIn {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.8);
  }
  to {
    opacity: 0.9;
    transform: translateY(0) scale(1);
  }
}

/* 返回按钮样式 */
.back-button {
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  opacity: 0.9;
}

/* 返回按钮图标 */
.back-icon {
  font-size: 1.2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 返回按钮文本 */
.back-text {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 返回按钮悬停效果 */
.back-button:hover {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4), 0 0 30px rgba(150, 200, 255, 0.3);
  transform: translateY(-3px);
  opacity: 1;
}

/* 返回按钮激活状态 */
.back-button.active {
  background: rgba(255, 50, 50, 0.2);
  border-color: rgba(255, 50, 50, 0.4);
  box-shadow: 0 12px 48px rgba(255, 50, 50, 0.3), 0 0 30px rgba(255, 100, 100, 0.5);
  animation: backButtonPulse 1s infinite;
}

/* 返回按钮脉冲动画 */
@keyframes backButtonPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* 菜单被黑洞吸入动画 */
.menu-container.sucked {
  animation: menuSucked 2s forwards;
}

.menu-item.sucked {
  animation: menuItemShatter 2s forwards;
}

/* 菜单容器被吸入动画 */
@keyframes menuSucked {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
}

/* 菜单项破碎被吸入动画 */
@keyframes menuItemShatter {
  0% {
    transform: translateY(0) scale(1) rotate(0deg);
    opacity: 0.9;
  }
  20% {
    /* 突然破碎，轻微旋转 */
    transform: translateY(-15px) scale(1.15) rotate(3deg);
    opacity: 1;
  }
  50% {
    /* 开始被吸入，旋转角度增大 */
    transform: translateY(-30px) scale(0.85) rotate(-4deg);
    opacity: 0.8;
  }
  80% {
    /* 继续被吸入，旋转角度更大 */
    transform: translateY(-60px) scale(0.5) rotate(6deg);
    opacity: 0.4;
  }
  100% {
    /* 完全被吸入 */
    transform: translateY(-100px) scale(0) rotate(-10deg);
    opacity: 0;
  }
}
</style>
