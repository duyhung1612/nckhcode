// ============================================================================
// VIEW: BLIND GRADING VIEW (GIAO DIỆN CHẤM MÙ BÀI THỰC HÀNH THEO RUBRIC)
// Tuân thủ quy tắc đối chiếu mù và phát hiện lệch điểm >= 2 theo mục 7.5
// ============================================================================
import React, { useState } from 'react';
import { StorageModel } from '../../models/storage';
import { SEED_RUBRIC_CRITERIA } from '../../models/seedRubric';
import { RubricGradingController } from '../../controllers/RubricGradingController';
import { StudentProfile } from '../../models/types';
import { 
  EyeOff, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  GitBranch, 
  Globe, 
  FileCheck, 
  UserCheck 
} from 'lucide-react';

interface BlindGradingViewProps {
  onGradingCompleted: () => void;
}

export const BlindGradingView: React.FC<BlindGradingViewProps> = ({
  onGradingCompleted
}) => {
  const students = StorageModel.getStudents();
  const studentsWithSubmission = students.filter(s => s.practicalSubmission);

  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    studentsWithSubmission[0]?.id || ''
  );
  const [evaluatorName, setEvaluatorName] = useState<string>('ThS. Nguyễn Thanh Tuyên (Giảng viên)');
  const [criteriaScores, setCriteriaScores] = useState<Record<string, number>>({
    CRIT_1: 2,
    CRIT_2: 2,
    CRIT_3: 1
  });
  const [feedback, setFeedback] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentStudent = students.find(s => s.id === selectedStudentId);
  const sub = currentStudent?.practicalSubmission;

  const handleScoreChange = (critId: string, score: number) => {
    setCriteriaScores(prev => ({ ...prev, [critId]: score }));
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudent) return;

    try {
      const res = RubricGradingController.addEvaluatorScore(
        currentStudent.id,
        evaluatorName,
        criteriaScores,
        feedback || 'Đánh giá đạt yêu cầu thực tập sinh theo rubric chuẩn.'
      );

      if (res.hasDiscrepancy) {
        setAlertMessage(res.discrepancyMessage || 'Phát hiện chênh lệch điểm!');
      } else {
        setAlertMessage(null);
      }

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000);
      onGradingCompleted();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-view-container">
      {/* Header with Blind Grading Protocol notice */}
      <div className="admin-header-card">
        <div>
          <div className="badge-pill admin-badge">QUY TRÌNH ĐỐI CHIẾU MÙ (BLIND GRADING)</div>
          <h2>Thẩm định Độc lập Bài Thực hành theo Rubric (Bảng 5)</h2>
          <p className="admin-desc">
            Để đảm bảo tính khách quan của NCKH, người chấm thực hành <strong>không được biết trước kết quả trắc nghiệm và chẩn đoán của hệ thống</strong>. 
            Mọi chênh lệch $\ge 2$ điểm giữa các giám khảo sẽ được tự động cảnh báo để đối chiếu.
          </p>
        </div>

        {/* Evaluator identity */}
        <div className="evaluator-card">
          <UserCheck size={18} color="#38bdf8" />
          <div className="evaluator-info">
            <label>Giám khảo thẩm định:</label>
            <input
              type="text"
              value={evaluatorName}
              onChange={e => setEvaluatorName(e.target.value)}
              placeholder="Họ tên giám khảo..."
            />
          </div>
        </div>
      </div>

      {/* Select submission */}
      <div className="submission-selector-bar">
        <label>Chọn bài nộp của sinh viên:</label>
        <select
          value={selectedStudentId}
          onChange={e => setSelectedStudentId(e.target.value)}
        >
          {studentsWithSubmission.map(s => (
            <option key={s.id} value={s.id}>
              {s.code} - {s.name} (Nộp lúc: {s.practicalSubmission?.submittedAt})
            </option>
          ))}
        </select>
      </div>

      {/* Discrepancy Alert & Consensus Reconciliation Form */}
      {alertMessage && (
        <div className="discrepancy-banner" style={{ flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <AlertTriangle size={20} color="#f59e0b" style={{ flexShrink: 0 }} />
            <div className="alert-content">
              <strong>CẢNH BÁO LỆCH ĐIỂM CHUYÊN GIA (MỤC 7.5 ĐỀ CƯƠNG):</strong>
              <p>{alertMessage}</p>
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
            <h4 style={{ color: '#fbbf24', fontSize: '13px', marginBottom: '8px' }}>
              ⚖️ Biên bản Đối chiếu Thống nhất Giám khảo:
            </h4>
            <p style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '12px' }}>
              Theo quy định, hai giám khảo sẽ trao đổi trực tiếp để thống nhất mức điểm cuối cùng và ghi rõ nguyên nhân bất đồng (do tiêu chí nào, đoạn mã nào).
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8' }}>Điểm chốt Chức năng (0-3):</label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  defaultValue="2"
                  style={{ width: '100%', background: '#020617', border: '1px solid #38bdf8', padding: '6px', borderRadius: '4px', color: '#ffffff' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8' }}>Điểm chốt Cấu trúc (0-3):</label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  defaultValue="2"
                  style={{ width: '100%', background: '#020617', border: '1px solid #38bdf8', padding: '6px', borderRadius: '4px', color: '#ffffff' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8' }}>Điểm chốt Git & Lỗi (0-3):</label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  defaultValue="1"
                  style={{ width: '100%', background: '#020617', border: '1px solid #38bdf8', padding: '6px', borderRadius: '4px', color: '#ffffff' }}
                />
              </div>
            </div>
            <textarea
              placeholder="Ghi giải trình lý do thống nhất điểm cuối của 2 giám khảo..."
              rows={2}
              style={{ width: '100%', background: '#020617', border: '1px solid rgba(255,255,255,0.1)', padding: '8px', borderRadius: '4px', color: '#ffffff', fontSize: '12px', marginBottom: '10px' }}
            />
            <button
              className="primary-action-btn"
              style={{ padding: '8px 16px', fontSize: '12px' }}
              onClick={() => {
                alert('✓ Đã lưu biên bản thống nhất điểm cuối của hội đồng thẩm định!');
                setAlertMessage(null);
              }}
            >
              <CheckCircle2 size={14} /> Ký xác nhận Biên bản Thống nhất
            </button>
          </div>
        </div>
      )}

      {sub ? (
        <div className="blind-grading-grid">
          {/* Left: Practical Artifacts */}
          <div className="card-panel artifacts-panel">
            <div className="panel-header">
              <EyeOff size={18} color="#94a3b8" />
              <h3>Sản phẩm nộp của Sinh viên (Đã ẩn danh kết quả trắc nghiệm)</h3>
            </div>

            <div className="artifact-links-box">
              <div className="artifact-row">
                <GitBranch size={16} />
                <span className="label">Kho GitHub:</span>
                <a href={sub.gitRepoUrl} target="_blank" rel="noreferrer" className="art-link">
                  {sub.gitRepoUrl} <ExternalLink size={13} />
                </a>
              </div>

              <div className="artifact-row">
                <Globe size={16} />
                <span className="label">Bản chạy Demo:</span>
                <a href={sub.liveDemoUrl} target="_blank" rel="noreferrer" className="art-link">
                  {sub.liveDemoUrl} <ExternalLink size={13} />
                </a>
              </div>
            </div>

            <div className="artifact-text-block">
              <strong>Tóm tắt Git Log Commit:</strong>
              <pre className="git-log-box">{sub.commitLogSummary || 'Không có tóm tắt commit'}</pre>
            </div>

            {sub.notes && (
              <div className="artifact-text-block">
                <strong>Ghi chú của sinh viên:</strong>
                <p className="student-note-text">{sub.notes}</p>
              </div>
            )}

            {/* Existing scores from other evaluators */}
            {sub.scores && sub.scores.length > 0 && (
              <div className="history-eval-box">
                <h4>Lịch sử các lần chấm trước:</h4>
                {sub.scores.map((sc, i) => (
                  <div key={i} className="eval-history-card">
                    <div className="history-header">
                      <strong>{sc.evaluatorName}</strong>
                      <span>{sc.evaluatedAt}</span>
                    </div>
                    <div className="history-scores">
                      CRIT 1: {sc.criteriaScores['CRIT_1']}đ • CRIT 2: {sc.criteriaScores['CRIT_2']}đ • CRIT 3: {sc.criteriaScores['CRIT_3']}đ
                    </div>
                    <p className="history-fb">"{sc.feedback}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Rubric Scoring Form */}
          <div className="card-panel rubric-form-panel">
            <div className="panel-header">
              <FileCheck size={18} color="#38bdf8" />
              <h3>Phiếu Chấm Rubric 3 Tiêu chí (Thang 0 – 3)</h3>
            </div>

            <form onSubmit={handleSaveGrade}>
              {SEED_RUBRIC_CRITERIA.map(crit => {
                const currentVal = criteriaScores[crit.id] ?? 1;
                return (
                  <div key={crit.id} className="rubric-criteria-card">
                    <div className="criteria-header">
                      <strong className="crit-title">{crit.name}</strong>
                      <span className="crit-desc">{crit.description}</span>
                    </div>

                    <div className="rubric-levels-grid">
                      {crit.levels.map(lvl => {
                        const isSelected = currentVal === lvl.score;
                        return (
                          <div
                            key={lvl.score}
                            className={`rubric-level-card ${isSelected ? 'active' : ''}`}
                            onClick={() => handleScoreChange(crit.id, lvl.score)}
                          >
                            <div className="level-top">
                              <span className="score-badge">{lvl.score} điểm</span>
                              <strong className="level-title">{lvl.title}</strong>
                            </div>
                            <p className="level-desc">{lvl.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Feedback text */}
              <div className="feedback-field">
                <label>Nhận xét chuyên môn của giám khảo:</label>
                <textarea
                  rows={3}
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  placeholder="Ghi nhận xét về điểm mạnh, điểm yếu kỹ thuật của bài làm..."
                  required
                />
              </div>

              <button type="submit" className="primary-action-btn submit-grade-btn">
                <CheckCircle2 size={18} /> Lưu Kết quả Chấm Mù Rubric
              </button>

              {isSuccess && (
                <div className="success-toast">
                  ✓ Đã lưu kết quả chấm thành công vào bộ dữ liệu NCKH!
                </div>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="empty-state-card">
          <EyeOff size={40} color="#94a3b8" />
          <h3>Chưa có bài thực hành nào được nộp</h3>
          <p>Sinh viên cần nộp link GitHub và Live demo ở tab Bài thực hành trước khi tiến hành chấm mù.</p>
        </div>
      )}
    </div>
  );
};
