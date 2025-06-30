import type { Meta, StoryObj } from '@storybook/vue3';
import ToolTip from './ToolTip.vue';
import { ToolTipPlacement } from './tooltip-types';

const meta: Meta<typeof ToolTip> = {
  title: 'Components/ToolTip',
  component: ToolTip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '一个功能完整的工具提示组件，支持多种位置、自定义样式和延迟显示。',
      },
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip内容文本，与默认插槽二选一',
      table: {
        category: 'Props',
        type: {
          summary: 'string',
          detail: 'string | undefined',
        },
        defaultValue: { summary: "''" },
      },
    },
    placement: {
      control: 'select',
      options: Object.values(ToolTipPlacement),
      description: 'Tooltip显示位置，支持12种位置',
      table: {
        category: 'Props',
        type: {
          summary: 'ToolTipPlacement',
          detail:
            "'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'",
        },
        defaultValue: { summary: "'top'" },
      },
    },
    offset: {
      control: { type: 'number', min: 0, max: 50, step: 1 },
      description: '距离触发元素的偏移量(px)',
      table: {
        category: 'Props',
        type: {
          summary: 'number',
          detail: 'number (≥ 0)',
        },
        defaultValue: { summary: '8' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用Tooltip显示',
      table: {
        category: 'Props',
        type: {
          summary: 'boolean',
          detail: 'true | false',
        },
        defaultValue: { summary: 'false' },
      },
    },
    showArrow: {
      control: 'boolean',
      description: '是否显示指向触发元素的箭头',
      table: {
        category: 'Props',
        type: {
          summary: 'boolean',
          detail: 'true | false',
        },
        defaultValue: { summary: 'true' },
      },
    },
    hoverDelay: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: '鼠标离开后延迟隐藏的时间(ms)',
      table: {
        category: 'Props',
        type: {
          summary: 'number',
          detail: 'number (≥ 0, 毫秒)',
        },
        defaultValue: { summary: '100' },
      },
    },
  },
  args: {
    content: 'Default tooltip content',
    placement: ToolTipPlacement.Top,
    offset: 8,
    disabled: false,
    showArrow: true,
    hoverDelay: 100,
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => ({
    components: { ToolTip },
    setup() {
      return { args };
    },
    template: `
      <ToolTip v-bind="args">
        <template #trigger>
          <button style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" onmouseover="this.style.background='#0056b3'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'" onmouseout="this.style.background='#007bff'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'">
            Hover me
          </button>
        </template>
      </ToolTip>
    `,
  }),
};

export const RichContent: Story = {
  args: {
    placement: ToolTipPlacement.Bottom,
    showArrow: true,
  },
  render: args => ({
    components: { ToolTip },
    setup() {
      return { args };
    },
    template: `
      <ToolTip v-bind="args">
        <template #trigger>
          <button style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" onmouseover="this.style.background='#218838'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'" onmouseout="this.style.background='#28a745'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'">
            Rich Content
          </button>
        </template>
        <div style="padding: 4px;">
          <strong>Rich Tooltip</strong><br>
          <span style="color: #ccc;">With multiple lines</span>
        </div>
      </ToolTip>
    `,
  }),
};

