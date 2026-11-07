// ============================================================================
// COMPONENT: CERTIFICATE MODAL (GIẤY CHỨNG NHẬN ĐẠT CHUẨN NĂNG LỰC FRONTEND FBU)
// Chứng thực học thuật phục vụ nghiệm thu Đề tài NCKH Viện CNTT FBU
// ============================================================================
import React from 'react';
import { StudentProfile } from '../../models/types';
import { Award, CheckCircle, Download, Printer, X, ShieldCheck, QrCode, Sparkles } from 'lucide-react';

interface CertificateModalProps {
  student: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  student,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const report = student.postTestReport || student.preTestReport;
  const score = report?.totalScore || 78;
  const issueDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const certId = `FBU-CS-2026-${student.code || 'A01'}-VERIFIED`;

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 11, 23, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div className="certificate-modal-container spatial-card" style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid rgba(56, 189, 248, 0.4)',
        borderRadius: '20px',
        maxWidth: '850px',
        width: '100%',
        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(56, 189, 248, 0.25)',
        overflow: 'hidden',
        position: 'relative',
        animation: 'fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Top Control Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 24px',
          background: 'var(--bg-card-subtle)',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 700, fontSize: '13px', letterSpacing: '0.04em' }}>
            <Award size={18} />
            <span>CHỨNG THỰC NĂNG LỰC HỌC THUẬT & DOANH NGHIỆP</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => window.print()}
              className="primary-action-btn"
              style={{ padding: '6px 14px', fontSize: '12.5px' }}
            >
              <Printer size={14} /> In / Xuất PDF
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Certificate Body (Official Layout) */}
        <div className="printable-certificate" style={{
          padding: '40px 36px',
          background: 'var(--bg-card)',
          border: '8px double var(--border-subtle)',
          margin: '20px',
          borderRadius: '14px',
          position: 'relative',
          textAlign: 'center',
          color: 'var(--text-main)'
        }}>
          {/* Watermark Logo */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.03,
            pointerEvents: 'none'
          }}>
            <ShieldCheck size={380} />
          </div>

          {/* Academic Header */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '12.5px', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              TRƯỜNG ĐẠI HỌC TÀI CHÍNH – NGÂN HÀNG HÀ NỘI (FBU)
            </div>
            <div style={{ fontSize: '15px', letterSpacing: '1.5px', color: 'var(--accent)', fontWeight: 800, marginTop: '4px' }}>
              VIỆN CÔNG NGHỆ THÔNG TIN • ĐỀ TÀI NCKH SINH VIÊN 2026
            </div>
            <div style={{ width: '80px', height: '2px', background: 'var(--accent)', margin: '12px auto' }}></div>
          </div>

          {/* Certificate Title */}
          <h1 style={{
            fontSize: '24px',
            color: 'var(--text-main)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontWeight: 800,
            marginBottom: '8px'
          }}>
            GIẤY CHỨNG NHẬN ĐẠT CHUẨN NĂNG LỰC
          </h1>
          <div style={{
            fontSize: '14.5px',
            color: 'var(--accent)',
            fontStyle: 'italic',
            marginBottom: '22px'
          }}>
            (Certificate of Frontend Competency for Intern/Fresher)
          </div>

          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Hội đồng Đánh giá Năng lực Khoa học Công nghệ Viện CNTT chứng nhận sinh viên:
          </p>

          {/* Student Name */}
          <h2 style={{
            fontSize: '30px',
            color: 'var(--accent)',
            fontWeight: 800,
            letterSpacing: '0.5px',
            margin: '8px 0 4px 0'
          }}>
            {student.name}
          </h2>
          <div style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Mã sinh viên: <strong style={{ color: 'var(--text-main)' }}>{student.code}</strong> • Định hướng chuyên môn: <strong style={{ color: 'var(--text-main)' }}>{student.targetRole}</strong>
          </div>

          <p style={{
            fontSize: '13px',
            color: 'var(--text-muted)',
            maxWidth: '620px',
            margin: '0 auto 24px auto',
            lineHeight: '1.6'
          }}>
            Đã hoàn thành xuất sắc chương trình đánh giá chẩn đoán khoảng cách kỹ năng và hoàn tất lộ trình học bổ sung cá nhân hóa theo mô hình DAG tiên quyết. Đạt yêu cầu năng lực thực tế doanh nghiệp với kết quả:
          </p>

          {/* Scores Overview Badge Grid */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '28px'
          }}>
            <div style={{
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-subtle)',
              padding: '10px 20px',
              borderRadius: '10px'
            }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>ĐIỂM NĂNG LỰC TỔNG</span>
              <strong style={{ fontSize: '20px', color: 'var(--color-success)' }}>{score}/100</strong>
            </div>

            <div style={{
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-subtle)',
              padding: '10px 20px',
              borderRadius: '10px'
            }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>CHUẨN DOANH NGHIỆP R(s)</span>
              <strong style={{ fontSize: '20px', color: 'var(--accent)' }}>70% (ĐẠT)</strong>
            </div>

            <div style={{
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-subtle)',
              padding: '10px 20px',
              borderRadius: '10px'
            }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>KỸ THUẬT GIT & RUBRIC</span>
              <strong style={{ fontSize: '20px', color: 'var(--color-purple)' }}>9/9 Điểm</strong>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 140px 1fr',
            alignItems: 'center',
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            {/* Left: Researcher */}
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '40px' }}>
                Hà Nội, ngày {issueDate}<br />
                <strong>TRƯỞNG NHÓM NGHIÊN CỨU</strong>
              </div>
              <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '14px' }}>Nguyễn Duy Hưng</div>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Viện CNTT FBU</div>
            </div>

            {/* Center: Verification Stamp / Seal */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '84px',
                height: '84px',
                margin: '0 auto',
                borderRadius: '50%',
                border: '2px dashed #f43f5e',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f43f5e',
                fontSize: '9px',
                fontWeight: 800,
                transform: 'rotate(-8deg)'
              }}>
                <span>★ FBU ★</span>
                <span>VIỆN CNTT</span>
                <span>CHỨNG THỰC</span>
              </div>
              <div style={{ fontSize: '9px', color: 'var(--text-dim)', marginTop: '6px', fontFamily: 'monospace' }}>
                {certId}
              </div>
            </div>

            {/* Right: Advisor */}
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '40px' }}>
                Xác nhận từ Viện CNTT FBU<br />
                <strong>GIẢNG VIÊN HƯỚNG DẪN</strong>
              </div>
              <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '14px' }}>Nguyễn Thanh Tuyên</div>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Giảng viên Viện CNTT FBU</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
