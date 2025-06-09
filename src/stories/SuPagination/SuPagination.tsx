import React, { useMemo } from 'react';

export interface SuPaginationProps {
  /** 当前页码 */
  currentPage: number;
  /** 总页数 */
  totalPages: number;
  /** 页码变化回调 */
  onPageChange: (page: number) => void;
  /** 显示的页码按钮数量 */
  visiblePages?: number;
  /** 组件大小 */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** 是否显示首页/末页按钮 */
  showFirstLast?: boolean;
  /** 是否显示上一页/下一页按钮 */
  showPrevNext?: boolean;
  /** 是否显示跳转输入框 */
  showJumper?: boolean;
  /** 是否显示总页数信息 */
  showTotal?: boolean;
  /** 总页数信息的自定义渲染函数 */
  showTotalRender?: (total: number, current: number) => React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 是否简洁模式（只显示上一页/下一页） */
  simple?: boolean;
  /** 自定义按钮文本 */
  prevText?: string;
  nextText?: string;
  /** 快速跳转步长 */
  showQuickJumper?: boolean;
  /** 每页显示条数选择器 */
  showSizeChanger?: boolean;
  /** 每页显示条数 */
  pageSize?: number;
  /** 每页显示条数选项 */
  pageSizeOptions?: number[];
  /** 每页显示条数变化回调 */
  onPageSizeChange?: (pageSize: number) => void;
  /** 总数据条数 */
  total?: number;
}

