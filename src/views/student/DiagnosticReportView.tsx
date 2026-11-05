// ============================================================================
// VIEW: DIAGNOSTIC REPORT VIEW (BÁO CÁO CHẨN ĐOÁN KHOẢNG CÁCH KỸ NĂNG)
// Trực quan hóa C(s), R(s)=70, Gap(s) và giải trình sư phạm minh bạch
// ============================================================================
import React, { useState } from 'react';
import { StudentProfile } from '../../models/types';
import { RadarChart } from '../components/RadarChart';
import { DagGraphViewer } from '../components/DagGraphViewer';
import { CertificateModal } from '../components/CertificateModal';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Compass, 
  Target, 
  BookOpen, 
  ArrowRight, 
  Printer, 
  Award, 
  Network, 
  LayoutGrid 
} from 'lucide-react';

interface DiagnosticReportViewProps {
  student: StudentProfile;
  onNavigateToRoadmap: () => void;
  onRetakeExam: () => void;
}

export const DiagnosticReportView: React.FC<DiagnosticReportViewProps> = ({
  student,
  onNavigateToRoadmap,
  onRetakeExam
}) => {
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [visualMode, setVisualMode] = useState<'both' | 'radar' | 'dag'>('both');

  const report = student.preTestReport;

  if (!report) {
    return (
      <div className="empty-state-card">
        <Compass size={48} color="#38bdf8" />
        <h2>Chưa có dữ liệu chẩn đoán</h2>
        <p>Sinh viên chưa làm bài kiểm tra tiền kiểm. Vui lòng thực hiện bài đánh giá để nhận chẩn đoán lỗ hổng kỹ năng.</p>
        <button className="primary-action-btn" onClick={onRetakeExam}>
          Bắt đầu làm bài đánh giá ngay
        </button>
      </div>
    );
  }

  const weakSkills = report.skillScores.filter(s => s.gap > 0);
  const strongSkills = report.skillScores.filter(s => s.gap === 0);

  return (
    <div className="diagnostic-view-container">
      {/* Top Banner Overview */}
      <div className="report-hero-banner">
        <div className="hero-text">
          <div className="hero-badge">BÁO CÁO CHẨN ĐOÁN NĂNG LỰC ĐẦU VÀO (PRE-TEST)</div>
          <h2 className="hero-title">Hồ sơ: {student.name} ({student.code})</h2>
          <p className="hero-desc">
            Vị trí hướng tới: <strong>{student.targetRole}</strong> • Thời điểm hoàn thành: <strong>{report.completedAt}</strong>
          </p>
          <div className="report-action-links" style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              className="secondary-action-btn"
              onClick={() => window.print()}
              title="In bản đánh giá chính thức có chữ ký GVHD & Sinh viên phục vụ lưu hồ sơ NCKH"
            >
              <Printer size={15} /> In Phiếu Báo Cáo NCKH (PDF)
            </button>
            <button
              className="secondary-action-btn"
              onClick={() => setShowCertificate(true)}
              style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#fff', border: '1px solid #38bdf8' }}
              title="Xem Giấy chứng nhận Đạt chuẩn Năng lực FBU"
            >
              <Award size={15} /> Xem Giấy Chứng Nhận FBU
            </button>
          </div>
        </div>

        {/* Key Stats Cards */}
        <div className="hero-stat-cards">
          <div className="stat-card">
            <span className="stat-label">Điểm tổng kết</span>
            <div className="stat-value" style={{ color: report.totalScore >= 70 ? '#10b981' : '#f59e0b' }}>
              {report.totalScore}<span className="stat-unit">/100</span>
            </div>
            <span className="stat-sub">Chuẩn doanh nghiệp: 70</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Lỗ hổng kỹ năng</span>
            <div className="stat-value text-rose">
              {weakSkills.length}<span className="stat-unit">/{report.skillScores.length} nhóm</span>
            </div>
            <span className="stat-sub">Cần học bổ sung</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Thời lượng bổ sung</span>
            <div className="stat-value text-sky">
              {report.totalRecommendedHours}<span className="stat-unit"> giờ</span>
            </div>
            <span className="stat-sub">Khuyến nghị: 7–10 ngày</span>
          </div>
        </div>
      </div>

      {/* Main Diagnostic Body */}
      <div className="report-main-grid">
        {/* Left: SVG Radar Chart */}
        <div className="card-panel radar-panel">
          <div className="panel-header radar-card-header">
            <div className="panel-header-left">
              <Target size={18} color="#38bdf8" />
              <h3 style={{ margin: 0 }}>Biểu đồ Mạng nhện Năng lực (Competency Radar)</h3>
            </div>

            {/* Cụm Switcher góc trên bên phải của Card */}
            <div className="chart-switcher-group">
              <button
                className={`chart-switcher-btn ${visualMode === 'both' ? 'active' : ''}`}
                onClick={() => setVisualMode('both')}
                title="Hiển thị cả Biểu đồ Radar và Sơ đồ Tiên quyết DAG"
              >
                <LayoutGrid size={13} /> Toàn cảnh (Radar + DAG)
              </button>
              <button
                className={`chart-switcher-btn ${visualMode === 'radar' ? 'active' : ''}`}
                onClick={() => setVisualMode('radar')}
                title="Chỉ hiển thị Biểu đồ Radar"
              >
                <Target size={13} /> Biểu đồ Radar
              </button>
              <button
                className={`chart-switcher-btn ${visualMode === 'dag' ? 'active' : ''}`}
                onClick={() => {
                  setVisualMode('dag');
                  setTimeout(() => {
                    document.getElementById('prerequisite-dag-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 60);
                }}
                title="Tập trung xem Sơ đồ Tiên quyết DAG"
              >
                <Network size={13} /> Sơ đồ Tiên quyết DAG
              </button>
            </div>
          </div>

          <p className="panel-sub">
            Vùng xanh thể hiện mức năng lực hiện tại C(s). Vạch cam nét đứt là chuẩn đầu vào thực tập sinh R(s) = 70%.
          </p>

          {visualMode !== 'dag' ? (
            <>
              <RadarChart skillScores={report.skillScores} size={420} />

              <div className="pedagogical-callout">
                <h4>💡 Giải trình chẩn đoán sư phạm:</h4>
                {weakSkills.some(s => s.skillGroupId === 'G2') && weakSkills.some(s => s.skillGroupId === 'G3') ? (
                  <p>
                    Sinh viên có điểm <strong>React ({report.skillScores.find(s => s.skillGroupId === 'G3')?.currentScore}%)</strong> thấp 
                    một phần lớn do bị hổng nền tảng <strong>JavaScript & DOM ({report.skillScores.find(s => s.skillGroupId === 'G2')?.currentScore}%)</strong>. 
                    Theo quan hệ tiên quyết, hệ thống sẽ yêu cầu củng cố JavaScript trước khi luyện tập chuyên sâu về React Hooks.
                  </p>
                ) : weakSkills.some(s => s.skillGroupId === 'G5') ? (
                  <p>
                    Sinh viên có tư duy lập trình khá tốt nhưng thiếu hụt kỹ năng <strong>Git/GitHub & DevTools ({report.skillScores.find(s => s.skillGroupId === 'G5')?.currentScore}%)</strong>. 
                    Vì Git là kỹ năng độc lập, sinh viên có thể nhanh chóng bổ sung nhánh và quy trình làm việc nhóm trong 4 giờ đầu tiên.
                  </p>
                ) : (
                  <p>
                    Mức độ thiếu hụt phân bổ đều ở một số kỹ năng thành phần. Lộ trình học sẽ ưu tiên các nhóm có tích số trọng số nhân khoảng cách lớn nhất.
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="dag-focus-placeholder">
              <Network size={36} color="#38bdf8" />
              <p>
                <strong>Đang kích hoạt chế độ xem Sơ đồ Tiên quyết DAG bên dưới.</strong>
              </p>
              <p className="sub-text">
                Biểu đồ Radar được thu gọn để tối ưu không gian kiểm tra quan hệ phụ thuộc tiên quyết giữa các khối kiến thức.
              </p>
            </div>
          )}
        </div>

        {/* Right: Detailed Skill Gap Breakdown */}
        <div className="card-panel gaps-panel">
          <div className="panel-header">
            <AlertTriangle size={18} color="#f59e0b" />
            <h3>Chi tiết 6 Nhóm Kỹ năng & Mức thiếu hụt</h3>
          </div>

          <div className="skill-bars-list">
            {report.skillScores.map(skill => {
              const isWeak = skill.gap > 0;
              return (
                <div key={skill.skillGroupId} className={`skill-bar-card ${isWeak ? 'weak' : 'pass'}`}>
                  <div className="skill-bar-header">
                    <div>
                      <span className="skill-code-badge">{skill.skillGroupId}</span>
                      <strong className="skill-title">{skill.skillName}</strong>
                      <span className="skill-weight-tag">Trọng số: {Math.round(skill.weight * 100)}%</span>
                    </div>
                    <div className="skill-scores-meta">
                      <span className="score-c">Hiện tại: <strong>{skill.currentScore}%</strong></span>
                      {isWeak ? (
                        <span className="gap-tag">Thiếu: -{skill.gap}đ (Độ ưu tiên: {skill.weightedGap})</span>
                      ) : (
                        <span className="pass-tag">✓ Đạt chuẩn</span>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar with 70% Threshold Line */}
                  <div className="progress-track-wrapper">
                    <div
                      className={`progress-fill ${isWeak ? 'fill-weak' : 'fill-good'}`}
                      style={{ width: `${Math.min(100, skill.currentScore)}%` }}
                    ></div>
                    {/* 70% Benchmark marker */}
                    <div className="threshold-marker" style={{ left: '70%' }} title="Ngưỡng đạt yêu cầu: 70%">
                      <span className="marker-label">Chuẩn 70%</span>
                    </div>
                  </div>

                  {/* Sub-skill indicators if available */}
                  {skill.subSkillDetails && (
                    <div className="subskills-pill-row">
                      {skill.subSkillDetails.map(sub => (
                        <span
                          key={sub.subSkillId}
                          className={`subskill-chip ${sub.percentage >= 70 ? 'sub-pass' : 'sub-warn'}`}
                          title={`${sub.subSkillName}: ${sub.correctCount}/${sub.totalCount} câu đúng (${sub.percentage}%)`}
                        >
                          {sub.subSkillName}: {sub.percentage}%
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Call to action button */}
          <div className="panel-bottom-cta">
            <button className="cta-roadmap-btn" onClick={onNavigateToRoadmap}>
              <BookOpen size={18} /> Xem Lộ trình học bổ sung cá nhân hóa <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Prerequisite DAG Graph */}
      {(visualMode === 'both' || visualMode === 'dag') && (
        <div id="prerequisite-dag-section">
          <DagGraphViewer skillScores={report.skillScores} />
        </div>
      )}

      {/* Official Certificate Modal */}
      <CertificateModal
        student={student}
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
      />
    </div>
  );
};
