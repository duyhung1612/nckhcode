// ============================================================================
// VIEW: QUESTION BANK VIEW (NGÂN HÀNG 120 CÂU HỎI TRẮC NGHIỆM ĐỀ A & B NÂNG CẤP)
// Tích hợp: Tra cứu, Bộ lọc Bloom/Độ khó & Trình So sánh Cặp Câu Sinh đôi (A ↔ B)
// ============================================================================
import React, { useState } from 'react';
import { ALL_QUESTIONS } from '../../models/seedQuestions';
import { SEED_SKILL_GROUPS } from '../../models/seedSkills';
import { Question } from '../../models/types';
import { CheckCircle2, ArrowRightLeft, Sparkles, X } from 'lucide-react';

export const QuestionBankView: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<'ALL' | 'A' | 'B'>('ALL');
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [selectedBloom, setSelectedBloom] = useState<string>('ALL');
  const [selectedDiff, setSelectedDiff] = useState<string>('ALL');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  
  // State so sánh cặp câu sinh đôi
  const [twinComparePair, setTwinComparePair] = useState<{ qA: Question; qB: Question } | null>(null);

  const filteredQuestions = ALL_QUESTIONS.filter(q => {
    if (selectedExam !== 'ALL' && q.examSet !== selectedExam) return false;
    if (selectedGroup !== 'ALL' && q.skillGroupId !== selectedGroup) return false;
    if (selectedBloom !== 'ALL' && q.bloomLevel !== selectedBloom) return false;
    if (selectedDiff !== 'ALL' && q.difficulty !== selectedDiff) return false;
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase();
      return (
        q.content.toLowerCase().includes(kw) ||
        q.id.toLowerCase().includes(kw) ||
        q.options.some(o => o.text.toLowerCase().includes(kw))
      );
    }
    return true;
  });

  const handleOpenTwinCompare = (q: Question) => {
    let qA: Question | undefined;
    let qB: Question | undefined;

    if (q.examSet === 'A') {
      qA = q;
      qB = ALL_QUESTIONS.find(item => item.examSet === 'B' && item.twinQuestionId === q.id);
    } else {
      qB = q;
      qA = ALL_QUESTIONS.find(item => item.id === q.twinQuestionId);
    }

    if (qA && qB) {
      setTwinComparePair({ qA, qB });
    } else {
      alert('Không tìm thấy câu sinh đôi tương ứng trong ngân hàng đề.');
    }
  };

  return (
    <div className="admin-view-container">
      {/* Header */}
      <div className="admin-header-card spatial-card">
        <div>
          <div className="badge-pill admin-badge">CƠ SỞ DỮ LIỆU CÔNG CỤ ĐO (MA TRẬN BẢNG 4)</div>
          <h2>Ngân hàng 120 Câu hỏi Trắc nghiệm Đề A & Đề B</h2>
          <p className="admin-desc">
            Hai đề A và B là dạng song song sinh đôi (Twin Sets). Mỗi câu ở đề B có cùng kỹ năng con, độ khó và mức Bloom với câu ở đề A.
          </p>
        </div>

        {/* Matrix Summary Stats */}
        <div className="matrix-stat-pills">
          <div className="stat-pill">Tổng số: <strong>{ALL_QUESTIONS.length} câu</strong></div>
          <div className="stat-pill">Đề A: <strong>60 câu</strong></div>
          <div className="stat-pill">Đề B: <strong>60 câu</strong></div>
          <div className="stat-pill">Nhóm kỹ năng: <strong>6 nhóm (10 câu/nhóm)</strong></div>
        </div>
      </div>

      {/* Twin Question Comparison Modal */}
      {twinComparePair && (
        <div className="twin-modal-overlay" style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="twin-modal-card card-panel" style={{
            maxWidth: '1100px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--accent)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowRightLeft size={20} color="var(--accent)" />
                <h3 style={{ color: 'var(--text-main)' }}>Đối chiếu Cặp Câu Sinh Đôi (Đề A vs Đề B)</h3>
              </div>
              <button
                className="pill-btn"
                onClick={() => setTwinComparePair(null)}
                style={{ padding: '6px 10px' }}
              >
                <X size={16} /> Đóng
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Xác thực nguyên tắc sinh đôi theo mục 7.5 đề cương: <strong>Cùng kỹ năng con, cùng độ khó ({twinComparePair.qA.difficulty}), cùng mức Bloom ({twinComparePair.qA.bloomLevel})</strong>; khác biệt bối cảnh đoạn mã và thứ tự đảo đáp án.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Question A */}
              <div style={{ background: 'var(--bg-card-subtle)', padding: '20px', borderRadius: '10px', border: '1px solid var(--color-info-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span className="exam-tag">Đề A (Tiền kiểm)</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {twinComparePair.qA.id}</span>
                </div>
                <p style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '14px', marginBottom: '12px' }}>
                  {twinComparePair.qA.content}
                </p>
                {twinComparePair.qA.codeSnippet && (
                  <pre className="admin-code-snippet"><code>{twinComparePair.qA.codeSnippet}</code></pre>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {twinComparePair.qA.options.map(opt => (
                    <div key={opt.key} className={`admin-opt ${opt.key === twinComparePair.qA.correctAnswer ? 'correct' : ''}`}>
                      <strong>{opt.key}.</strong> {opt.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Question B */}
              <div style={{ background: 'var(--bg-card-subtle)', padding: '20px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span className="exam-tag" style={{ background: '#8b5cf6' }}>Đề B (Hậu kiểm)</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {twinComparePair.qB.id}</span>
                </div>
                <p style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '14px', marginBottom: '12px' }}>
                  {twinComparePair.qB.content}
                </p>
                {twinComparePair.qB.codeSnippet && (
                  <pre className="admin-code-snippet"><code>{twinComparePair.qB.codeSnippet}</code></pre>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {twinComparePair.qB.options.map(opt => (
                    <div key={opt.key} className={`admin-opt ${opt.key === twinComparePair.qB.correctAnswer ? 'correct' : ''}`}>
                      <strong>{opt.key}.</strong> {opt.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters Toolbar */}
      <div className="filter-toolbar-card spatial-card">
        <div className="filter-item">
          <label>Bộ đề:</label>
          <select value={selectedExam} onChange={e => setSelectedExam(e.target.value as any)}>
            <option value="ALL">Tất cả (Đề A & B)</option>
            <option value="A">Đề A (Tiền kiểm - 60 câu)</option>
            <option value="B">Đề B (Hậu kiểm sinh đôi - 60 câu)</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Nhóm kỹ năng:</label>
          <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
            <option value="ALL">Tất cả 6 nhóm kỹ năng</option>
            {SEED_SKILL_GROUPS.map(g => (
              <option key={g.id} value={g.id}>{g.id} - {g.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Mức Bloom:</label>
          <select value={selectedBloom} onChange={e => setSelectedBloom(e.target.value)}>
            <option value="ALL">Tất cả mức nhận thức</option>
            <option value="Nhớ">Nhớ (Remember)</option>
            <option value="Hiểu">Hiểu (Understand)</option>
            <option value="Vận dụng">Vận dụng (Apply)</option>
            <option value="Phân tích">Phân tích (Analyze)</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Độ khó:</label>
          <select value={selectedDiff} onChange={e => setSelectedDiff(e.target.value)}>
            <option value="ALL">Tất cả độ khó</option>
            <option value="Dễ">Dễ (30%)</option>
            <option value="Trung bình">Trung bình (40%)</option>
            <option value="Khó">Khó (30%)</option>
          </select>
        </div>

        <div className="filter-item search-filter">
          <label>Tìm kiếm nội dung:</label>
          <input
            type="text"
            placeholder="Gõ từ khóa tìm kiếm..."
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="questions-list-wrapper">
        <div className="list-meta-info">
          Hiển thị <strong>{filteredQuestions.length}</strong> câu hỏi phù hợp với bộ lọc
        </div>

        <div className="questions-table-grid">
          {filteredQuestions.map((q) => (
            <div key={q.id} className="question-admin-card spatial-card">
              <div className="card-top-meta">
                <div className="id-group">
                  <span className="exam-tag">Đề {q.examSet}</span>
                  <span className="qid-tag">{q.id}</span>
                  <span className="group-tag">{q.skillGroupId}</span>
                </div>
                <div className="bloom-diff-group">
                  <span className="bloom-pill">{q.bloomLevel}</span>
                  <span className={`diff-pill ${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
                </div>
              </div>

              <p className="card-question-text">{q.content}</p>

              {q.codeSnippet && (
                <pre className="admin-code-snippet">
                  <code>{q.codeSnippet}</code>
                </pre>
              )}

              <div className="card-options-grid">
                {q.options.map(opt => {
                  const isCorrect = opt.key === q.correctAnswer;
                  return (
                    <div key={opt.key} className={`admin-opt ${isCorrect ? 'correct' : ''}`}>
                      <strong>{opt.key}.</strong> {opt.text}
                      {isCorrect && <CheckCircle2 size={14} className="correct-icon" />}
                    </div>
                  );
                })}
              </div>

              <div className="card-footer-explanation" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{q.explanation}</span>
                <button
                  className="pill-btn"
                  onClick={() => handleOpenTwinCompare(q)}
                  title="Mở bảng đối chiếu câu sinh đôi ở đề còn lại"
                  style={{ flexShrink: 0, marginLeft: '10px' }}
                >
                  <ArrowRightLeft size={12} /> Cặp sinh đôi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
