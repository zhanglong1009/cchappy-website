import { ref, onMounted, onUnmounted } from 'vue';

// 鼠标位置管理组合式函数
export function useMousePos() {
  // 鼠标位置状态
  const mousePos = ref({ x: 0, y: 0 });

  // 处理鼠标移动事件
  const handleMouseMove = (e: MouseEvent) => {
    mousePos.value = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight
    };
  };

  // 组件挂载时添加事件监听
  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove);
  });

  // 组件卸载时移除事件监听
  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
  });

  return {
    mousePos
  };
}