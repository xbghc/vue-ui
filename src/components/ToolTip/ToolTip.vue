<template>
  <div class="tooltip-container">
    <!-- 触发元素容器 -->
    <div
      ref="triggerRef"
      class="tooltip-trigger"
      :aria-describedby="popupId || undefined"
      :aria-expanded="isVisible"
    >
      <slot name="trigger" />
    </div>

    <!-- ToolTip 弹窗 -->
    <Teleport to="body">
      <Transition name="tooltip-fade">
        <div
          v-show="isVisible"
          :id="popupId || undefined"
          ref="popupRef"
          class="tooltip-overlay"
          :data-placement="placement"
          :data-show-arrow="showArrow"
          role="tooltip"
          @click.stop
        >
          <!-- 内容区域 -->
          <div class="tooltip-content">
            <!-- 属性内容 -->
            <template v-if="content">
              {{ content }}
            </template>

            <!-- 插槽内容 -->
            <template v-else>
              <slot />
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { watch, nextTick } from 'vue';
import { tooltipProps, tooltipEmits } from './tooltip-types';
import { useToolTip } from './use-tooltip';

// ===== 组件配置 =====
defineOptions({
  name: 'ToolTip',
});

// ===== 属性和事件 =====
const props = defineProps(tooltipProps);
const emit = defineEmits(tooltipEmits);

// ===== 核心逻辑 =====
const {
  triggerRef,
  popupRef,
  isVisible,
  popupId,
  show,
  hide,
  updatePosition,
  setupAutoUpdate,
  cleanupAutoUpdate,
  setupPopupHoverListeners,
  cleanupPopupHoverListeners,
} = useToolTip(props, emit);

// ===== 响应式监听 =====

/**
 * 监听显示状态变化，管理自动更新和事件监听器
 */
watch(isVisible, async visible => {
  if (visible) {
    await nextTick();
    setupAutoUpdate();
    setupPopupHoverListeners();
  } else {
    cleanupAutoUpdate();
    cleanupPopupHoverListeners();
  }
});

// ===== 组件暴露 =====

/**
 * 暴露组件方法供父组件调用
 */
defineExpose({
  show,
  hide,
  updatePosition,
});
</script>

<!-- 
  样式文件位置: src/components/ToolTip/tooltip.scss
  全局样式入口: src/styles/index.scss
-->
