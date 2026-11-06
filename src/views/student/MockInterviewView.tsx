// ============================================================================
// VIEW: MOCK INTERVIEW VIEW (PHÒNG LUYỆN PHỎNG VẤN KỸ THUẬT FLASHCARDS)
// Chuẩn bị kỹ năng trả lời phỏng vấn thực tập sinh Frontend với doanh nghiệp
// ============================================================================
import React, { useState } from 'react';
import { SEED_INTERVIEW_QUESTIONS } from '../../models/seedInterview';
import { SEED_SKILL_GROUPS } from '../../models/seedSkills';
import { InterviewQuestion } from '../../models/types';
import { 
  MessageSquare, 
  RotateCw, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  Award, 
  ArrowLeft, 
  ArrowRight, 
  Lightbulb 
} from 'lucide-react';

export const MockInterviewView: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [confidenceRatings, setConfidenceRatings] = useState<Record<string, number>>({});

  const filteredQuestions = SEED_INTERVIEW_QUESTIONS.filter(q => 
    selectedGroup === 'ALL' || q.skillGroupId === selectedGroup
  );

  const currentQ: InterviewQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleRate = (qId: string, stars: number) => {
    setConfidenceRatings(prev => ({
      ...prev,
      [qId]: stars
    }));
    // Tự động chuyển câu tiếp nếu chưa hết
    if (currentIndex < filteredQuestions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
      }, 400);
    }
  };

  // Tính toán Chỉ số Sẵn sàng Phỏng vấn (%)
  const ratedCount = Object.keys(confidenceRatings).length;
  const totalStars = Object.values(confidenceRatings).reduce((a, b) => a + b, 0);
  const maxPossibleStars = ratedCount * 5;
  const readinessIndex = maxPossibleStars > 0 ? Math.round((totalStars / maxPossibleStars) * 100) : 0;

  if (!currentQ) return <div className="card-panel">Đang tải bộ câu hỏi phỏng vấn...</div>;

  return (
    <div className="interview-view-container" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Header */}
      <div className="admin-header-card">
        <div>
          <div className="badge-pill admin-badge">MÔ PHỎNG PHỎNG VẤN DOANH NGHIỆP</div>
          <h2>Phòng Luyện Phỏng Vấn Kỹ Thuật (Flashcards Q&A)</h2>
          <p className="admin-desc">
            Tổng hợp các câu hỏi phỏng vấn thực tế của Tech Lead tại các công ty IT Hà Nội cho vị trí Thực tập sinh Frontend. Luyện phản xạ và tự đánh giá độ tự tin.
          </p>
        </div>

        {/* Readiness Index Card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-card-subtle)', padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <Award size={28} color="var(--accent)" />
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Chỉ số Tự tin Phỏng vấn:</span>
            <div style={{ fontSize: '22px', fontWeight: '800', color: readinessIndex >= 70 ? 'var(--color-success-text)' : 'var(--color-warning-text)' }}>
              {readinessIndex}% <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({ratedCount}/{SEED_INTERVIEW_QUESTIONS.length} câu)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter by skill group */}
      <div className="filter-toolbar-card" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
          <button
            className={`pill-btn ${selectedGroup === 'ALL' ? 'active' : ''}`}
            onClick={() => { setSelectedGroup('ALL'); setCurrentIndex(0); setIsFlipped(false); }}
          >
            Tất cả câu hỏi ({SEED_INTERVIEW_QUESTIONS.length})
          </button>
          {SEED_SKILL_GROUPS.map(g => (
            <button
              key={g.id}
              className={`pill-btn ${selectedGroup === g.id ? 'active' : ''}`}
              onClick={() => { setSelectedGroup(g.id); setCurrentIndex(0); setIsFlipped(false); }}
            >
              {g.id} - {g.name.split('&')[0].trim()}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Câu <strong>{currentIndex + 1}</strong> / {filteredQuestions.length}
        </div>
      </div>

      {/* Flashcard Main Area */}
      <div style={{ maxWidth: '850px', width: '100%', margin: '0 auto' }}>
        <div
          className="interview-flashcard card-panel"
          style={{
            background: isFlipped ? 'var(--bg-card-subtle)' : 'var(--bg-card)',
            border: isFlipped ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
            minHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.3s ease',
            boxShadow: isFlipped ? '0 0 25px rgba(2, 132, 199, 0.15)' : 'var(--shadow-card)'
          }}
        >
          {/* Card Top Meta */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="skill-code-badge">{currentQ.skillGroupId}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-main)', fontWeight: '600' }}>{currentQ.skillName}</span>
                <span className="badge-pill bloom-badge" style={{ fontSize: '10px' }}>{currentQ.difficulty}</span>
              </div>
              <button
                className="pill-btn"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)' }}
              >
                <RotateCw size={13} /> {isFlipped ? 'Xem lại câu hỏi' : 'Lật xem câu trả lời chuẩn'}
              </button>
            </div>

            {/* Front vs Back Content */}
            {!isFlipped ? (
              <div style={{ padding: '16px 0' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
                  Câu hỏi của Nhà tuyển dụng:
                </span>
                <h3 style={{ fontSize: '20px', color: 'var(--text-main)', marginTop: '8px', marginBottom: '20px', lineHeight: '1.5' }}>
                  "{currentQ.question}"
                </h3>

                <div style={{ background: 'var(--bg-card-subtle)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)', borderLeft: '3px solid var(--accent)' }}>
                  <strong style={{ fontSize: '13px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Lightbulb size={15} /> Các ý cốt lõi cần nêu trong câu trả lời:
                  </strong>
                  <ul style={{ paddingLeft: '18px', color: 'var(--text-main)', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {currentQ.keyPointsToMention.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div style={{ padding: '16px 0', animation: 'fadeIn 0.3s ease' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-success-text)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
                  Câu trả lời mẫu gợi ý (Chuẩn kỹ thuật):
                </span>
                <p style={{ fontSize: '14px', color: 'var(--text-main)', marginTop: '8px', marginBottom: '18px', lineHeight: '1.6', background: 'var(--color-success-bg)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-success-border)' }}>
                  {currentQ.idealAnswer}
                </p>

                <div style={{ background: 'var(--color-danger-bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-danger-border)' }}>
                  <strong style={{ fontSize: '12px', color: 'var(--color-danger-text)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <AlertCircle size={14} /> Lỗi sai thí sinh hay mắc phải:
                  </strong>
                  <ul style={{ paddingLeft: '18px', color: 'var(--color-danger-text)', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {currentQ.commonMistakes.map((mis, mIdx) => (
                      <li key={mIdx}>{mis}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Self-Rating & Navigation */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tự đánh giá mức độ tự tin:</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    className="pill-btn"
                    style={{ background: confidenceRatings[currentQ.id] === 1 ? 'var(--color-danger)' : '', color: confidenceRatings[currentQ.id] === 1 ? '#fff' : '' }}
                    onClick={() => handleRate(currentQ.id, 1)}
                  >
                    1★ Chưa nắm chắc
                  </button>
                  <button
                    className="pill-btn"
                    style={{ background: confidenceRatings[currentQ.id] === 3 ? 'var(--color-warning)' : '', color: confidenceRatings[currentQ.id] === 3 ? '#fff' : '' }}
                    onClick={() => handleRate(currentQ.id, 3)}
                  >
                    3★ Hiểu cơ bản
                  </button>
                  <button
                    className="pill-btn"
                    style={{ background: confidenceRatings[currentQ.id] === 5 ? 'var(--color-success)' : '', color: confidenceRatings[currentQ.id] === 5 ? '#fff' : '' }}
                    onClick={() => handleRate(currentQ.id, 5)}
                  >
                    5★ Thành thạo
                  </button>
                </div>
              </div>

              {/* Prev / Next controls */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="secondary-action-btn"
                  style={{ padding: '6px 12px' }}
                  disabled={currentIndex === 0}
                  onClick={() => { setCurrentIndex(prev => prev - 1); setIsFlipped(false); }}
                >
                  <ArrowLeft size={14} /> Câu trước
                </button>
                <button
                  className="secondary-action-btn"
                  style={{ padding: '6px 12px' }}
                  disabled={currentIndex === filteredQuestions.length - 1}
                  onClick={() => { setCurrentIndex(prev => prev + 1); setIsFlipped(false); }}
                >
                  Câu sau <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
