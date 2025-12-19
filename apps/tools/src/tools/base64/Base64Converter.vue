<script setup lang="ts">
import { ref } from 'vue';
import { encodeToBase64, decodeFromBase64 } from './utils';

// 输入输出数据
const stringInput = ref('');
const base64Input = ref('');
const errorMessage = ref('');

// 复制功能
const copyToClipboard = async (text: string) => {
  if (!text) return;
  
  try {
    await navigator.clipboard.writeText(text);
    errorMessage.value = '复制成功！';
    setTimeout(() => {
      errorMessage.value = '';
    }, 2000);
  } catch (error) {
    console.error('复制失败:', error);
    errorMessage.value = '复制失败，请手动复制';
  }
};

// 字符串转Base64
const convertStringToBase64 = () => {
  errorMessage.value = '';
  
  try {
    if (stringInput.value.trim()) {
      base64Input.value = encodeToBase64(stringInput.value);
    } else {
      errorMessage.value = '请输入要转换的字符串';
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '转换失败';
  }
};

// Base64转字符串
const convertBase64ToString = () => {
  errorMessage.value = '';
  
  try {
    if (base64Input.value.trim()) {
      // 简单的格式验证
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      if (!base64Regex.test(base64Input.value)) {
        throw new Error('输入的不是有效的 Base64 格式');
      }
      
      stringInput.value = decodeFromBase64(base64Input.value);
    } else {
      errorMessage.value = '请输入要转换的 Base64 字符串';
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '转换失败，请检查输入格式';
  }
};

// 清空所有内容
const clearAll = () => {
  stringInput.value = '';
  base64Input.value = '';
  errorMessage.value = '';
};
</script>

<template>
  <div class="base64-converter">
    <h1 class="converter-title">Base64 转换器</h1>
    
    <!-- 错误信息 -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <div class="converter-content">
      <!-- 左边：字符串输入 -->
      <div class="converter-panel">
        <div class="panel-header">
          <h2 class="panel-title">字符串</h2>
        </div>
        
        <div class="panel-body">
          <textarea
            v-model="stringInput"
            class="text-input"
            placeholder="请输入字符串"
            rows="8"
          ></textarea>
          
          <div class="button-group">
            <button @click="convertStringToBase64" class="btn btn-primary">
              转换为 Base64 →
            </button>
            <button @click="copyToClipboard(stringInput)" class="btn btn-secondary" :disabled="!stringInput">
              复制
            </button>
          </div>
        </div>
      </div>
      
      <!-- 中间控制区域 -->
      <div class="converter-controls">
        <div class="controls-content">
          <button @click="clearAll" class="btn btn-secondary">清空</button>
        </div>
      </div>
      
      <!-- 右边：Base64 输入 -->
      <div class="converter-panel">
        <div class="panel-header">
          <h2 class="panel-title">Base64</h2>
        </div>
        
        <div class="panel-body">
          <textarea
            v-model="base64Input"
            class="text-input"
            placeholder="请输入 Base64"
            rows="8"
          ></textarea>
          
          <div class="button-group">
            <button @click="convertBase64ToString" class="btn btn-primary">
              ← 转换为 字符串
            </button>
            <button @click="copyToClipboard(base64Input)" class="btn btn-secondary" :disabled="!base64Input">
              复制
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.base64-converter {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.converter-title {
  text-align: center;
  margin: 0 0 1.5rem 0;
  color: var(--text-primary);
  font-size: 1.8rem;
  font-weight: 600;
}

.error-message {
  background-color: rgba(255, 0, 0, 0.1);
  color: #ff4444;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 0, 0, 0.2);
  margin-bottom: 1rem;
  text-align: center;
}

.converter-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 768px) {
  .converter-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 1rem;
  }
}

.converter-panel {
  background-color: var(--bg-primary);
  border-radius: 6px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.panel-header {
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-color);
}

.panel-title {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
}

.panel-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.text-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  resize: vertical;
  min-height: 150px;
}

.text-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
}

.converter-controls {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1.5rem 1rem 0;
}

.controls-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* 按钮样式 */
.btn {
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: var(--primary-color);
  color: var(--text-primary);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--primary-color-dark);
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--bg-quaternary);
}
</style>