export const DifferentPlacements: Story = {
  render: () => ({
    components: { ToolTip },
    setup() {
      const placements = [
        ToolTipPlacement.Top,
        ToolTipPlacement.TopStart,
        ToolTipPlacement.TopEnd,
        ToolTipPlacement.Bottom,
        ToolTipPlacement.BottomStart,
        ToolTipPlacement.BottomEnd,
        ToolTipPlacement.Left,
        ToolTipPlacement.LeftStart,
        ToolTipPlacement.LeftEnd,
        ToolTipPlacement.Right,
        ToolTipPlacement.RightStart,
        ToolTipPlacement.RightEnd,
      ];
      return { placements };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 60px;">
        <ToolTip
          v-for="placement in placements"
          :key="placement"
          :content="placement"
          :placement="placement"
          :showArrow="true"
        >
          <template #trigger>
            <button style="padding: 8px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.1);" onmouseover="this.style.background='#5a6268'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.15)'" onmouseout="this.style.background='#6c757d'; this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.1)'">
              {{ placement }}
            </button>
          </template>
        </ToolTip>
      </div>
    `,
  }),
};

export const NoArrow: Story = {
  args: {
    content: 'Tooltip without arrow',
    placement: ToolTipPlacement.Top,
    showArrow: false,
  },
  render: args => ({
    components: { ToolTip },
    setup() {
      return { args };
    },
    template: `
      <ToolTip v-bind="args">
        <template #trigger>
          <button style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" onmouseover="this.style.background='#c82333'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'" onmouseout="this.style.background='#dc3545'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'">
            No Arrow
          </button>
        </template>
      </ToolTip>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    content: 'This tooltip is disabled',
    placement: ToolTipPlacement.Top,
    disabled: true,
  },
  render: args => ({
    components: { ToolTip },
    setup() {
      const handleClick = () => {
        alert('按钮点击正常工作！tooltip被禁用不影响按钮功能');
      };
      return { args, handleClick };
    },
    template: `
      <div style="text-align: center;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          提示：按钮可以正常点击，但tooltip不会显示
        </p>
        <ToolTip v-bind="args">
          <template #trigger>
            <button 
              @click="handleClick"
              style="padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" onmouseover="this.style.background='#5a6268'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'" onmouseout="this.style.background='#6c757d'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'"
            >
              悬停我 (tooltip已禁用)
            </button>
          </template>
        </ToolTip>
      </div>
    `,
  }),
};

export const DisabledButtonWithTooltip: Story = {
  args: {
    content: '按钮已禁用',
    placement: ToolTipPlacement.Top,
    disabled: false, // tooltip正常工作
    showArrow: true,
  },
  render: args => ({
    components: { ToolTip },
    setup() {
      return { args };
    },
    template: `
      <div style="text-align: center;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          对比：真正的禁用按钮 + 正常tooltip（解释为什么禁用）
        </p>
        <ToolTip v-bind="args">
          <template #trigger>
            <button 
              disabled
              style="padding: 8px 16px; background: #ccc; color: #666; border: none; border-radius: 4px; cursor: not-allowed; opacity: 0.6;"
            >
              真正的禁用按钮
            </button>
          </template>
        </ToolTip>
      </div>
    `,
  }),
};

export const CustomOffset: Story = {
  args: {
    content: 'Custom offset of 20px',
    placement: ToolTipPlacement.Top,
    offset: 20,
    showArrow: true,
  },
  render: args => ({
    components: { ToolTip },
    setup() {
      return { args };
    },
    template: `
      <ToolTip v-bind="args">
        <template #trigger>
          <button style="padding: 8px 16px; background: #17a2b8; color: white; border: none; border-radius: 4px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" onmouseover="this.style.background='#138496'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'" onmouseout="this.style.background='#17a2b8'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'">
            Custom Offset
          </button>
        </template>
      </ToolTip>
    `,
  }),
};

export const EventsDemo: Story = {
  args: {
    content: '查看Actions面板中的事件日志',
    placement: ToolTipPlacement.Top,
    showArrow: true,
  },
  render: args => ({
    components: { ToolTip },
    setup() {
      return { args };
    },
    template: `
      <div style="text-align: center;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          悬停按钮查看事件触发，在 Actions 面板中观察事件日志
        </p>
        <ToolTip v-bind="args" @show="args.onShow" @hide="args.onHide">
          <template #trigger>
            <button style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" onmouseover="this.style.background='#218838'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'" onmouseout="this.style.background='#28a745'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'">
              事件演示
            </button>
          </template>
        </ToolTip>
      </div>
    `,
  }),
};
