// ============================================================================
// VIEW: PARAMETER SETTINGS VIEW (KIỂM TRA ĐỘ NHẠY & CẤU HÌNH THAM SỐ)
// Thử nghiệm thay đổi ngưỡng R(s) trong các mức 65/70/75 và trọng số ±5% (mục 7.2)
// ============================================================================
import React, { useState } from 'react';
import { StorageModel } from '../../models/storage';
import { GapDiagnosticController } from '../../controllers/GapDiagnosticController';
import { Sliders, RefreshCw, CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface ParameterSettingsViewProps {
  onSettingsChanged: () => void;
}

export const ParameterSettingsView: React.FC<ParameterSettingsViewProps> = ({
  onSettingsChanged
}) => {
  const currentThreshold = StorageModel.getRequiredThreshold();
  const [threshold, setThreshold] = useState<number>(currentThreshold);
  const [skillGroups, setSkillGroups] = useState(StorageModel.getSkillGroups());
  const [isSaved, setIsSaved] = useState(false);

  const student = StorageModel.getStudentById(StorageModel.getCurrentStudentId());
  const scores = student?.preTestReport?.skillScores || [];

  // Chạy kiểm tra độ nhạy (Sensitivity Test) với 3 ngưỡng 65, 70, 75
  const sensitivityResults = GapDiagnosticController.runSensitivityTest(scores, [65, 70, 75]);

  const handleSaveThreshold = (newVal: number) => {
    setThreshold(newVal);
    StorageModel.setRequiredThreshold(newVal);

    // Cập nhật lại chẩn đoán cho sinh viên hiện tại nếu có
    if (student && student.preTestReport) {
      const updatedScores = student.preTestReport.skillScores.map(s => {
        const gap = Math.max(0, newVal - s.currentScore);
        return {
          ...s,
          requiredScore: newVal,
          gap,
          weightedGap: parseFloat((gap * s.weight).toFixed(2)),
          isWeak: gap > 0
        };
      });
      student.preTestReport.skillScores = updatedScores;
      StorageModel.updateStudent(student);
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    onSettingsChanged();
  };

  const handleWeightChange = (groupId: string, newWeight: number) => {
    setSkillGroups(prev =>
      prev.map(g => (g.id === groupId ? { ...g, initialWeight: newWeight } : g))
    );
  };

  const handleSaveWeights = () => {
    StorageModel.saveSkillGroups(skillGroups);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    onSettingsChanged();
  };

  const handleReset = () => {
    if (confirm('Khôi phục toàn bộ tham số trọng số và ngưỡng về mặc định ban đầu của nghiên cứu?')) {
      StorageModel.resetToDefault();
      setThreshold(70);
      setSkillGroups(StorageModel.getSkillGroups());
      onSettingsChanged();
    }
  };

  return (
    <div className="admin-view-container">
      {/* Header */}
      <div className="admin-header-card">
        <div>
          <div className="badge-pill admin-badge">PHÂN TÍCH ĐỘ NHẠY HỌC THUẬT (MỤC 7.2)</div>
          <h2>Kiểm tra Độ nhạy Tham số & Điều chỉnh Trọng số</h2>
          <p className="admin-desc">
            Trọng số $w(s)$ và ngưỡng đạt $R(s) = 70/100$ là tham số thử nghiệm ban đầu. Thử nghiệm thay đổi trong khoảng $\pm 5\%$ và các mức 65/70/75 để đánh giá độ ổn định của lộ trình.
          </p>
        </div>

        <button className="secondary-action-btn" onClick={handleReset}>
          <RefreshCw size={16} /> Đặt lại mặc định NCKH
        </button>
      </div>

      {isSaved && (
        <div className="success-toast">
          ✓ Đã lưu tham số và cập nhật toàn bộ mô hình chẩn đoán!
        </div>
      )}

      {/* Threshold Selection Cards */}
      <div className="card-panel threshold-control-panel">
        <div className="panel-header">
          <Sliders size={18} color="#38bdf8" />
          <h3>1. Thiết lập Ngưỡng đạt yêu cầu R(s) cho vị trí Thực tập sinh</h3>
        </div>
        <p className="panel-sub">
          Lựa chọn ngưỡng chuẩn để kích hoạt chẩn đoán $Gap(s) = \max(0, R(s) - C(s))$.
        </p>

        <div className="threshold-options-grid">
          {[65, 70, 75].map(val => {
            const isSelected = threshold === val;
            return (
              <div
                key={val}
                className={`threshold-card ${isSelected ? 'active' : ''}`}
                onClick={() => handleSaveThreshold(val)}
              >
                <div className="thresh-val">{val}%</div>
                <div className="thresh-title">
                  {val === 70 ? 'Ngưỡng Chuẩn đề xuất (70%)' : val === 65 ? 'Ngưỡng Nới lỏng (65%)' : 'Ngưỡng Khắt khe (75%)'}
                </div>
                <p className="thresh-desc">
                  {val === 70
                    ? 'Tham số cân bằng theo khảo sát 12 tin tuyển dụng TopCV.'
                    : val === 65
                    ? 'Tập trung chỉ bù đắp các lỗ hổng kiến thức nghiêm trọng nhất.'
                    : 'Yêu cầu mức năng lực vững vàng trước khi bước vào phỏng vấn.'}
                </p>
                {isSelected && (
                  <div className="active-badge">
                    <CheckCircle2 size={16} /> Đang áp dụng
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sensitivity Results Table on Current Student */}
      {scores.length > 0 && (
        <div className="card-panel sensitivity-panel">
          <div className="panel-header">
            <Info size={18} color="#f59e0b" />
            <h3>2. Kết quả Báo cáo Độ nhạy trên Hồ sơ: {student?.name}</h3>
          </div>
          <p className="panel-sub">
            Bảng đối sánh số lượng kỹ năng bị xác định là "yếu" khi biến thiên ngưỡng đạt R(s).
          </p>

          <table className="research-table">
            <thead>
              <tr>
                <th>Mức ngưỡng R(s)</th>
                <th>Số nhóm kỹ năng yếu</th>
                <th>Danh sách nhóm kỹ năng cần bổ sung</th>
                <th>Tổng tích số khoảng cách (Gap × w)</th>
              </tr>
            </thead>
            <tbody>
              {sensitivityResults.map(res => (
                <tr key={res.threshold} className={res.threshold === threshold ? 'highlight-row' : ''}>
                  <td><strong>R = {res.threshold}%</strong></td>
                  <td><span className="weak-count-pill">{res.weakCount} nhóm</span></td>
                  <td>{res.weakSkills.join(', ') || 'Không có (Đạt chuẩn)'}</td>
                  <td><strong>{res.totalWeightedGap.toFixed(2)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Weight Adjustment Sliders */}
      <div className="card-panel weights-panel">
        <div className="panel-header">
          <Sliders size={18} color="#38bdf8" />
          <h3>3. Trọng số 6 Nhóm Kỹ năng w(s) (Cho phép tinh chỉnh trong khoảng ±5%)</h3>
        </div>

        <div className="weights-sliders-list">
          {skillGroups.map(group => {
            const currentPct = Math.round(group.initialWeight * 100);
            return (
              <div key={group.id} className="weight-slider-card">
                <div className="weight-meta">
                  <strong>{group.code} - {group.name}</strong>
                  <span className="weight-number-tag">{currentPct}%</span>
                </div>
                <div className="slider-wrapper">
                  <span className="bound">5%</span>
                  <input
                    type="range"
                    min="0.05"
                    max="0.40"
                    step="0.05"
                    value={group.initialWeight}
                    onChange={e => handleWeightChange(group.id, parseFloat(e.target.value))}
                  />
                  <span className="bound">40%</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="panel-bottom-cta">
          <button className="primary-action-btn" onClick={handleSaveWeights}>
            <CheckCircle2 size={18} /> Lưu cấu hình trọng số mới
          </button>
        </div>
      </div>
    </div>
  );
};
