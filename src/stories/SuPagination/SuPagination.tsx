import React from 'react';

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
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
}

export const SuPagination: React.FC<SuPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  visiblePages = 5,
  size = 'md',
  showFirstLast = true,
  showPrevNext = true,
  disabled = false,
  className = '',
}) => {
  // 计算显示的页码范围
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(visiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // 调整范围以确保显示足够的页码
    if (endPage - startPage + 1 < visiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + visiblePages - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
      }
    }

    // 添加首页和省略号
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    // 添加中间页码
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // 添加末页和省略号
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    if (!disabled && page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'btn-xs';
      case 'sm': return 'btn-sm';
      case 'lg': return 'btn-lg';
      default: return '';
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  const visiblePagesList = getVisiblePages();
  const sizeClass = getSizeClass();
  const baseButtonClass = `btn ${sizeClass} ${disabled ? 'btn-disabled' : ''}`;

  return (
    <div className={`join ${className}`}>
      {/* 首页按钮 */}
      {showFirstLast && (
        <button
          className={`${baseButtonClass} join-item ${currentPage === 1 ? 'btn-disabled' : ''}`}
          onClick={() => handlePageClick(1)}
          disabled={disabled || currentPage === 1}
          aria-label="首页"
        >
          ««
        </button>
      )}

      {/* 上一页按钮 */}
      {showPrevNext && (
        <button
          className={`${baseButtonClass} join-item ${currentPage === 1 ? 'btn-disabled' : ''}`}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          aria-label="上一页"
        >
          «
        </button>
      )}

      {/* 页码按钮 */}
      {visiblePagesList.map((page, index) => {
        if (page === '...') {
          return (
            <button
              key={`ellipsis-${index}`}
              className={`${baseButtonClass} join-item btn-disabled`}
              disabled
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
            className={`${baseButtonClass} join-item ${isActive ? 'btn-active' : ''}`}
            onClick={() => handlePageClick(pageNum)}
            disabled={disabled}
            aria-label={`第 ${pageNum} 页`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNum}
          </button>
        );
      })}

      {/* 下一页按钮 */}
      {showPrevNext && (
        <button
          className={`${baseButtonClass} join-item ${currentPage === totalPages ? 'btn-disabled' : ''}`}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          aria-label="下一页"
        >
          »
        </button>
      )}

      {/* 末页按钮 */}
      {showFirstLast && (
        <button
          className={`${baseButtonClass} join-item ${currentPage === totalPages ? 'btn-disabled' : ''}`}
          onClick={() => handlePageClick(totalPages)}
          disabled={disabled || currentPage === totalPages}
          aria-label="末页"
        >
          »»
        </button>
      )}
    </div>
  );
};