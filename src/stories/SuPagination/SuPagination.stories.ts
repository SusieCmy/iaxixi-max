import type { Meta, StoryObj } from '@storybook/react';
import { SuPagination } from './SuPagination';

const meta: Meta<typeof SuPagination> = {
  title: 'Components/SuPagination',
  component: SuPagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '一个功能完整的分页组件，支持多种显示模式和交互方式。',
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
      description: '页码变化回调',
    },
    visiblePages: {
      control: { type: 'number', min: 3, max: 15 },
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
    showJumper: {
      control: { type: 'boolean' },
      description: '是否显示跳转输入框',
    },
    showTotal: {
      control: { type: 'boolean' },
      description: '是否显示总页数信息',
    },
    showQuickJumper: {
      control: { type: 'boolean' },
      description: '是否显示快速跳转按钮（±5页）',
    },
    showSizeChanger: {
      control: { type: 'boolean' },
      description: '是否显示每页条数选择器',
    },
    simple: {
      control: { type: 'boolean' },
      description: '是否启用简洁模式',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用组件',
    },
    prevText: {
      control: { type: 'text' },
      description: '上一页按钮文本',
    },
    nextText: {
      control: { type: 'text' },
      description: '下一页按钮文本',
    },
    pageSize: {
      control: { type: 'number', min: 1 },
      description: '每页显示条数',
    },
    total: {
      control: { type: 'number', min: 0 },
      description: '总数据条数',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础用法
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

// 当前页在中间
export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
};

// 大量页面
export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 100,
    visiblePages: 7,
  },
};

// 不同尺寸
export const ExtraSmall: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    size: 'lg',
  },
};

// 显示首页末页按钮
export const WithFirstLast: Story = {
  args: {
    currentPage: 10,
    totalPages: 50,
    showFirstLast: true,
  },
};

// 不显示上一页下一页
export const WithoutPrevNext: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    showPrevNext: false,
  },
};

// 自定义上一页下一页文本
export const CustomPrevNext: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    prevText: 'Prev',
    nextText: 'Next',
  },
};

// 显示跳转功能
export const WithJumper: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    showJumper: true,
  },
};

// 显示总页数信息
export const WithTotal: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    total: 200,
    showTotal: true,
  },
};

// 显示每页条数选择器
export const WithSizeChanger: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
    showSizeChanger: true,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
  },
};

// 快速跳转按钮
export const WithQuickJumper: Story = {
  args: {
    currentPage: 20,
    totalPages: 50,
    showQuickJumper: true,
  },
};

// 完整功能
export const FullFeatures: Story = {
  args: {
    currentPage: 8,
    totalPages: 25,
    total: 250,
    pageSize: 10,
    showTotal: true,
    showJumper: true,
    showSizeChanger: true,
    showFirstLast: true,
    showQuickJumper: true,
    visiblePages: 7,
  },
};

// 简洁模式
export const Simple: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    simple: true,
  },
};

// 简洁模式带总数
export const SimpleWithTotal: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    simple: true,
    showTotal: true,
  },
};

// 禁用状态
export const Disabled: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    disabled: true,
  },
};

// 只有一页（不显示）
export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
};

// 边界情况 - 第一页
export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
    showFirstLast: true,
    showQuickJumper: true,
  },
};

// 边界情况 - 最后一页
export const LastPage: Story = {
  args: {
    currentPage: 20,
    totalPages: 20,
    showFirstLast: true,
    showQuickJumper: true,
  },
};

// 较少页面
export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    showFirstLast: true,
  },
};

// 移动端适配
export const Mobile: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    simple: true,
    size: 'sm',
    showTotal: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};