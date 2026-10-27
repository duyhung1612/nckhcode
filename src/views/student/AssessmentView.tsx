// ============================================================================
// VIEW: ASSESSMENT VIEW (GIAO DIỆN LÀM BÀI ĐÁNH GIÁ TRẮC NGHIỆM)
// Thiết kế thích ứng theo ma trận Bloom (Bảng 4 trong đề cương)
// ============================================================================
import React, { useState, useEffect } from 'react';
import { Question, ExamAnswer, StudentProfile } from '../../models/types';
import { ALL_QUESTIONS } from '../../models/seedQuestions';
import { ExamController } from '../../controllers/ExamController';
import { GapDiagnosticController } from '../../controllers/GapDiagnosticController';
import { RoadmapEngineController } from '../../controllers/RoadmapEngineController';
import { StorageModel } from '../../models/storage';
import { Clock, CheckCircle2, AlertCircle, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface AssessmentViewProps {
  student: StudentProfile;
  onExamCompleted: () => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  student,
  onExamCompleted
}) => {
  const [examSet, setExamSet] = useState<'A' | 'B'>('A');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<ExamAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 phút

  // Tải danh sách câu hỏi khi đổi đề
  useEffect(() => {
    const qList = ExamController.getQuestionsForExam(examSet);
    setQuestions(qList);
    setCurrentIndex(0);
    // Khởi tạo danh sách câu trả lời
    setAnswers(qList.map(q => ({ questionId: q.id, selectedOption: null })));
  }, [examSet]);

  // Bộ đếm ngược thời gian
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQ?.id)?.selectedOption;

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQ) return;
    setAnswers(prev =>
      prev.map(a =>
        a.questionId === currentQ.id ? { ...a, selectedOption: key } : a
      )
    );
  };

  // Nộp bài thi
  const handleSubmit = (isPostTest = false) => {
    if (confirm('Bạn có chắc chắn muốn nộp bài để hệ thống chẩn đoán năng lực không?')) {
      ExamController.submitExam(student.id, examSet, answers, isPostTest);
      onExamCompleted();
    }
  };

  // Tính năng giả lập nhanh theo Hồ sơ nghiên cứu (Bảng 6)
  const handleQuickLoadProfile = (profileType: 'A' | 'B') => {
    const targetScores = profileType === 'A'
      ? { G1: 80, G2: 40, G3: 35, G4: 45, G5: 75, G6: 50 } // Hồ sơ A hổng JS/React
      : { G1: 55, G2: 78, G3: 72, G4: 68, G5: 30, G6: 42 }; // Hồ sơ B hổng Git/Debug

    const simulatedSkillScores = GapDiagnosticController.createFromPresetScores(targetScores);
    const roadmap = RoadmapEngineController.generateRoadmap(simulatedSkillScores, student.availableHoursPerDay || 2.0);
    const totalRecommendedHours = roadmap.reduce((acc, step) => acc + step.estimatedHours, 0);

    const weightedTotal = Math.round(
      simulatedSkillScores.reduce((acc, s) => acc + s.currentScore * s.weight, 0)
    );

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const report = {
      studentId: student.id,
      studentCode: student.code,
      examSet,
      completedAt: dateStr,
      totalScore: weightedTotal,
      overallRating: 'Cần bổ sung một số kỹ năng' as const,
      skillScores: simulatedSkillScores,
      roadmap,
      totalRecommendedHours
    };

    student.preTestReport = report;
    StorageModel.updateStudent(student);
    alert(`Đã nạp thành công dữ liệu mẫu ${profileType === 'A' ? 'Hồ sơ A (Hổng JS/React)' : 'Hồ sơ B (Hổng Git/Debug)'}! Chuyển sang Báo cáo chẩn đoán.`);
    onExamCompleted();
  };

  const answeredCount = answers.filter(a => a.selectedOption !== null).length;

  if (!currentQ) return <div className="loading-box">Đang tải ngân hàng đề...</div>;

  return (
    <div className="assessment-container">
      {/* Top Header Controls */}
      <div className="assessment-header-card">
        <div className="exam-info">
          <div className="badge-pill exam-badge">Bộ đề: Đề {examSet} ({questions.length} câu)</div>
          <div className="exam-selection-group">
            <label>Đổi đề:</label>
            <button
              className={`pill-btn ${examSet === 'A' ? 'active' : ''}`}
              onClick={() => setExamSet('A')}
            >
              Đề A (Tiền kiểm)
            </button>
            <button
              className={`pill-btn ${examSet === 'B' ? 'active' : ''}`}
              onClick={() => setExamSet('B')}
            >
              Đề B (Hậu kiểm sinh đôi)
            </button>
          </div>
        </div>

        {/* Timer */}
        <div className="timer-box">
          <Clock size={18} color="#f59e0b" />
          <span className="timer-text">{formatTime(timeLeft)}</span>
        </div>

        {/* Quick Simulation Buttons for Research Verification */}
        <div className="quick-sim-tools">
          <span className="sim-label">⚡ Nạp nhanh dữ liệu NCKH:</span>
          <button
            className="sim-btn sim-btn-a"
            title="Sinh viên khá HTML/CSS nhưng hổng nặng JavaScript & React (Bảng 6)"
            onClick={() => handleQuickLoadProfile('A')}
          >
            Hồ sơ A (Hổng JS/React)
          </button>
          <button
            className="sim-btn sim-btn-b"
            title="Sinh viên code JS tốt nhưng hổng Git/DevTools & Debug (Bảng 6)"
            onClick={() => handleQuickLoadProfile('B')}
          >
            Hồ sơ B (Hổng Git/Debug)
          </button>
        </div>
      </div>

      <div className="assessment-workspace">
        {/* Main Question Area */}
        <div className="question-main-card">
          <div className="question-meta-bar">
            <span className="question-number-tag">Câu {currentIndex + 1} / {questions.length}</span>
            <span className="badge-pill bloom-badge">Mức Bloom: {currentQ.bloomLevel}</span>
            <span className="badge-pill diff-badge">Độ khó: {currentQ.difficulty}</span>
            <span className="badge-pill group-badge">Mã nhóm: {currentQ.skillGroupId}</span>
          </div>

          <div className="question-content-box">
            <p className="question-text">{currentQ.content}</p>
            {currentQ.codeSnippet && (
              <pre className="code-snippet-box">
                <code>{currentQ.codeSnippet}</code>
              </pre>
            )}
          </div>

          {/* Options */}
          <div className="options-list">
            {currentQ.options.map(opt => {
              const isSelected = currentAnswer === opt.key;
              return (
                <div
                  key={opt.key}
                  className={`option-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(opt.key)}
                >
                  <div className="option-key-circle">{opt.key}</div>
                  <div className="option-text">{opt.text}</div>
                </div>
              );
            })}
          </div>

          {/* Navigation Prev / Next */}
          <div className="question-action-bar">
            <button
              className="action-btn secondary-btn"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
            >
              <ArrowLeft size={16} /> Câu trước
            </button>
            <div className="answered-stats">
              Đã trả lời: <strong>{answeredCount}</strong> / {questions.length} câu
            </div>
            {currentIndex < questions.length - 1 ? (
              <button
                className="action-btn primary-btn"
                onClick={() => setCurrentIndex(prev => prev + 1)}
              >
                Câu tiếp theo <ArrowRight size={16} />
              </button>
            ) : (
              <button
                className="action-btn submit-btn"
                onClick={() => handleSubmit(false)}
              >
                <CheckCircle2 size={16} /> Nộp bài đánh giá
              </button>
            )}
          </div>
        </div>

        {/* Question Matrix Navigator */}
        <div className="question-matrix-sidebar">
          <h3 className="matrix-title">Ma trận 60 câu hỏi</h3>
          <p className="matrix-sub">Nhấp vào ô số để chuyển nhanh tới câu hỏi</p>

          <div className="matrix-grid">
            {questions.map((q, idx) => {
              const isAnswered = answers.find(a => a.questionId === q.id)?.selectedOption !== null;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  className={`matrix-node ${isCurrent ? 'current' : ''} ${isAnswered ? 'answered' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="matrix-legend">
            <span className="legend-item"><span className="legend-dot answered"></span> Đã trả lời</span>
            <span className="legend-item"><span className="legend-dot current"></span> Đang xem</span>
            <span className="legend-item"><span className="legend-dot"></span> Chưa làm</span>
          </div>

          <button
            className="full-submit-btn"
            onClick={() => handleSubmit(false)}
          >
            <CheckCircle2 size={18} /> Nộp bài & Xem kết quả
          </button>
        </div>
      </div>
    </div>
  );
};
