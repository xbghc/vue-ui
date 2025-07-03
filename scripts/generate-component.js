#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
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
 * 从模板文件读取内容并替换占位符
 */
function loadTemplate(templateName, names) {
  const templatePath = join(__dirname, 'templates', `${templateName}.template`);
  const template = readFileSync(templatePath, 'utf8');
  
  // 替换所有占位符
  return template
    .replace(/\{\{pascal\}\}/g, names.pascal)
    .replace(/\{\{kebab\}\}/g, names.kebab)
    .replace(/\{\{lower\}\}/g, names.lower);
}

/**
 * 生成组件模板
 */
function generateTemplates(componentName) {
  const names = formatComponentName(componentName);

  const templates = {
    vue: loadTemplate('vue', names),
    types: loadTemplate('types', names),
    composable: loadTemplate('composable', names),
    scss: loadTemplate('scss', names),
    stories: loadTemplate('stories', names),
    index: loadTemplate('index', names),
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
