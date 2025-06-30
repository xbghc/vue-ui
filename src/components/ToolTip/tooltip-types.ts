import type { ExtractPropTypes, PropType } from 'vue';

/**
 * ToolTip 触发方式枚举
 * @deprecated 现在只支持 hover 触发，该枚举将在未来版本中移除
 */
export enum ToolTipTrigger {
  /** 鼠标悬停触发 */
  Hover = 'hover',
}

/**
 * ToolTip 位置枚举
 */
export enum ToolTipPlacement {
  /** 顶部 */
  Top = 'top',
  /** 顶部开始 */
  TopStart = 'top-start',
  /** 顶部结束 */
  TopEnd = 'top-end',
  /** 底部 */
  Bottom = 'bottom',
  /** 底部开始 */
  BottomStart = 'bottom-start',
  /** 底部结束 */
  BottomEnd = 'bottom-end',
  /** 左侧 */
  Left = 'left',
  /** 左侧开始 */
  LeftStart = 'left-start',
  /** 左侧结束 */
  LeftEnd = 'left-end',
  /** 右侧 */
  Right = 'right',
  /** 右侧开始 */
  RightStart = 'right-start',
  /** 右侧结束 */
  RightEnd = 'right-end',
}

/**
 * ToolTip 组件属性定义
 */
export const tooltipProps = {
  /** 显示位置 */
  placement: {
    type: String as PropType<ToolTipPlacement>,
    default: ToolTipPlacement.Top,
  },
  /** 距离触发元素的偏移量 */
  offset: {
    type: Number,
    default: 8,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否显示箭头 */
  showArrow: {
    type: Boolean,
    default: true,
  },
  /** 鼠标离开后延迟隐藏时间(ms) */
  hoverDelay: {
    type: Number,
    default: 100,
  },
  /** 文本内容 */
  content: {
    type: String,
    default: '',
  },
} as const;

/**
 * ToolTip 组件事件定义
 */
export const tooltipEmits = ['show', 'hide'];

/**
 * ToolTip 组件属性类型
 */
export type ToolTipProps = ExtractPropTypes<typeof tooltipProps>;

/**
 * ToolTip 组件事件类型
 */
export type ToolTipEmits = typeof tooltipEmits;
