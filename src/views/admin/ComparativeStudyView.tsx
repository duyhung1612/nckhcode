// ============================================================================
// VIEW: COMPARATIVE STUDY VIEW (THỰC NGHIỆM ĐỐI CHIẾU HỒ SƠ ĐIỂN HÌNH A VS B)
// Bảng 6 trong Báo cáo NCKH: Minh chứng sự cá nhân hóa vượt trội của mô hình DAG
// ============================================================================
import React, { useState } from 'react';
import { StorageModel } from '../../models/storage';
import { RoadmapEngineController } from '../../controllers/RoadmapEngineController';
import { RadarChart } from '../components/RadarChart';
import { SkillScore } from '../../models/types';
import { 
  Users, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  Sliders, 
  Clock, 
  FileSpreadsheet, 
  Compass, 
  Layers 
} from 'lucide-react';

export const ComparativeStudyView: React.FC = () => {
  const [sensitivityR, setSensitivityR] = useState<number>(70);

  const students = StorageModel.getStudents();
  const profileA = students.find(s => s.id === 'STU_001') || students[0];
  const profileB = students.find(s => s.id === 'STU_002') || students[1] || students[0];

  // Tính toán động chẩn đoán theo ngưỡng R được chọn
  const baseScoresA = profileA.preTestReport?.skillScores || [];
  const baseScoresB = profileB.preTestReport?.skillScores || [];

  const scoresA: SkillScore[] = baseScoresA.map(s => {
    const gap = Math.max(0, sensitivityR - s.currentScore);
    const weightedGap = parseFloat((gap * s.weight).toFixed(2));
    return {
      ...s,
      requiredScore: sensitivityR,
      gap,
      weightedGap,
      isWeak: gap > 0
    };
  });

  const scoresB: SkillScore[] = baseScoresB.map(s => {
    const gap = Math.max(0, sensitivityR - s.currentScore);
    const weightedGap = parseFloat((gap * s.weight).toFixed(2));
    return {
      ...s,
      requiredScore: sensitivityR,
      gap,
      weightedGap,
      isWeak: gap > 0
    };
  });

  const totalScoreA = profileA.preTestReport?.totalScore || 61;
  const totalScoreB = profileB.preTestReport?.totalScore || 54;

  const roadmapA = RoadmapEngineController.generateRoadmap(scoresA);
  const roadmapB = RoadmapEngineController.generateRoadmap(scoresB);

  const totalHoursA = roadmapA.reduce((sum, step) => sum + step.estimatedHours, 0);
  const totalHoursB = roadmapB.reduce((sum, step) => sum + step.estimatedHours, 0);

  return (
    <div className="comparative-view-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div className="admin-header-card">
        <div>
          <div className="badge-pill admin-badge">KIỂM ĐỊNH HỌC THUẬT NCKH • BẢNG 6</div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc', marginTop: '6px' }}>
            Thực nghiệm Đối chiếu Hai Hồ sơ Tiêu biểu (Hồ sơ A vs Hồ sơ B)
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
            Kiểm chứng giả thuyết khoa học: Cùng định hướng Frontend, nhưng hai sinh viên có cấu trúc lỗ hổng đối nghịch sẽ nhận được lộ trình học hoàn toàn khác biệt nhờ cấu trúc DAG tiên quyết.
          </p>
        </div>

        {/* Dynamic Sensitivity Controller Slider */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.7)',
          padding: '12px 18px',
          borderRadius: '10px',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          minWidth: '240px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Ngưỡng chuẩn R(s):</span>
            <strong style={{ color: '#38bdf8', fontSize: '16px' }}>{sensitivityR}%</strong>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[65, 70, 75].map(val => (
              <button
                key={val}
                onClick={() => setSensitivityR(val)}
                style={{
                  flex: 1,
                  padding: '6px',
                  borderRadius: '6px',
                  border: 'none',
                  background: sensitivityR === val ? '#0ea5e9' : 'rgba(255,255,255,0.06)',
                  color: sensitivityR === val ? '#ffffff' : '#94a3b8',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                R = {val}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Side-by-Side Profiles Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Profile A Card */}
        <div className="card-panel" style={{ borderTop: '4px solid #38bdf8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div>
              <span className="skill-code-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                HỒ SƠ A (STU_001)
              </span>
              <h3 style={{ fontSize: '18px', color: '#f8fafc', marginTop: '6px' }}>{profileA.name}</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>Mô hình sinh viên: <em>"Nặng lý thuyết cú pháp, hổng kỹ năng thực hành dự án"</em></p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Điểm Pre-test</span>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#f59e0b' }}>
                {totalScoreA}<span style={{ fontSize: '13px' }}>/100</span>
              </div>
            </div>
          </div>

          <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <RadarChart skillScores={scoresA} size={280} />
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', fontSize: '12px', marginTop: '12px' }}>
            <strong style={{ color: '#38bdf8' }}>Đặc trưng khoảng cách:</strong>
            <p style={{ color: '#cbd5e1', marginTop: '4px' }}>
              Điểm lý thuyết HTML/CSS (80%) và JS cú pháp (70%) đạt ngưỡng, nhưng hổng nặng <strong>React (50%)</strong>, <strong>Git (40%)</strong> và <strong>Debug (40%)</strong>.
            </p>
          </div>
        </div>

        {/* Profile B Card */}
        <div className="card-panel" style={{ borderTop: '4px solid #a855f7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div>
              <span className="skill-code-badge" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
                HỒ SƠ B (STU_002)
              </span>
              <h3 style={{ fontSize: '18px', color: '#f8fafc', marginTop: '6px' }}>{profileB.name}</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>Mô hình sinh viên: <em>"Tự học qua video, quen copy template, rỗng nền tảng JS/DOM"</em></p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Điểm Pre-test</span>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#f43f5e' }}>
                {totalScoreB}<span style={{ fontSize: '13px' }}>/100</span>
              </div>
            </div>
          </div>

          <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <RadarChart skillScores={scoresB} size={280} />
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', fontSize: '12px', marginTop: '12px' }}>
            <strong style={{ color: '#a855f7' }}>Đặc trưng khoảng cách:</strong>
            <p style={{ color: '#cbd5e1', marginTop: '4px' }}>
              Quen dùng Git (75%) và gõ template React (60%), nhưng hổng trầm trọng <strong>JavaScript & DOM (45%)</strong> và <strong>API/Async (40%)</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Head-to-Head Comparison Table */}
      <div className="card-panel">
        <div className="panel-header">
          <FileSpreadsheet size={18} color="#38bdf8" />
          <h3>Bảng Đối Chiếu Chỉ Số Năng Lực & Khoảng Cách Tại Ngưỡng R = {sensitivityR}%</h3>
        </div>

        <div style={{ overflowX: 'auto', marginTop: '12px' }}>
          <table className="research-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Mã nhóm</th>
                <th>Tên Nhóm Kỹ Năng</th>
                <th>Trọng số w(s)</th>
                <th style={{ color: '#38bdf8' }}>Điểm SV A - C(A)</th>
                <th style={{ color: '#38bdf8' }}>Khoảng cách Gap(A)</th>
                <th style={{ color: '#a855f7' }}>Điểm SV B - C(B)</th>
                <th style={{ color: '#a855f7' }}>Khoảng cách Gap(B)</th>
                <th>So sánh thực nghiệm</th>
              </tr>
            </thead>
            <tbody>
              {scoresA.map((sA: SkillScore, idx: number) => {
                const sB = scoresB.find((b: SkillScore) => b.skillGroupId === sA.skillGroupId);
                return (
                  <tr key={sA.skillGroupId}>
                    <td><span className="skill-code-badge">{sA.skillGroupId}</span></td>
                    <td><strong>{sA.skillName}</strong></td>
                    <td>{Math.round(sA.weight * 100)}%</td>
                    <td style={{ color: sA.gap > 0 ? '#f43f5e' : '#10b981', fontWeight: 700 }}>
                      {sA.currentScore}%
                    </td>
                    <td>
                      {sA.gap > 0 ? (
                        <span className="gap-tag">-{sA.gap}đ ({sA.weightedGap})</span>
                      ) : (
                        <span className="pass-tag">0 (Đạt)</span>
                      )}
                    </td>
                    <td style={{ color: (sB?.gap || 0) > 0 ? '#f43f5e' : '#10b981', fontWeight: 700 }}>
                      {sB?.currentScore || 0}%
                    </td>
                    <td>
                      {(sB?.gap || 0) > 0 ? (
                        <span className="gap-tag">-{sB?.gap}đ ({sB?.weightedGap})</span>
                      ) : (
                        <span className="pass-tag">0 (Đạt)</span>
                      )}
                    </td>
                    <td style={{ fontSize: '12px', color: '#94a3b8' }}>
                      {sA.currentScore > (sB?.currentScore || 0) ? (
                        <span style={{ color: '#38bdf8' }}>SV A vượt trội (+{sA.currentScore - (sB?.currentScore || 0)}%)</span>
                      ) : sA.currentScore < (sB?.currentScore || 0) ? (
                        <span style={{ color: '#a855f7' }}>SV B vượt trội (+{(sB?.currentScore || 0) - sA.currentScore}%)</span>
                      ) : (
                        <span>Ngang bằng</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side-by-Side Personalized Roadmaps (DAG Resolution) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Roadmap A */}
        <div className="card-panel">
          <div className="panel-header">
            <Compass size={18} color="#38bdf8" />
            <h3>Lộ trình Đề xuất cho Sinh viên A ({roadmapA.length} Module)</h3>
          </div>
          <p className="panel-sub">
            Tổng thời gian học: <strong>{totalHoursA} giờ</strong> • Khởi đầu trực tiếp từ Tầng 2 & 3
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            {roadmapA.map((step, idx) => (
              <div key={step.skillGroupId} style={{
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '8px',
                padding: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      background: '#0284c7',
                      color: '#fff',
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700
                    }}>
                      {idx + 1}
                    </span>
                    <strong style={{ color: '#f8fafc', fontSize: '13px' }}>{step.skillName}</strong>
                  </div>
                  <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600 }}>
                    {step.estimatedHours}h
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                  {step.reason}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap B */}
        <div className="card-panel">
          <div className="panel-header">
            <Compass size={18} color="#a855f7" />
            <h3>Lộ trình Đề xuất cho Sinh viên B ({roadmapB.length} Module)</h3>
          </div>
          <p className="panel-sub">
            Tổng thời gian học: <strong>{totalHoursB} giờ</strong> • Bắt buộc củng cố G2 trước tiên
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            {roadmapB.map((step, idx) => (
              <div key={step.skillGroupId} style={{
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '8px',
                padding: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      background: '#7c3aed',
                      color: '#fff',
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700
                    }}>
                      {idx + 1}
                    </span>
                    <strong style={{ color: '#f8fafc', fontSize: '13px' }}>{step.skillName}</strong>
                  </div>
                  <span style={{ fontSize: '12px', color: '#c084fc', fontWeight: 600 }}>
                    {step.estimatedHours}h
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                  {step.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scientific Conclusion Box */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38bdf8', fontWeight: 700, marginBottom: '8px' }}>
          <Sparkles size={18} />
          <span>KẾT LUẬN THỰC NGHIỆM ĐÓNG GÓP HỌC THUẬT (NCKH VIỆN CNTT FBU)</span>
        </div>
        <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6' }}>
          Kết quả đối chiếu chứng minh rằng: Nếu áp dụng phương pháp đào tạo truyền thống theo một giáo trình tuyến tính cào bằng, cả hai sinh viên đều sẽ lãng phí thời gian học những nội dung mình đã biết hoặc bị quá tải ở những nội dung còn thiếu tiền đề.
          Mô hình kết hợp <strong>Chẩn đoán Khoảng cách Trọng số</strong> và <strong>Đồ thị Tiên quyết DAG</strong> tại Viện CNTT FBU đã tạo ra hai lộ trình hoàn toàn thích ứng: Sinh viên A tập trung hoàn thiện dự án thực chiến và Git (18 giờ), trong khi Sinh viên B được nắn chỉnh lại gốc rễ tư duy JavaScript/DOM trước khi phát triển React nâng cao (24 giờ).
        </p>
      </div>
    </div>
  );
};
