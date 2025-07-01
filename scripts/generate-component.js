#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 将组件名转换为不同的命名格式
 */
function formatComponentName(name) {
  // 确保首字母大写的 PascalCase
  const pascalCase = name.charAt(0).toUpperCase() + name.slice(1);
  // kebab-case (用于CSS类名和文件名)
  const kebabCase = name
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');

  return {
    pascal: pascalCase,
    kebab: kebabCase,
    lower: name.toLowerCase(),
  };
}

/**
 * 生成组件模板
 */
function generateTemplates(componentName) {
  const names = formatComponentName(componentName);

  const templates = {
    // 主组件文件
    vue: `<template>
  <div class="${names.kebab}">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ${names.lower}Props, ${names.lower}Emits } from './${names.kebab}-types';
import { use${names.pascal} } from './use-${names.kebab}';

defineOptions({
  name: '${names.pascal}',
});

const props = defineProps(${names.lower}Props);
const emit = defineEmits<${names.lower}Emits>();

const { /* 在这里解构 composable 返回的响应式数据和方法 */ } = use${names.pascal}(props, emit);
</script>

<!-- 
  样式文件位置: src/components/${names.pascal}/${names.kebab}.scss
  全局样式入口: src/styles/index.scss
-->
`,

    // 类型定义文件
    types: `import type { ExtractPropTypes, PropType } from 'vue';

/**
 * ${names.pascal} 组件属性定义
 */
export const ${names.lower}Props = {
  // 在这里定义组件的 props
  // 示例:
  // /** 是否禁用 */
  // disabled: {
  //   type: Boolean,
  //   default: false,
  // },
} as const;

/**
 * ${names.pascal} 组件事件定义
 */
export const ${names.lower}Emits = [
  // 在这里定义组件的事件
  // 示例: 'click', 'change'
];

/**
 * ${names.pascal} 组件属性类型
 */
export type ${names.pascal}Props = ExtractPropTypes<typeof ${names.lower}Props>;

/**
 * ${names.pascal} 组件事件类型
 */
export type ${names.pascal}Emits = typeof ${names.lower}Emits;
`,

    // Composable 文件
    composable: `import type { ${names.pascal}Props, ${names.pascal}Emits } from './${names.kebab}-types';

/**
 * ${names.pascal} 组件的组合式函数
 * @param props - 组件属性
 * @param emit - 事件发射器
 */
export function use${names.pascal}(
  props: ${names.pascal}Props,
  emit: (event: any, ...args: any[]) => void,
) {
  // 在这里实现组件的逻辑
  
  // 返回需要在组件中使用的响应式数据和方法
  return {
    // 示例返回值
  };
}
`,

    // 样式文件
    scss: `.${names.kebab} {
  // 在这里添加组件的样式
  
  // 示例:
  // display: block;
  // padding: 8px;
}
`,

    // Storybook 故事文件
    stories: `import type { Meta, StoryObj } from '@storybook/vue3';
import ${names.pascal} from './${names.pascal}.vue';

const meta = {
  title: 'Components/${names.pascal}',
  component: ${names.pascal},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '${names.pascal} 组件的描述',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // 在这里定义 Storybook 控件
  },
} satisfies Meta<typeof ${names.pascal}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // 默认参数
  },
};

export const Example: Story = {
  args: {
    // 示例参数
  },
  render: (args) => ({
    components: { ${names.pascal} },
    setup() {
      return { args };
    },
    template: \`
      <${names.pascal} v-bind="args">
        示例内容
      </${names.pascal}>
    \`,
  }),
};
`,

    // 导出文件
    index: `import type { App } from 'vue';
import ${names.pascal} from './${names.pascal}.vue';

// 按需导入时引入样式
// 样式由全局样式文件引入: src/styles/index.scss

/**
 * 为 ${names.pascal} 组件添加全局安装方法
 */
${names.pascal}.install = (app: App) => {
  app.component('${names.pascal}', ${names.pascal});
};

// ===== 组件导出 =====
export { ${names.pascal} };
export default ${names.pascal};

// ===== 类型导出 =====
export type { ${names.pascal}Props, ${names.pascal}Emits } from './${names.kebab}-types';

// ===== Hooks 导出 =====
export { use${names.pascal} } from './use-${names.kebab}';
`,
  };

  return templates;
}

/**
 * 创建组件文件夹和文件
 */
function createComponent(componentName) {
  const names = formatComponentName(componentName);
  const componentsDir = join(process.cwd(), 'src', 'components');
  const componentDir = join(componentsDir, names.pascal);

  // 检查组件是否已存在
  if (existsSync(componentDir)) {
    console.error(`❌ 组件 ${names.pascal} 已存在！`);
    process.exit(1);
  }

  // 创建组件文件夹
  mkdirSync(componentDir, { recursive: true });

  // 生成模板
  const templates = generateTemplates(componentName);

  // 创建文件
  const files = [
    { name: `${names.pascal}.vue`, content: templates.vue },
    { name: `${names.kebab}-types.ts`, content: templates.types },
    { name: `use-${names.kebab}.ts`, content: templates.composable },
    { name: `${names.kebab}.scss`, content: templates.scss },
    { name: `${names.pascal}.stories.ts`, content: templates.stories },
    { name: 'index.ts', content: templates.index },
  ];

  files.forEach(file => {
    const filePath = join(componentDir, file.name);
    writeFileSync(filePath, file.content, 'utf8');
    console.log(`✅ 创建文件: ${file.name}`);
  });

  console.log(`\n🎉 组件 ${names.pascal} 创建成功！`);
  console.log(`📁 位置: src/components/${names.pascal}/`);
  console.log('\n📝 接下来的步骤:');
  console.log('1. 在 src/styles/index.scss 中引入样式:');
  console.log(`   @use '../components/${names.pascal}/${names.kebab}.scss';`);
  console.log('2. 在 src/index.ts 中导出新组件:');
  console.log(`   export * from './components/${names.pascal}';`);
  console.log('3. 在全局安装函数中注册组件 (src/index.ts):');
  console.log(`   app.component('${names.pascal}', ${names.pascal});`);
  console.log('4. 如果需要按需导入，更新 package.json 的 exports 字段');
  console.log('5. 开始在 Storybook 中开发和测试组件:');
  console.log('   npm run storybook');
}

// 主程序
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('❌ 请提供组件名称！');
    console.log('💡 使用方法: npm run generate:component <ComponentName>');
    console.log('💡 示例: npm run generate:component Button');
    process.exit(1);
  }

  const componentName = args[0];

  // 验证组件名称
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
    console.error('❌ 组件名称必须以大写字母开头，只能包含字母和数字！');
    console.log('💡 正确示例: Button, DatePicker, MyComponent');
    process.exit(1);
  }

  console.log(`🚀 正在创建组件: ${componentName}`);
  createComponent(componentName);
}

main();
