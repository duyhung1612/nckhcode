// ============================================================================
// VIEW: PRACTICAL SUBMIT VIEW (NỘP BÀI THỰC HÀNH MINI PRODUCT CATALOG)
import React, { useState } from 'react';
import type { StudentProfile } from '../../models/types';
import { PRACTICAL_EXERCISE_SPEC } from '../../models/seedRubric';
import { RubricGradingController } from '../../controllers/RubricGradingController';
import { GitBranch, Globe, GitCommit, FileText, CheckCircle2, AlertCircle, Award, Clock } from 'lucide-react';

interface PracticalSubmitViewProps {
  student: StudentProfile;
  onSubmitted: () => void;
}

export const PracticalSubmitView: React.FC<PracticalSubmitViewProps> = ({
  student,
  onSubmitted
}) => {
  const existingSub = student.practicalSubmission;

  const [gitRepoUrl, setGitRepoUrl] = useState(existingSub?.gitRepoUrl || '');
  const [liveDemoUrl, setLiveDemoUrl] = useState(existingSub?.liveDemoUrl || '');
  const [commitLog, setCommitLog] = useState(existingSub?.commitLogSummary || '');
  const [notes, setNotes] = useState(existingSub?.notes || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gitRepoUrl || !liveDemoUrl) {
      alert('Vui lòng nhập đầy đủ link GitHub và link Live Demo!');
      return;
    }

    RubricGradingController.submitPracticalExercise(
      student.id,
      gitRepoUrl,
      liveDemoUrl,
      commitLog,
      notes
    );

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    onSubmitted();
  };

  return (
    <div className="practical-view-container">
      {/* Exercise Briefing Card */}
      <div className="practical-brief-card">
        <div className="badge-pill practical-badge">BÀI TẬP THỰC HÀNH TÍCH HỢP</div>
        <h2>{PRACTICAL_EXERCISE_SPEC.title}</h2>
        <p className="brief-desc">{PRACTICAL_EXERCISE_SPEC.objective}</p>

        <div className="req-columns-grid">
          <div className="req-col">
            <h4>📋 Yêu cầu kỹ thuật chính:</h4>
            <ul>
              {PRACTICAL_EXERCISE_SPEC.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="req-col">
            <h4>📦 Sản phẩm bàn giao cần nộp:</h4>
            <ul>
              {PRACTICAL_EXERCISE_SPEC.deliverables.map((del, idx) => (
                <li key={idx}>{del}</li>
              ))}
            </ul>
            <div className="rubric-note-box">
              <AlertCircle size={16} color="#f59e0b" />
              <span>Bài làm sẽ được chuyên gia chấm mù độc lập theo Rubric 3 tiêu chí (thang 0–3).</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Form and Status */}
      <div className="submission-workspace-grid">
        <div className="card-panel form-panel">
          <h3>Nộp thông tin dự án của bạn</h3>
          <form onSubmit={handleSubmit} className="practical-form">
            <div className="form-group">
              <label>
                <GitBranch size={16} /> Đường dẫn kho mã nguồn GitHub:
              </label>
              <input
                type="url"
                placeholder="https://github.com/username/mini-product-catalog"
                value={gitRepoUrl}
                onChange={e => setGitRepoUrl(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <Globe size={16} /> Đường dẫn chạy thực tế (Live Demo Vercel/Netlify):
              </label>
              <input
                type="url"
                placeholder="https://mini-catalog-demo.vercel.app"
                value={liveDemoUrl}
                onChange={e => setLiveDemoUrl(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <GitCommit size={16} /> Tóm tắt lịch sử Commit Git (Git Log Summary):
              </label>
              <textarea
                rows={3}
                placeholder="feat(ui): add responsive layout, feat(api): fetch products with loading state, fix: resolve filter bug"
                value={commitLog}
                onChange={e => setCommitLog(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>
                <FileText size={16} /> Ghi chú hoặc khó khăn gặp phải:
              </label>
              <textarea
                rows={3}
                placeholder="Mô tả các phần đã làm tốt và các điểm còn khúc mắc..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>

            <button type="submit" className="primary-action-btn submit-practical-btn">
              <CheckCircle2 size={18} /> Lưu & Cập nhật bài nộp thực hành
            </button>

            {isSaved && (
              <div className="success-toast">
                ✓ Đã lưu bài nộp thực hành thành công! Chuyên gia có thể bắt đầu chấm mù.
              </div>
            )}
          </form>
        </div>

        {/* Existing Evaluation Results (if graded) */}
        <div className="card-panel status-panel">
          <h3>Trạng thái Thẩm định Chuyên gia</h3>
          {existingSub?.scores && existingSub.scores.length > 0 ? (
            <div className="evaluation-results-box">
              <div className="eval-status-badge reviewed">
                <Award size={18} /> ĐÃ THẨM ĐỊNH THEO RUBRIC
              </div>
              {existingSub.scores.map((sc, i) => (
                <div key={i} className="eval-score-card">
                  <div className="eval-header">
                    <strong>{sc.evaluatorName}</strong>
                    <span className="eval-date">{sc.evaluatedAt}</span>
                  </div>

                  <div className="rubric-mini-scores">
                    <div className="rubric-score-pill">
                      Chức năng: <strong>{sc.criteriaScores['CRIT_1']}/3</strong>
                    </div>
                    <div className="rubric-score-pill">
                      Cấu trúc mã: <strong>{sc.criteriaScores['CRIT_2']}/3</strong>
                    </div>
                    <div className="rubric-score-pill">
                      Git & Lỗi: <strong>{sc.criteriaScores['CRIT_3']}/3</strong>
                    </div>
                  </div>

                  <div className="eval-feedback">
                    <strong>Nhận xét độc lập của chuyên gia:</strong>
                    <p>"{sc.feedback}"</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="pending-eval-box">
              <Clock size={36} color="#94a3b8" />
              <p>Bài nộp đang ở hàng đợi thẩm định của chuyên gia.</p>
              <span className="hint-text">
                (Chuyển sang tab <strong>Chấm mù Rubric</strong> ở thanh điều hướng để trải nghiệm chấm điểm độc lập).
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
