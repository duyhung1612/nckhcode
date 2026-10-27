// ============================================================================
// COMPONENT: CERTIFICATE MODAL (GIẤY CHỨNG NHẬN ĐẠT CHUẨN NĂNG LỰC FRONTEND FBU)
// Chứng thực học thuật phục vụ nghiệm thu Đề tài NCKH Viện CNTT FBU
// ============================================================================
import React from 'react';
import { StudentProfile } from '../../models/types';
import { Award, CheckCircle, Download, Printer, X, ShieldCheck, QrCode } from 'lucide-react';

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
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div className="certificate-modal-container" style={{
        backgroundColor: '#0f172a',
        border: '2px solid #38bdf8',
        borderRadius: '16px',
        maxWidth: '850px',
        width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.3)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Top Control Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 20px',
          background: 'rgba(30, 41, 59, 0.8)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 600 }}>
            <Award size={18} />
            <span>CHỨNG THỰC NĂNG LỰC HỌC THUẬT & DOANH NGHIỆP</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => window.print()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#0284c7',
                color: '#fff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '13px'
              }}
            >
              <Printer size={14} /> In / Xuất PDF
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Certificate Body (Official Layout) */}
        <div className="printable-certificate" style={{
          padding: '40px',
          background: 'linear-gradient(135deg, #0b1329 0%, #080d1a 100%)',
          border: '8px double #1e293b',
          margin: '16px',
          borderRadius: '12px',
          position: 'relative',
          textAlign: 'center',
          color: '#f8fafc'
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
            <div style={{ fontSize: '13px', letterSpacing: '2px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
              TRƯỜNG ĐẠI HỌC TÀI CHÍNH – NGÂN HÀNG HÀ NỘI (FBU)
            </div>
            <div style={{ fontSize: '15px', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: 800, marginTop: '4px' }}>
              VIỆN CÔNG NGHỆ THÔNG TIN • ĐỀ TÀI NCKH SINH VIÊN 2026
            </div>
            <div style={{ width: '80px', height: '2px', background: '#38bdf8', margin: '12px auto' }}></div>
          </div>

          {/* Certificate Title */}
          <h1 style={{
            fontSize: '24px',
            color: '#f1f5f9',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontWeight: 800,
            marginBottom: '12px'
          }}>
            GIẤY CHỨNG NHẬN ĐẠT CHUẨN NĂNG LỰC
          </h1>
          <div style={{
            fontSize: '15px',
            color: '#38bdf8',
            fontStyle: 'italic',
            marginBottom: '24px'
          }}>
            (Certificate of Frontend Competency for Intern/Fresher)
          </div>

          <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px' }}>
            Hội đồng Đánh giá Năng lực Khoa học Công nghệ Viện CNTT chứng nhận sinh viên:
          </p>

          {/* Student Name */}
          <h2 style={{
            fontSize: '30px',
            color: '#38bdf8',
            fontWeight: 800,
            letterSpacing: '0.5px',
            margin: '8px 0 4px 0'
          }}>
            {student.name}
          </h2>
          <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '20px' }}>
            Mã sinh viên: <strong>{student.code}</strong> • Định hướng chuyên môn: <strong>{student.targetRole}</strong>
          </div>

          <p style={{
            fontSize: '13px',
            color: '#94a3b8',
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
              background: 'rgba(30, 41, 59, 0.7)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              padding: '10px 18px',
              borderRadius: '8px'
            }}>
              <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>ĐIỂM NĂNG LỰC TỔNG</span>
              <strong style={{ fontSize: '20px', color: '#10b981' }}>{score}/100</strong>
            </div>

            <div style={{
              background: 'rgba(30, 41, 59, 0.7)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              padding: '10px 18px',
              borderRadius: '8px'
            }}>
              <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>CHUẨN DOANH NGHIỆP R(s)</span>
              <strong style={{ fontSize: '20px', color: '#38bdf8' }}>70% (ĐẠT)</strong>
            </div>

            <div style={{
              background: 'rgba(30, 41, 59, 0.7)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              padding: '10px 18px',
              borderRadius: '8px'
            }}>
              <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>KỸ THUẬT GIT & RUBRIC</span>
              <strong style={{ fontSize: '20px', color: '#a855f7' }}>9/9 Điểm</strong>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 140px 1fr',
            alignItems: 'center',
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {/* Left: Researcher */}
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '40px' }}>
                Hà Nội, ngày {issueDate}<br />
                <strong>TRƯỞNG NHÓM NGHIÊN CỨU</strong>
              </div>
              <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '14px' }}>Nguyễn Duy Hưng</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Viện CNTT FBU</div>
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
              <div style={{ fontSize: '9px', color: '#64748b', marginTop: '6px', fontFamily: 'monospace' }}>
                {certId}
              </div>
            </div>

            {/* Right: Advisor */}
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '40px' }}>
                Xác nhận từ Viện CNTT FBU<br />
                <strong>GIẢNG VIÊN HƯỚNG DẪN</strong>
              </div>
              <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '14px' }}>Nguyễn Thanh Tuyên</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Giảng viên Viện CNTT FBU</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
