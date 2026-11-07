// ============================================================================
// VIEW COMPONENT: DYNAMIC SVG RADAR CHART (BIỂU ĐỒ MẠNG NHỆN NĂNG LỰC)
// Đối sánh trực quan điểm hiện tại C(s) và ngưỡng yêu cầu R(s) = 70
// Đảm bảo chính xác 6 nhóm kỹ năng duy nhất, không trùng lặp nhãn & legend
// ============================================================================
import React, { useState, useMemo, useEffect } from 'react';
import { SkillScore } from '../../models/types';
import { Target } from 'lucide-react';

interface RadarChartProps {
  skillScores: SkillScore[];
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ skillScores, size = 420 }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Reset hover state khi danh sách điểm hoặc sinh viên thay đổi
  useEffect(() => {
    setHoveredIndex(null);
  }, [skillScores]);

  // Lọc và chuẩn hóa dữ liệu: Bắt buộc đúng 6 nhóm kỹ năng duy nhất (G1 -> G6), loại bỏ duplicate
  const cleanScores = useMemo(() => {
    if (!skillScores || !Array.isArray(skillScores)) return [];
    const seen = new Set<string>();
    const unique: SkillScore[] = [];

    for (const item of skillScores) {
      const id = item.skillGroupId || item.skillName;
      if (id && !seen.has(id)) {
        seen.add(id);
        unique.push(item);
      }
    }

    // Sắp xếp ổn định theo thứ tự 6 nhóm chuẩn NCKH
    const order = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6'];
    unique.sort((a, b) => {
      const ia = order.indexOf(a.skillGroupId);
      const ib = order.indexOf(b.skillGroupId);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

    return unique.slice(0, 6);
  }, [skillScores]);

  const center = size / 2;
  const radius = (size / 2) * 0.64; // Tối ưu tỷ lệ bán kính để nhãn và badge điểm không bao giờ bị cắt
  const totalAxes = cleanScores.length || 6;
  const angleStep = (Math.PI * 2) / totalAxes;

  // Tọa độ các điểm theo góc và bán kính
  const getCoordinates = (index: number, value: number, maxVal = 100) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / maxVal) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Các vòng đa giác lưới nền (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [20, 40, 60, 80, 100];

  // Đa giác đường chuẩn yêu cầu R(s)
  const reqPoints = cleanScores
    .map((s, i) => {
      const { x, y } = getCoordinates(i, s.requiredScore || 70);
      return `${x},${y}`;
    })
    .join(' ');

  // Đa giác điểm hiện tại của sinh viên C(s)
  const currentPoints = cleanScores
    .map((s, i) => {
      const { x, y } = getCoordinates(i, s.currentScore);
      return `${x},${y}`;
    })
    .join(' ');

  if (cleanScores.length === 0) {
    return (
      <div className="radar-empty-fallback spatial-card" style={{ padding: '40px 20px', textAlign: 'center', margin: '20px auto' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--radar-grid-fill)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
          <Target size={26} color="var(--accent)" style={{ opacity: 0.7 }} />
        </div>
        <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>Chưa có dữ liệu bài làm</h4>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
          Sinh viên chưa hoàn thành bài kiểm tra tiền kiểm. Vui lòng làm bài đánh giá để xem biểu đồ đối sánh.
        </p>
      </div>
    );
  }

  const isAllZero = cleanScores.every(s => (s.currentScore ?? 0) === 0);

  return (
    <div className="radar-chart-container" style={{ textAlign: 'center', position: 'relative' }}>
      <div className="radar-svg-wrapper">
        {isAllZero && (
          <div
            className="radar-empty-overlay"
            style={{
              position: 'absolute',
              top: '46%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(11, 19, 43, 0.90)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-subtle)',
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              pointerEvents: 'none',
              textAlign: 'center',
              maxWidth: '240px',
              zIndex: 5
            }}
          >
            <Target size={22} color="var(--accent)" style={{ margin: '0 auto 4px', display: 'block', opacity: 0.85 }} />
            <strong style={{ fontSize: '12.5px', color: 'var(--text-main)', display: 'block' }}>Chưa có bài đánh giá</strong>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Điểm hiện tại 0/100. Hãy làm bài kiểm tra tiền kiểm.</span>
          </div>
        )}
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`} 
          className="radar-svg-canvas"
          style={{ overflow: 'visible', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
        >
          <defs>
            {/* Gradient Năng lực Sinh viên */}
            <linearGradient id="studentRadarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.25" />
            </linearGradient>

            {/* Gradient Chuẩn yêu cầu */}
            <radialGradient id="benchRadarGradient" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
            </radialGradient>

            {/* Filter Neon Glow */}
            <filter id="radarNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Soft Shadow cho điểm dữ liệu */}
            <filter id="pointShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Vòng đa giác lưới nền */}
          {gridLevels.map((lvl) => {
            const points = Array.from({ length: totalAxes })
              .map((_, i) => {
                const { x, y } = getCoordinates(i, lvl);
                return `${x},${y}`;
              })
              .join(' ');
            return (
              <g key={`grid-group-${lvl}`} style={{ pointerEvents: 'none' }}>
                <polygon
                  points={points}
                  fill={lvl === 100 ? 'var(--radar-grid-fill)' : 'none'}
                  stroke="var(--radar-grid-stroke)"
                  strokeWidth={lvl === 100 ? '1.5' : '1'}
                  strokeDasharray={lvl === 100 ? 'none' : '2,2'}
                  style={{ transition: 'all 0.3s ease', pointerEvents: 'none' }}
                />
                {/* Chỉ số mức % trên trục thẳng đứng */}
                <text
                  x={center + 4}
                  y={center - (lvl / 100) * radius + 10}
                  fontSize="9"
                  fontWeight="600"
                  fill="var(--text-dim)"
                  opacity="0.8"
                  style={{ pointerEvents: 'none' }}
                >
                  {lvl}%
                </text>
              </g>
            );
          })}

          {/* 6 Trục nan hoa chính (Radial Axes) */}
          {cleanScores.map((s, i) => {
            const { x, y } = getCoordinates(i, 100);
            const isHovered = hoveredIndex === i;
            return (
              <line
                key={`axis-${s.skillGroupId || i}`}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke={isHovered ? 'var(--accent)' : 'var(--radar-axis-stroke)'}
                strokeWidth={isHovered ? '1.5' : '1'}
                strokeDasharray={isHovered ? 'none' : '3,3'}
                style={{ transition: 'stroke 0.2s ease', pointerEvents: 'none' }}
              />
            );
          })}

          {/* Đa giác Chuẩn yêu cầu R(s) - Đường nét đứt màu cam hổ phách */}
          <polygon
            points={reqPoints}
            fill="url(#benchRadarGradient)"
            stroke="var(--radar-bench-stroke)"
            strokeWidth="2"
            strokeDasharray="4,4"
            className="radar-req-polygon"
            style={{ pointerEvents: 'none' }}
          />

          {/* Đa giác Năng lực Sinh viên C(s) - Gradient xanh ngọc lấp lánh */}
          <polygon
            points={currentPoints}
            fill="url(#studentRadarGradient)"
            stroke="var(--radar-student-stroke)"
            strokeWidth="2.5"
            filter="url(#radarNeonGlow)"
            className="radar-current-polygon"
            style={{ pointerEvents: 'none' }}
          />

          {/* Các điểm tròn dữ liệu trên từng trục (Chỉ 6 điểm duy nhất) */}
          {cleanScores.map((s, i) => {
            const { x, y } = getCoordinates(i, s.currentScore);
            const isWeak = s.gap > 0;
            const isHovered = hoveredIndex === i;

            return (
              <g 
                key={`point-${s.skillGroupId || i}`}
                className="radar-point-node"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer halo when hovered - pointer-events: none */}
                {isHovered && (
                  <circle
                    cx={x}
                    cy={y}
                    r="10"
                    fill={isWeak ? 'rgba(244, 63, 94, 0.25)' : 'rgba(16, 185, 129, 0.25)'}
                    style={{ pointerEvents: 'none' }}
                  />
                )}

                {/* Điểm tròn dữ liệu: bán kính cố định r=5 không đổi, chỉ đổi màu stroke */}
                <circle
                  cx={x}
                  cy={y}
                  r={5}
                  fill={isWeak ? 'var(--color-danger)' : 'var(--color-success)'}
                  stroke={isHovered ? 'var(--accent)' : 'var(--bg-card)'}
                  strokeWidth={isHovered ? '2.5' : '2'}
                  filter="url(#pointShadow)"
                  style={{ pointerEvents: 'none', transition: 'stroke 0.2s ease' }}
                />

                {/* Score badge label */}
                <rect
                  x={x - 17}
                  y={y - 23}
                  width="34"
                  height="16"
                  rx="4"
                  fill="var(--bg-card)"
                  stroke={isHovered ? 'var(--accent)' : (isWeak ? 'var(--color-danger-border)' : 'var(--color-success-border)')}
                  strokeWidth="1"
                  filter="url(#pointShadow)"
                  style={{ pointerEvents: 'none', transition: 'stroke 0.2s ease' }}
                />
                <text
                  x={x}
                  y={y - 12}
                  fontSize="10"
                  fontWeight="700"
                  fill={isHovered ? 'var(--accent)' : (isWeak ? 'var(--color-danger-text)' : 'var(--color-success-text)')}
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{ pointerEvents: 'none', transition: 'fill 0.2s ease' }}
                >
                  {s.currentScore}%
                </text>

                {/* Vùng cảm ứng hit target cố định r=14 cho điểm */}
                <circle
                  cx={x}
                  cy={y}
                  r={14}
                  fill="transparent"
                  style={{ pointerEvents: 'all' }}
                />
              </g>
            );
          })}

          {/* Nhãn tên 6 nhóm kỹ năng quanh biểu đồ (Chỉ 6 nhãn duy nhất) */}
          {cleanScores.map((s, i) => {
            const labelCoord = getCoordinates(i, 122);
            const shortName = s.skillName.split('&')[0].trim();
            const isHovered = hoveredIndex === i;

            return (
              <g 
                key={`label-${s.skillGroupId || i}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Text nhãn: fontSize và fontWeight cố định (11.5px, 700), chỉ đổi màu fill */}
                <text
                  x={labelCoord.x}
                  y={labelCoord.y}
                  fontSize="11.5"
                  fontWeight="700"
                  fill={isHovered ? 'var(--accent)' : 'var(--radar-label-color)'}
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{
                    transition: 'fill 0.2s ease',
                    paintOrder: 'stroke fill',
                    stroke: 'var(--bg-card)',
                    strokeWidth: '3.5px',
                    strokeLinejoin: 'round',
                    pointerEvents: 'none'
                  }}
                >
                  {shortName}
                </text>

                {/* Vùng cảm ứng hit circle cố định r=14 cho nhãn */}
                <circle
                  cx={labelCoord.x}
                  cy={labelCoord.y}
                  r={14}
                  fill="transparent"
                  style={{ pointerEvents: 'all' }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Vùng chứa tooltip cố định chiều cao để không đẩy layout làm giật biểu đồ */}
      <div 
        className="radar-tooltip-slot"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '32px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '6px',
          marginBottom: '2px'
        }}
      >
        {hoveredIndex !== null && cleanScores[hoveredIndex] && (
          <div 
            className="radar-tooltip-pill"
            style={{
              position: 'absolute',
              pointerEvents: 'none'
            }}
          >
            <strong>{cleanScores[hoveredIndex].skillName}</strong>: {cleanScores[hoveredIndex].currentScore}% 
            (Chuẩn: {cleanScores[hoveredIndex].requiredScore || 70}% • {cleanScores[hoveredIndex].gap > 0 ? `Thiếu ${cleanScores[hoveredIndex].gap}đ` : 'Đạt chuẩn'})
          </div>
        )}
      </div>

      {/* Chú giải biểu đồ (Legend) - Hiển thị duy nhất một bộ */}
      <div className="radar-legend-bar">
        <div className="radar-legend-item">
          <span className="radar-legend-indicator legend-current"></span>
          <span className="radar-legend-text">Năng lực hiện tại C(s)</span>
        </div>
        <div className="radar-legend-item">
          <span className="radar-legend-indicator legend-bench"></span>
          <span className="radar-legend-text warning-text">Chuẩn đầu vào R(s) = {cleanScores[0]?.requiredScore || 70}%</span>
        </div>
        <div className="radar-legend-item">
          <span className="radar-legend-indicator legend-weak"></span>
          <span className="radar-legend-text danger-text">Lỗ hổng cần bổ sung (Gap &gt; 0)</span>
        </div>
      </div>
    </div>
  );
};
