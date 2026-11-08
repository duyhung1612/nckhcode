// ============================================================================
// COMPONENT: ERROR BOUNDARY (BẢO VỆ GIAO DIỆN KHỎI SẬP MÀN HÌNH ĐEN TRẮNG)
// ============================================================================
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, RotateCcw } from 'lucide-react';
import { StorageModel } from '../../models/storage';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleResetProfile = () => {
    StorageModel.resetStudentToInitial('STU_001');
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="error-boundary-card spatial-card"
          style={{
            maxWidth: '560px',
            margin: '40px auto',
            padding: '36px 28px',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(16px)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-spatial)'
          }}
        >
          <div 
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(244, 63, 94, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
              boxShadow: '0 0 24px rgba(244, 63, 94, 0.25)'
            }}
          >
            <AlertTriangle size={32} color="var(--color-danger)" />
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            Hệ thống đã tự phục hồi giao diện
          </h2>

          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
            Đã phát hiện lỗi tải dữ liệu khi chuyển đổi hồ sơ. Dữ liệu đã được bảo toàn an toàn. Vui lòng tải lại trang hoặc khôi phục hồ sơ chuẩn ban đầu.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={this.handleReload}
              className="primary-action-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <RefreshCw size={15} /> Tải lại giao diện
            </button>
            <button
              onClick={this.handleResetProfile}
              className="secondary-action-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <RotateCcw size={15} /> Khôi phục Hồ sơ A01
            </button>
          </div>

          {Boolean(import.meta.env?.DEV) && this.state.error && (
            <details style={{ marginTop: '20px', textAlign: 'left', fontSize: '11px', color: 'var(--text-dim)' }}>
              <summary style={{ cursor: 'pointer', marginBottom: '6px' }}>Chi tiết kỹ thuật (Debug)</summary>
              <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '4px', overflowX: 'auto' }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
