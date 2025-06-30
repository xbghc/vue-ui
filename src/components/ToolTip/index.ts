import type { App } from 'vue';
import ToolTip from './ToolTip.vue';

// 按需导入时引入样式
import './tooltip.scss';

/**
 * 为 ToolTip 组件添加全局安装方法
 */
ToolTip.install = (app: App) => {
  app.component('ToolTip', ToolTip);
};

// ===== 组件导出 =====
export { ToolTip };
export default ToolTip;

// ===== 类型导出 =====
export type { ToolTipProps, ToolTipEmits, ToolTipTrigger, ToolTipPlacement } from './tooltip-types';

// ===== Hooks 导出 =====
export { useToolTip } from './use-tooltip';

// ===== 枚举导出 =====
export { ToolTipTrigger as Trigger, ToolTipPlacement as Placement } from './tooltip-types';
