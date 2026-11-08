// ============================================================================
// VIEW: DIAGNOSTIC REPORT VIEW (BÁO CÁO CHẨN ĐOÁN KHOẢNG CÁCH KỸ NĂNG)
// Trực quan hóa C(s), R(s)=70, Gap(s) và giải trình sư phạm minh bạch
// ============================================================================
import React, { useState, useEffect, useRef } from 'react';
import { StudentProfile, SkillScore } from '../../models/types';
import { StorageModel } from '../../models/storage';
import { SEED_SKILL_GROUPS } from '../../models/seedSkills';
import { RadarChart } from '../components/RadarChart';
import { DagGraphViewer } from '../components/DagGraphViewer';
import { CertificateModal } from '../components/CertificateModal';
import { ProfileDropdown } from '../components/ProfileDropdown';
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
  LayoutGrid,
  TrendingUp,
  Sparkles,
  Layers,
  RotateCcw
} from 'lucide-react';
import { animateStaggerChildren } from '../../utils/motion';

interface DiagnosticReportViewProps {
  student: StudentProfile;
  onNavigateToRoadmap: () => void;
  onRetakeExam: () => void;
  students?: StudentProfile[];
  onStudentChange?: (student: StudentProfile) => void;
}

export const DiagnosticReportView: React.FC<DiagnosticReportViewProps> = ({
  student,
  onNavigateToRoadmap,
  onRetakeExam,
  students,
  onStudentChange
}) => {
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [visualMode, setVisualMode] = useState<'both' | 'radar' | 'dag'>('both');
  const viewRef = useRef<HTMLDivElement | null>(null);

  const report = student?.preTestReport;
  const hasReport = !!report && Array.isArray(report.skillScores) && report.skillScores.length > 0;
  const totalScore = hasReport ? (report.totalScore ?? 0) : 0;
  const totalHours = hasReport ? (report.totalRecommendedHours ?? 0) : 0;

  useEffect(() => {
    if (viewRef.current) {
      animateStaggerChildren(viewRef.current, '.skill-bar-card, .stat-card', 0.06);
    }
  }, [student?.id, report]);

  const rawScores = hasReport ? (report?.skillScores || []) : [];
  // Chuẩn hóa và loại bỏ hoàn toàn trùng lặp: Luôn luôn có đúng 6 nhóm kỹ năng duy nhất (G1 -> G6)
  const skillScores: SkillScore[] = React.useMemo(() => {
    if (!hasReport || rawScores.length === 0) {
      // Đối với sinh viên C03 hoặc hồ sơ mới chưa thi, sinh 6 nhóm chuẩn với điểm 0/100
      return SEED_SKILL_GROUPS.map(g => ({
        skillGroupId: g.id,
        skillName: g.name,
        weight: g.initialWeight,
        currentScore: 0,
        requiredScore: 70,
        gap: 0,
        weightedGap: 0,
        isWeak: false,
        isUnassessed: true
      }));
    }

    const seen = new Set<string>();
    const unique: SkillScore[] = [];
    for (const s of rawScores) {
      const key = s.skillGroupId || s.skillName;
      if (key && !seen.has(key)) {
        seen.add(key);
        unique.push(s);
      }
    }
    const order = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6'];
    unique.sort((a, b) => {
      const ia = order.indexOf(a.skillGroupId);
      const ib = order.indexOf(b.skillGroupId);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
    return unique.slice(0, 6);
  }, [hasReport, rawScores]);

  const weakSkills = skillScores.filter(s => s.gap > 0 && !s.isUnassessed);
  const strongSkills = skillScores.filter(s => s.gap === 0 && !s.isUnassessed);

  return (
    <div className="diagnostic-view-container" ref={viewRef}>
      {/* Top Banner Overview */}
      <div className="report-hero-banner spatial-card">
        <div className="hero-text">
          <div className="hero-badge">
            <Sparkles size={12} /> BÁO CÁO CHẨN ĐOÁN NĂNG LỰC ĐẦU VÀO (PRE-TEST)
          </div>
          <div className="hero-profile-switch-row" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', margin: '4px 0 6px' }}>
            <h2 className="hero-title" style={{ margin: 0 }}>Hồ sơ: {student?.name || 'Hồ sơ Sinh viên'} ({student?.code || 'N/A'})</h2>
            {students && onStudentChange && student && (
              <ProfileDropdown
                currentStudent={student}
                students={students}
                onSelectStudent={onStudentChange}
                variant="inline"
              />
            )}
          </div>
          <p className="hero-desc">
            Vị trí hướng tới: <strong>{student?.targetRole || 'Thực tập sinh Frontend'}</strong> • Thời điểm hoàn thành: <strong>{hasReport ? report.completedAt : 'Chưa thực hiện đánh giá'}</strong>
          </p>
          <div className="report-action-links" style={{ marginTop: '14px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {hasReport ? (
              <>
                <button
                  className="secondary-action-btn"
                  onClick={() => window.print()}
                  title="In bản đánh giá chính thức có chữ ký GVHD & Sinh viên phục vụ lưu hồ sơ NCKH"
                >
                  <Printer size={15} /> In Phiếu Báo Cáo NCKH (PDF)
                </button>
                <button
                  className="secondary-action-btn"
                  onClick={() => {
                    const restored = StorageModel.resetStudentToInitial(student?.id || 'STU_001');
                    if (onStudentChange) {
                      onStudentChange(restored);
                    }
                    alert(`Đã khôi phục hồ sơ mẫu ${restored.name} về đúng bộ số chuẩn Bảng 6 NCKH!`);
                  }}
                  title="Khôi phục điểm số và dữ liệu hồ sơ về chuẩn ban đầu của đề tài NCKH (Bảng 6)"
                >
                  <RotateCcw size={15} /> Khôi phục Hồ sơ Mẫu gốc
                </button>
                <button
                  className="primary-action-btn certificate-btn"
                  onClick={() => setShowCertificate(true)}
                  title="Xem Giấy chứng nhận Đạt chuẩn Năng lực FBU"
                >
                  <Award size={15} /> Xem Giấy Chứng Nhận FBU
                </button>
              </>
            ) : (
              <>
                <button
                  className="primary-action-btn"
                  onClick={onRetakeExam}
                  title="Bắt đầu làm bài đánh giá tiền kiểm để nhận chẩn đoán năng lực"
                >
                  <ArrowRight size={15} /> Bắt đầu làm bài đánh giá ngay
                </button>
                <button
                  className="secondary-action-btn"
                  onClick={() => {
                    const restored = StorageModel.resetStudentToInitial('STU_001');
                    if (onStudentChange) {
                      onStudentChange(restored);
                    }
                  }}
                  title="Chuyển nhanh sang Hồ sơ mẫu A (Nguyễn Văn A)"
                >
                  <RotateCcw size={15} /> Xem Hồ sơ A mẫu chuẩn
                </button>
              </>
            )}
          </div>
        </div>

        {/* Key Stats Cards with Weightless Floating Effect */}
        <div className="hero-stat-cards">
          <div className="stat-card tilt-card">
            <span className="stat-label">Điểm tổng kết</span>
            <div className="stat-value" style={{ color: totalScore >= 70 ? 'var(--color-success)' : (hasReport ? 'var(--color-warning-text)' : 'var(--text-muted)') }}>
              {totalScore}<span className="stat-unit">/100</span>
            </div>
            <span className="stat-sub">{hasReport ? 'Chuẩn doanh nghiệp: 70' : 'Chưa có bài thi'}</span>
          </div>

          <div className="stat-card tilt-card">
            <span className="stat-label">Lỗ hổng kỹ năng</span>
            <div className="stat-value text-rose">
              {weakSkills.length}<span className="stat-unit">/{skillScores.length} nhóm</span>
            </div>
            <span className="stat-sub">{hasReport ? 'Cần học bổ sung' : 'Chưa đánh giá'}</span>
          </div>

          <div className="stat-card tilt-card">
            <span className="stat-label">Thời lượng bổ sung</span>
            <div className="stat-value text-sky">
              {totalHours}<span className="stat-unit"> giờ</span>
            </div>
            <span className="stat-sub">{hasReport ? 'Khuyến nghị: 7–10 ngày' : 'Chưa có lộ trình'}</span>
          </div>
        </div>
      </div>

      {/* Main Diagnostic Body */}
      <div className="report-main-grid">
        {/* Left: SVG Radar Chart */}
        <div className="card-panel radar-panel spatial-card">
          <div className="panel-header radar-card-header">
            <div className="panel-header-left">
              <Target size={18} color="var(--accent)" />
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
            Đối sánh đa giác 6 nhóm năng lực cốt lõi so với ngưỡng chuẩn tuyển dụng thực tập sinh.
          </p>

          {visualMode !== 'dag' ? (
            <>
              <RadarChart skillScores={skillScores} size={420} />

              <div className="pedagogical-callout">
                <h4>💡 Giải trình chẩn đoán sư phạm:</h4>
                {!hasReport ? (
                  <p>
                    Sinh viên <strong>{student?.name || 'mới'}</strong> là hồ sơ thực nghiệm mới (chưa có bài thi tiền kiểm). 
                    Hệ thống sẽ tự động đo lường 6 nhóm năng lực với chuẩn đầu ra $R(s) = 70\%$ và xây dựng lộ trình học thích ứng theo Đồ thị Tiên quyết DAG ngay sau khi sinh viên hoàn thành bài đánh giá.
                  </p>
                ) : weakSkills.some(s => s.skillGroupId === 'G2') && weakSkills.some(s => s.skillGroupId === 'G3') ? (
                  <p>
                    Sinh viên có điểm <strong>React ({skillScores.find(s => s.skillGroupId === 'G3')?.currentScore}%)</strong> thấp 
                    một phần lớn do bị hổng nền tảng <strong>JavaScript & DOM ({skillScores.find(s => s.skillGroupId === 'G2')?.currentScore}%)</strong>. 
                    Theo quan hệ tiên quyết, hệ thống sẽ yêu cầu củng cố JavaScript trước khi luyện tập chuyên sâu về React Hooks.
                  </p>
                ) : weakSkills.some(s => s.skillGroupId === 'G5') ? (
                  <p>
                    Sinh viên có tư duy lập trình khá tốt nhưng thiếu hụt kỹ năng <strong>Git/GitHub & DevTools ({skillScores.find(s => s.skillGroupId === 'G5')?.currentScore}%)</strong>. 
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
              <Network size={36} color="var(--accent)" />
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
        <div className="card-panel gaps-panel spatial-card">
          <div className="panel-header">
            <AlertTriangle size={18} color="var(--color-warning-text)" />
            <h3>Chi tiết 6 Nhóm Kỹ năng & Mức thiếu hụt</h3>
          </div>

          <div className="skill-bars-list">
            {skillScores.map(skill => {
              const isUnassessed = (skill as any).isUnassessed;
              const isWeak = skill.gap > 0 && !isUnassessed;
              return (
                <div key={skill.skillGroupId} className={`skill-bar-card ${isUnassessed ? 'unassessed' : (isWeak ? 'weak' : 'pass')}`}>
                  <div className="skill-bar-header">
                    <div>
                      <span className="skill-code-badge">{skill.skillGroupId}</span>
                      <strong className="skill-title">{skill.skillName}</strong>
                      <span className="skill-weight-tag">Trọng số: {Math.round(skill.weight * 100)}%</span>
                    </div>
                    <div className="skill-scores-meta">
                      <span className="score-c">Hiện tại: <strong>{skill.currentScore}%</strong></span>
                      {isUnassessed ? (
                        <span className="pass-tag" style={{ background: 'rgba(148, 163, 184, 0.12)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }}>
                          Chưa đánh giá
                        </span>
                      ) : isWeak ? (
                        <span className="gap-tag">Thiếu: -{skill.gap}đ (Độ ưu tiên: {skill.weightedGap})</span>
                      ) : (
                        <span className="pass-tag">✓ Đạt chuẩn</span>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar with 70% Threshold Line */}
                  <div className="progress-track-wrapper">
                    <div
                      className={`progress-fill ${isUnassessed ? 'fill-neutral' : (isWeak ? 'fill-weak' : 'fill-good')}`}
                      style={{ width: `${Math.min(100, skill.currentScore)}%` }}
                    ></div>
                    {/* 70% Benchmark marker */}
                    <div className="threshold-marker" style={{ left: '70%' }} title="Ngưỡng đạt yêu cầu: 70%">
                      <span className="marker-label">Chuẩn 70%</span>
                    </div>
                  </div>

                  {/* Sub-skill indicators if available */}
                  {Array.isArray(skill.subSkillDetails) && skill.subSkillDetails.length > 0 && (
                    <div className="subskills-pill-row">
                      {skill.subSkillDetails.map((sub: NonNullable<SkillScore['subSkillDetails']>[number]) => (
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
          <DagGraphViewer skillScores={skillScores} />
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
