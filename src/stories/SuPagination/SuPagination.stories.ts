import type { Meta, StoryObj } from '@storybook/react';
import { SuPagination } from './SuPagination';

const meta: Meta<typeof SuPagination> = {
  title: 'Components/SuPagination',
  component: SuPagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '基于 DaisyUI 的分页组件，支持多种配置选项和交互状态。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: '当前页码',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: '总页数',
    },
    onPageChange: {
      action: 'page-changed',
      description: '页码变化回调函数',
    },
    visiblePages: {
      control: { type: 'number', min: 3, max: 10 },
      description: '显示的页码按钮数量',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: '组件大小',
    },
    showFirstLast: {
      control: { type: 'boolean' },
      description: '是否显示首页/末页按钮',
    },
    showPrevNext: {
      control: { type: 'boolean' },
      description: '是否显示上一页/下一页按钮',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用',
    },
    className: {
      control: { type: 'text' },
      description: '自定义类名',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础示例
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    visiblePages: 5,
    size: 'md',
    showFirstLast: true,
    showPrevNext: true,
    disabled: false,
  },
};

// 禁用状态
export const Disabled: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '禁用状态下的分页组件，所有按钮都不可点击。',
      },
    },
  },
};