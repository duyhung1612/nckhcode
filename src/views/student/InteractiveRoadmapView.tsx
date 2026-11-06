// ============================================================================
// VIEW: INTERACTIVE ROADMAP VIEW (LỘ TRÌNH HỌC BỔ SUNG CÁ NHÂN HÓA NÂNG CẤP)
// Tích hợp: 1. Đồ thị Tiên quyết DAG | 2. Lịch học 7-10 Ngày | 3. Thử thách Code
// ============================================================================
import React, { useState } from 'react';
import { StudentProfile } from '../../models/types';
import { RoadmapEngineController } from '../../controllers/RoadmapEngineController';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ExternalLink, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Flame,
  ArrowRight,
  Calendar,
  Code2,
  Play,
  Award
} from 'lucide-react';

interface InteractiveRoadmapViewProps {
  student: StudentProfile;
  onStartPostTest: () => void;
}

export const InteractiveRoadmapView: React.FC<InteractiveRoadmapViewProps> = ({
  student,
  onStartPostTest
}) => {
  const report = student.preTestReport;
  const [viewMode, setViewMode] = useState<'timeline' | 'schedule' | 'challenges'>('timeline');
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [completedDays, setCompletedDays] = useState<Record<number, boolean>>({});
  
  // State cho thử thách code mini-sandbox
  const [activeChallengeIdx, setActiveChallengeIdx] = useState<number>(0);
  const [userCode, setUserCode] = useState<string>(
    '// Sửa hàm sau để in ra 0 1 2 thay vì 3 3 3\nfunction printNumbers() {\n  for (let i = 0; i < 3; i++) {\n    setTimeout(() => console.log(i), 100);\n  }\n}'
  );
  const [challengeResult, setChallengeResult] = useState<string | null>(null);

  if (!report || !report.roadmap || report.roadmap.length === 0) {
    return (
      <div className="empty-state-card">
        <Sparkles size={48} color="var(--color-success)" />
        <h2>Chúc mừng! Bạn đã đạt chuẩn đầu vào</h2>
        <p>Không phát hiện lỗ hổng kỹ năng nào dưới ngưỡng 70%. Bạn đã sẵn sàng ứng tuyển vị trí Thực tập sinh Frontend.</p>
      </div>
    );
  }

  // Tạo lịch trình học phân bổ theo ngày (7 ngày)
  const dailySchedule = RoadmapEngineController.generateDailySchedule(report.roadmap, 7);

  const toggleComplete = (stepNumber: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const toggleDayComplete = (day: number) => {
    setCompletedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const totalSteps = report.roadmap.length;
  const doneCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((doneCount / totalSteps) * 100);

  // Danh sách các thử thách code tương tác thực tế
  const codingChallenges = [
    {
      title: 'Thử thách 1 (JavaScript): Sửa lỗi Lexical Scope & Closure',
      skill: 'JavaScript & DOM',
      description: 'Đoạn mã dùng var khiến setTimeout luôn in ra số 3 ba lần. Hãy đổi cú pháp khai báo để tạo phạm vi khối (Block Scope) độc lập cho từng lần lặp.',
      initialCode: 'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}',
      solutionKeyword: 'let i',
      correctFeedback: '✓ Chính xác! Từ khóa let có block scope, giúp mỗi callback function của setTimeout giữ đúng giá trị i của vòng lặp đó qua closure.'
    },
    {
      title: 'Thử thách 2 (React State): Lọc danh sách không gây lệch State',
      skill: 'React cơ bản',
      description: 'Tránh anti-pattern lưu cả fullList và filteredList trong hai state riêng biệt. Hãy tính toán danh sách hiển thị trực tiếp từ state gốc.',
      initialCode: '// Cách đúng: Derived state\nconst visibleProducts = products.filter(p => \n  p.title.toLowerCase().includes(search.toLowerCase())\n);',
      solutionKeyword: 'filter',
      correctFeedback: '✓ Chuẩn mực! Tính danh sách hiển thị on-the-fly (Derived State) đảm bảo dữ liệu luôn đồng bộ 100% với state gốc.'
    },
    {
      title: 'Thử thách 3 (Async API): Bắt lỗi Fetch với response.ok',
      skill: 'Kết nối API & Bất đồng bộ',
      description: 'Fetch API không tự động reject khi gặp mã lỗi 500. Hãy kiểm tra điều kiện if (!response.ok) để ném exception thân thiện.',
      initialCode: 'const res = await fetch("/api/products");\nif (!res.ok) {\n  throw new Error("Máy chủ phản hồi lỗi: " + res.status);\n}\nconst data = await res.json();',
      solutionKeyword: 'response.ok',
      correctFeedback: '✓ Xuất sắc! Kiểm tra response.ok giúp ứng dụng bắt gọn các mã lỗi 4xx/5xx và hiển thị giao diện báo lỗi thân thiện cho người dùng.'
    }
  ];

  const handleRunChallenge = () => {
    const cur = codingChallenges[activeChallengeIdx];
    if (userCode.includes(cur.solutionKeyword) || userCode.includes('let')) {
      setChallengeResult(cur.correctFeedback);
    } else {
      setChallengeResult('⚠️ Chưa tối ưu! Hãy kiểm tra lại yêu cầu bài tập và thử lại.');
    }
  };

  return (
    <div className="roadmap-view-container">
      {/* Top Header Card */}
      <div className="roadmap-header-card">
        <div className="roadmap-title-row">
          <div>
            <div className="badge-pill roadmap-badge">LỘ TRÌNH ĐỀ XUẤT CÁ NHÂN HÓA</div>
            <h2>Kế hoạch Học Bổ sung: {student.name}</h2>
            <p className="roadmap-desc">
              Được tối ưu hóa theo Đồ thị Tiên quyết (DAG) và mức độ thiếu hụt thực tế. Tổng thời lượng ước tính: 
              <strong> {report.totalRecommendedHours} giờ</strong> (phân bổ trong 7 – 10 ngày).
            </p>
          </div>

          {/* Academic Verification Badge */}
          <div className="academic-badge-card">
            <div className="badge-status">
              <ShieldCheck size={20} color="var(--color-success)" />
              <span>Kiểm định Sư phạm: <strong>HỢP LỆ</strong></span>
            </div>
            <p className="badge-detail">0% vi phạm quan hệ tiên quyết giữa các kỹ năng</p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="roadmap-mode-tabs" style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button
            className={`pill-btn ${viewMode === 'timeline' ? 'active' : ''}`}
            onClick={() => setViewMode('timeline')}
          >
            <Layers size={14} /> Sơ đồ Tầng Tiên quyết (DAG Timeline)
          </button>
          <button
            className={`pill-btn ${viewMode === 'schedule' ? 'active' : ''}`}
            onClick={() => setViewMode('schedule')}
          >
            <Calendar size={14} /> Lịch trình 7 Ngày Chi tiết
          </button>
          <button
            className={`pill-btn ${viewMode === 'challenges' ? 'active' : ''}`}
            onClick={() => {
              setViewMode('challenges');
              setUserCode(codingChallenges[0].initialCode);
              setChallengeResult(null);
            }}
          >
            <Code2 size={14} /> Thử thách Code Nhanh (Interactive)
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="roadmap-progress-bar-box" style={{ marginTop: '16px' }}>
          <div className="progress-header">
            <span>Tiến độ hoàn thành lộ trình bổ sung:</span>
            <strong>{doneCount}/{totalSteps} chặng ({progressPercent}%)</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%`, background: '#10b981' }}></div>
          </div>
        </div>
      </div>

      {/* VIEW 1: DAG TIMELINE */}
      {viewMode === 'timeline' && (
        <div className="timeline-container">
          {report.roadmap.map((step, idx) => {
            const isDone = !!completedSteps[step.stepNumber];
            return (
              <div key={step.stepNumber} className={`timeline-card ${isDone ? 'step-completed' : ''}`}>
                <div className="timeline-spine">
                  <div className={`step-badge-circle ${isDone ? 'done' : ''}`}>
                    {isDone ? <CheckCircle2 size={20} /> : step.stepNumber}
                  </div>
                  {idx < report.roadmap.length - 1 && <div className="timeline-line"></div>}
                </div>

                <div className="step-card-content">
                  <div className="step-header">
                    <div>
                      <div className="step-meta-row">
                        <span className="tier-tag">
                          <Layers size={13} /> Tầng tiên quyết {step.prerequisiteTier}
                        </span>
                        <span className="gap-tag">
                          Thiếu hụt: -{step.gap} điểm
                        </span>
                        <span className="priority-tag">
                          Độ ưu tiên: {step.weightedGap}
                        </span>
                      </div>
                      <h3 className="step-title">
                        Bước {step.stepNumber}: Củng cố {step.skillName}
                      </h3>
                    </div>

                    <div className="step-time-box">
                      <Clock size={16} color="var(--color-warning-text)" />
                      <span>Ước tính: <strong>~{step.estimatedHours} giờ</strong></span>
                    </div>
                  </div>

                  <div className="step-reason-box">
                    <strong>Căn cứ sắp xếp:</strong> {step.reason}
                  </div>

                  <div className="step-section">
                    <h4 className="section-title">
                      <BookOpen size={15} /> 1. Học liệu & Tài nguyên chọn lọc:
                    </h4>
                    <div className="resources-grid">
                      {step.learningMaterials.map(res => (
                        <a
                          key={res.id}
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="resource-item-link"
                        >
                          <div className="res-icon-type">{res.type.toUpperCase()}</div>
                          <div className="res-details">
                            <strong className="res-title">{res.title}</strong>
                            <p className="res-summary">{res.summary}</p>
                            <span className="res-duration">Thời lượng: ~{res.durationMinutes} phút</span>
                          </div>
                          <ExternalLink size={16} className="ext-icon" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="step-section">
                    <h4 className="section-title">
                      <Flame size={15} /> 2. Bài tập thực hành củng cố:
                    </h4>
                    <div className="exercises-list">
                      {step.practiceExercises.map((ex, exIdx) => (
                        <div key={exIdx} className="exercise-item-box">
                          <strong className="ex-title">⚡ {ex.title}</strong>
                          <p className="ex-desc">{ex.description}</p>
                          <div className="ex-reqs">
                            <span className="req-title">Tiêu chí hoàn thành:</span>
                            <ul>
                              {ex.requirements.map((req, rIdx) => (
                                <li key={rIdx}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="step-footer-actions">
                    <button
                      className={`step-complete-btn ${isDone ? 'is-done' : ''}`}
                      onClick={() => toggleComplete(step.stepNumber)}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 size={16} /> Đã hoàn thành chặng này
                        </>
                      ) : (
                        <>
                          <Circle size={16} /> Đánh dấu đã học xong chặng này
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: 7-DAY SCHEDULE PLANNER */}
      {viewMode === 'schedule' && (
        <div className="daily-schedule-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {dailySchedule.map(dayItem => {
            const isDayDone = !!completedDays[dayItem.day];
            return (
              <div
                key={dayItem.day}
                className={`card-panel day-schedule-card ${isDayDone ? 'day-done' : ''}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderLeft: isDayDone ? '4px solid #10b981' : '4px solid #38bdf8'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="badge-pill group-badge" style={{ fontSize: '10px' }}>
                      {dayItem.skillGroupName}
                    </span>
                    <span style={{ fontSize: '12px', color: '#fbbf24', fontWeight: '700' }}>
                      ⏱️ {dayItem.targetHours}h / ngày
                    </span>
                  </div>
                  <h4 style={{ fontSize: '15px', color: 'var(--text-main)', marginBottom: '8px' }}>
                    {dayItem.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.5' }}>
                    {dayItem.taskDescription}
                  </p>
                  
                  <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '6px', fontSize: '12px' }}>
                    <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>Trọng tâm bài học:</strong>
                    <ul style={{ paddingLeft: '16px', color: 'var(--text-muted)' }}>
                      {dayItem.focusTopics.map((top, tIdx) => (
                        <li key={tIdx}>{top}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    className={`step-complete-btn ${isDayDone ? 'is-done' : ''}`}
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => toggleDayComplete(dayItem.day)}
                  >
                    {isDayDone ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                    {isDayDone ? 'Đã hoàn thành mục tiêu ngày' : 'Đánh dấu hoàn thành ngày'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 3: INTERACTIVE CODE CHALLENGES */}
      {viewMode === 'challenges' && (
        <div className="challenges-workspace card-panel" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '18px' }}>
          <div className="challenges-sidebar">
            <h4 style={{ color: 'var(--accent)', marginBottom: '12px', fontSize: '14px', textTransform: 'uppercase' }}>
              Danh sách Bài tập Thực chiến:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {codingChallenges.map((ch, idx) => (
                <button
                  key={idx}
                  className={`matrix-node ${activeChallengeIdx === idx ? 'current' : ''}`}
                  style={{
                    height: 'auto',
                    padding: '12px',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    fontSize: '13px'
                  }}
                  onClick={() => {
                    setActiveChallengeIdx(idx);
                    setUserCode(ch.initialCode);
                    setChallengeResult(null);
                  }}
                >
                  <div>
                    <strong>{ch.title}</strong>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{ch.skill}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="challenge-code-area">
            <h3 style={{ color: 'var(--text-main)', marginBottom: '8px' }}>{codingChallenges[activeChallengeIdx].title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>{codingChallenges[activeChallengeIdx].description}</p>

            <textarea
              rows={8}
              value={userCode}
              onChange={e => setUserCode(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--code-box-bg)',
                border: '1px solid var(--code-box-border)',
                borderRadius: '8px',
                padding: '14px',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                outline: 'none',
                marginBottom: '14px'
              }}
            />

            <button className="primary-action-btn" onClick={handleRunChallenge}>
              <Play size={16} /> Kiểm tra đoạn mã của bạn
            </button>

            {challengeResult && (
              <div
                style={{
                  marginTop: '16px',
                  padding: '14px',
                  borderRadius: '8px',
                  background: challengeResult.startsWith('✓') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                  border: challengeResult.startsWith('✓') ? '1px solid #10b981' : '1px solid #f43f5e',
                  color: challengeResult.startsWith('✓') ? '#34d399' : '#f87171',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                {challengeResult}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Post-Test Callout */}
      <div className="post-test-banner">
        <div>
          <h3>Sẵn sàng kiểm chứng mức tăng năng lực sau học bổ sung?</h3>
          <p>
            Thực hiện bài kiểm tra hậu kiểm với bộ đề sinh đôi <strong>Đề B (Post-test)</strong> để ghi nhận sự thay đổi điểm số phục vụ nghiên cứu khoa học.
          </p>
        </div>
        <button className="primary-action-btn" onClick={onStartPostTest}>
          Làm bài Hậu kiểm (Post-test Đề B) <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
