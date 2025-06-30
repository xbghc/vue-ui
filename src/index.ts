import type { App } from 'vue';
import { ToolTip } from './components/ToolTip';

// 导入全局样式
import './styles/index.scss';

/**
 * 全局安装函数
 * @param app - Vue 应用实例
 */
const install = (app: App) => {
  app.component('ToolTip', ToolTip);
};

// ===== 组件导出 =====
export { ToolTip };

// ===== 类型导出 =====
export type {
  ToolTipProps,
  ToolTipEmits,
  ToolTipTrigger,
  ToolTipPlacement,
} from './components/ToolTip';

// ===== Hooks 导出 =====
export { useToolTip } from './components/ToolTip';

// ===== 枚举导出（别名） =====
export { Trigger, Placement } from './components/ToolTip';

// ===== 默认导出（插件安装） =====
export default {
  install,
  version: '0.0.1',
};