export const SuPagination: React.FC<SuPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  visiblePages = 5,
  size = 'md',
  showFirstLast = false,
  showPrevNext = true,
  showJumper = false,
  showTotal = false,
  showTotalRender,
  disabled = false,
  className = '',
  simple = false,
  prevText = '‹',
  nextText = '›',
  showQuickJumper = false,
  showSizeChanger = false,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange,
  total,
}) => {
  // 输入框状态
  const [jumpValue, setJumpValue] = React.useState('');

  // 计算显示的页码范围
  const visiblePagesList = useMemo(() => {
    if (simple) return [];
    
    const pages: (number | string)[] = [];
    
    // 如果总页数小于等于可见页数，直接显示所有页码
    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // 计算需要为省略号和首末页预留的位置
    const reservedSlots = 2; // 为省略号预留的位置
    const actualVisiblePages = visiblePages - reservedSlots;
    const halfVisible = Math.floor(actualVisiblePages / 2);

    let startPage: number;
    let endPage: number;

    if (currentPage <= halfVisible + 1) {
      // 当前页在前半部分
      startPage = 1;
      endPage = actualVisiblePages;
    } else if (currentPage >= totalPages - halfVisible) {
      // 当前页在后半部分
      startPage = totalPages - actualVisiblePages + 1;
      endPage = totalPages;
    } else {
      // 当前页在中间部分
      startPage = currentPage - halfVisible;
      endPage = currentPage + halfVisible;
    }

    // 添加首页
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    // 添加中间页码
    for (let i = startPage; i <= endPage; i++) {
      // 避免重复添加首页
      if (i > 1 || startPage === 1) {
        pages.push(i);
      }
    }

    // 添加末页
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      // 避免重复添加末页
      if (endPage < totalPages) {
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages, visiblePages, simple]);

  const handlePageClick = (page: number) => {
    if (!disabled && page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleJump = () => {
    const page = parseInt(jumpValue, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      handlePageClick(page);
      setJumpValue('');
    }
  };

  const handleJumpKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJump();
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(e.target.value, 10);
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'btn-xs text-xs';
      case 'sm': return 'btn-sm text-sm';
      case 'lg': return 'btn-lg text-lg';
      default: return 'text-sm';
    }
  };

  const getInputSizeClass = () => {
    switch (size) {
      case 'xs': return 'input-xs';
      case 'sm': return 'input-sm';
      case 'lg': return 'input-lg';
      default: return '';
    }
  };

  const getSelectSizeClass = () => {
    switch (size) {
      case 'xs': return 'select-xs';
      case 'sm': return 'select-sm';
      case 'lg': return 'select-lg';
      default: return '';
    }
  };

  if (totalPages <= 1 && !showTotal && !showSizeChanger) {
    return null;
  }

  const sizeClass = getSizeClass();
  const inputSizeClass = getInputSizeClass();
  const selectSizeClass = getSelectSizeClass();
  const baseButtonClass = `btn btn-ghost ${sizeClass} ${disabled ? 'btn-disabled' : ''}`;

  // 简洁模式
  if (simple) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showTotal && (
          <div className={`text-gray-600 ${sizeClass}`}>
            {showTotalRender 
              ? showTotalRender(totalPages, currentPage)
              : `${currentPage} / ${totalPages}`
            }
          </div>
        )}
        
        <div className="join">
          <button
            className={`${baseButtonClass} ${currentPage === 1 ? 'btn-disabled' : ''}`}
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={disabled || currentPage === 1}
            aria-label="上一页"
          >
            {prevText}
          </button>
          
          <button
            className={`${baseButtonClass} ${currentPage === totalPages ? 'btn-disabled' : ''}`}
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={disabled || currentPage === totalPages}
            aria-label="下一页"
          >
            {nextText}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* 总数信息 */}
      {showTotal && (
        <div className={`text-gray-600 ${sizeClass}`}>
          {showTotalRender 
            ? showTotalRender(total || totalPages, currentPage)
            : total 
              ? `共 ${total} 条，第 ${currentPage} / ${totalPages} 页`
              : `第 ${currentPage} / ${totalPages} 页`
          }
        </div>
      )}

      {/* 每页显示条数选择器 */}
      {showSizeChanger && onPageSizeChange && (
        <div className="flex items-center gap-2">
          <span className={`text-gray-600 ${sizeClass}`}>每页</span>
          <select
            className={`select select-bordered ${selectSizeClass}`}
            value={pageSize}
            onChange={handlePageSizeChange}
            disabled={disabled}
          >
            {pageSizeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className={`text-gray-600 ${sizeClass}`}>条</span>
        </div>
      )}

      {/* 分页按钮组 */}
      <div className="join">
        {/* 首页按钮 */}
        {showFirstLast && currentPage > 1 && (
          <button
            className={`${baseButtonClass} ${currentPage === 1 ? 'btn-disabled' : ''}`}
            onClick={() => handlePageClick(1)}
            disabled={disabled}
            aria-label="首页"
          >
            «
          </button>
        )}

        {/* 上一页按钮 */}
        {showPrevNext && (
          <button
            className={`${baseButtonClass} ${currentPage === 1 ? 'btn-disabled' : ''}`}
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={disabled || currentPage === 1}
            aria-label="上一页"
          >
            {prevText}
          </button>
        )}

        {/* 快速后退按钮 */}
        {showQuickJumper && currentPage > 5 && (
          <button
            className={baseButtonClass}
            onClick={() => handlePageClick(Math.max(1, currentPage - 5))}
            disabled={disabled}
            aria-label="向前5页"
            title="向前5页"
          >
            ««
          </button>
        )}

        {/* 页码按钮 */}
        {visiblePagesList.map((page, index) => {
          if (page === '...') {
            return (
              <button
                key={`ellipsis-${index}`}
                className={`${baseButtonClass} btn-disabled cursor-default`}
                disabled
                tabIndex={-1}
              >
                ...
              </button>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              className={`${baseButtonClass} ${isActive ? 'btn-active btn-primary' : 'hover:btn-primary'}`}
              onClick={() => handlePageClick(pageNum)}
              disabled={disabled}
              aria-label={`第 ${pageNum} 页`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          );
        })}

        {/* 快速前进按钮 */}
        {showQuickJumper && currentPage < totalPages - 4 && (
          <button
            className={baseButtonClass}
            onClick={() => handlePageClick(Math.min(totalPages, currentPage + 5))}
            disabled={disabled}
            aria-label="向后5页"
            title="向后5页"
          >
            »»
          </button>
        )}

        {/* 下一页按钮 */}
        {showPrevNext && (
          <button
            className={`${baseButtonClass} ${currentPage === totalPages ? 'btn-disabled' : ''}`}
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={disabled || currentPage === totalPages}
            aria-label="下一页"
          >
            {nextText}
          </button>
        )}

        {/* 末页按钮 */}
        {showFirstLast && currentPage < totalPages && (
          <button
            className={`${baseButtonClass} ${currentPage === totalPages ? 'btn-disabled' : ''}`}
            onClick={() => handlePageClick(totalPages)}
            disabled={disabled}
            aria-label="末页"
          >
            »
          </button>
        )}
      </div>

      {/* 跳转输入框 */}
      {showJumper && (
        <div className="flex items-center gap-2">
          <span className={`text-gray-600 ${sizeClass}`}>跳至</span>
          <input
            type="number"
            className={`input input-bordered w-16 ${inputSizeClass}`}
            min={1}
            max={totalPages}
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            onKeyPress={handleJumpKeyPress}
            disabled={disabled}
            placeholder="页码"
          />
          <span className={`text-gray-600 ${sizeClass}`}>页</span>
          <button
            className={`btn btn-primary ${sizeClass}`}
            onClick={handleJump}
            disabled={disabled || !jumpValue}
          >
            跳转
          </button>
        </div>
      )}
    </div>
  );
};