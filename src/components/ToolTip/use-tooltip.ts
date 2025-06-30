import { ref, nextTick, onMounted, onUnmounted } from 'vue';
import { computePosition, autoUpdate, offset, flip, shift } from '@floating-ui/dom';
import type { ToolTipProps, ToolTipEmits } from './tooltip-types';
import type { Placement } from '@floating-ui/dom';

/**
 * ToolTip 组件的核心逻辑 Hook
 *
 * @param props - 组件属性
 * @param emit - 事件发射器
 * @returns ToolTip 相关的响应式数据和方法
 */
export function useToolTip(props: ToolTipProps, emit: (event: ToolTipEmits[number]) => void) {
  // ===== 响应式数据 =====
  const triggerRef = ref<HTMLElement>();
  const popupRef = ref<HTMLElement>();
  const isVisible = ref(false);
  const popupId = ref(`tooltip-${Math.random().toString(36).slice(2, 10)}`);

  // ===== 内部状态 =====
  let cleanup: (() => void) | null = null;
  let hoverTimer: number | null = null;

  // ===== 核心方法 =====

  /**
   * 显示 ToolTip
   */
  const show = () => {
    if (!props.disabled) {
      isVisible.value = true;
      nextTick(() => {
        updatePosition();
        emit('show');
      });
    }
  };

  /**
   * 隐藏 ToolTip
   */
  const hide = () => {
    isVisible.value = false;
    emit('hide');
  };

  /**
   * 更新 ToolTip 位置
   */
  const updatePosition = async () => {
    if (!triggerRef.value || !popupRef.value) return;

    const middleware = [offset(props.offset), flip(), shift({ padding: 8 })];

    try {
      const { x, y } = await computePosition(triggerRef.value, popupRef.value, {
        placement: props.placement as Placement,
        middleware,
      });

      popupRef.value.style.left = `${x}px`;
      popupRef.value.style.top = `${y}px`;
    } catch (error) {
      console.warn('ToolTip positioning error:', error);
    }
  };

  // ===== 自动更新位置 =====

  /**
   * 设置自动更新位置
   */
  const setupAutoUpdate = () => {
    if (triggerRef.value && popupRef.value && isVisible.value) {
      cleanup = autoUpdate(triggerRef.value, popupRef.value, updatePosition);
    }
  };

  /**
   * 清理自动更新
   */
  const cleanupAutoUpdate = () => {
    if (cleanup) {
      cleanup();
      cleanup = null;
    }
  };

  // ===== 延迟处理 =====

  /**
   * 立即显示（清除延迟）
   */
  const showWithDelay = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
    show();
  };

  /**
   * 延迟隐藏
   */
  const hideWithDelay = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }
    hoverTimer = setTimeout(() => {
      hide();
      hoverTimer = null;
    }, props.hoverDelay);
  };

  /**
   * 取消延迟隐藏
   */
  const cancelHideDelay = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
  };

  // ===== 事件监听器管理 =====

  /**
   * 设置触发元素的事件监听器
   */
  const setupTriggerListeners = () => {
    if (!triggerRef.value || props.disabled) return;

    triggerRef.value.addEventListener('mouseenter', showWithDelay);
    triggerRef.value.addEventListener('mouseleave', hideWithDelay);
  };

  /**
   * 设置弹窗的悬停事件监听器
   */
  const setupPopupHoverListeners = () => {
    if (!popupRef.value) return;

    popupRef.value.addEventListener('mouseenter', cancelHideDelay);
    popupRef.value.addEventListener('mouseleave', hideWithDelay);
  };

  /**
   * 清理触发元素的事件监听器
   */
  const cleanupTriggerListeners = () => {
    if (!triggerRef.value) return;

    triggerRef.value.removeEventListener('mouseenter', showWithDelay);
    triggerRef.value.removeEventListener('mouseleave', hideWithDelay);
  };

  /**
   * 清理弹窗的悬停事件监听器
   */
  const cleanupPopupHoverListeners = () => {
    if (!popupRef.value) return;

    popupRef.value.removeEventListener('mouseenter', cancelHideDelay);
    popupRef.value.removeEventListener('mouseleave', hideWithDelay);

    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
  };

  // ===== 生命周期 =====

  onMounted(() => {
    // 延迟设置以确保 DOM 就绪
    nextTick(() => {
      setupTriggerListeners();
    });
  });

  onUnmounted(() => {
    cleanupTriggerListeners();
    cleanupPopupHoverListeners();
    cleanupAutoUpdate();
  });

  // ===== 返回值 =====

  return {
    // 响应式数据
    triggerRef,
    popupRef,
    isVisible,
    popupId,

    // 核心方法
    show,
    hide,
    updatePosition,

    // 自动更新
    setupAutoUpdate,
    cleanupAutoUpdate,

    // 事件监听器
    setupPopupHoverListeners,
    cleanupPopupHoverListeners,
  };
}
