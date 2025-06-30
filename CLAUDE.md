# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + TypeScript component library with Tree Shaking support, currently containing a ToolTip component. The library uses modern tools including Vite for building, Storybook for component development, and comprehensive linting/formatting.

## Common Commands

### Development

- `npm run storybook` - Start Storybook development environment on port 6006

### Building

- `npm run build` - Build library (runs type check + Vite build)
- `npm run build:watch` - Build with watch mode
- `npm run build-storybook` - Build Storybook static files

### Code Quality

- `npm run type-check` - Run Vue TypeScript compiler check
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check Prettier formatting
- `npm run check` - Run all checks (type + lint + format)
- `npm run fix` - Fix all auto-fixable issues (lint + format)

### Utilities

- `npm run clean` - Remove dist and storybook-static directories

## Architecture

### Library Structure

- **Entry Point**: `src/index.ts` - Main export file with install function and component exports
- **Components**: `src/components/` - Individual component folders
- **Styles**: `src/styles/index.scss` - Global styles imported by main entry

### Component Architecture (ToolTip Example)

Each component follows this structure:

- `ComponentName.vue` - Main component file
- `component-types.ts` - Props, emits, and type definitions
- `use-component.ts` - Composable with component logic
- `component.scss` - Component-specific styles
- `ComponentName.stories.ts` - Storybook stories
- `index.ts` - Component exports

### Build Configuration

- **Vite**: Configured for library builds with ES and UMD formats
- **TypeScript**: Full type generation with vite-plugin-dts
- **External Dependencies**: Vue is externalized, @floating-ui/dom is bundled
- **CSS**: SCSS preprocessing with global variables support

### Type System

- Uses Vue 3 TypeScript patterns with `defineProps` and typed emits
- Enums for component options (e.g., `ToolTipPlacement`, `ToolTipTrigger`)
- Proper prop validation with PropType casting
- Composables return typed reactive objects

### Development Tools

- **ESLint 9.x**: Flat config format with Vue 3 and TypeScript rules
- **Prettier**: Consistent code formatting
- **Storybook**: Component development and documentation
- **Floating UI**: For positioning tooltips and similar floating elements

## Development Guidelines

### Project Philosophy

**Modern First, No Legacy Support**: This project prioritizes modern web standards and does not maintain backward compatibility with outdated versions. We use the latest stable APIs and features without legacy fallbacks.

### Adding New Components

1. Create component folder in `src/components/`
2. Follow the ToolTip component structure
3. Export from component's `index.ts`
4. Add to main `src/index.ts` exports
5. Create Storybook stories
6. Update package.json exports if needed for individual imports

### Code Standards

- Use Composition API with `<script setup>`
- Define props and emits in separate types files
- Use enums for component option values
- Follow Vue 3 best practices for component composition
- Provide accessibility support with proper ARIA attributes
- Generate unique IDs for element associations (e.g., `aria-describedby`)
- Use Teleport for overlay components
- **Always use latest stable APIs** - Do not add fallbacks for deprecated methods
- **Target modern environments** - ES2020+ features are preferred over polyfills

### Testing Workflow

Always run code quality checks before committing:

```bash
npm run check  # Runs type-check + lint + format:check
```

Use `npm run fix` to automatically resolve linting and formatting issues.
