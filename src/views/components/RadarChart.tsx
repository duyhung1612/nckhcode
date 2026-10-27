// ============================================================================
// VIEW COMPONENT: DYNAMIC SVG RADAR CHART (BIỂU ĐỒ MẠNG NHỆN NĂNG LỰC)
// Đối sánh trực quan điểm hiện tại C(s) và ngưỡng yêu cầu R(s) = 70
// ============================================================================
import React from 'react';
import { SkillScore } from '../../models/types';

interface RadarChartProps {
  skillScores: SkillScore[];
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ skillScores, size = 420 }) => {
  const center = size / 2;
  const radius = (size / 2) * 0.72;
  const totalAxes = skillScores.length || 6;
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

  // Các vòng tròn/đa giác nền (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [20, 40, 60, 80, 100];

  // Đa giác đường chuẩn yêu cầu R(s)
  const reqPoints = skillScores
    .map((s, i) => {
      const { x, y } = getCoordinates(i, s.requiredScore);
      return `${x},${y}`;
    })
    .join(' ');

  // Đa giác điểm hiện tại của sinh viên C(s)
  const currentPoints = skillScores
    .map((s, i) => {
      const { x, y } = getCoordinates(i, s.currentScore);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="radar-chart-container" style={{ textAlign: 'center', position: 'relative' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
        {/* Vòng đa giác lưới nền */}
        {gridLevels.map((lvl) => {
          const points = Array.from({ length: totalAxes })
            .map((_, i) => {
              const { x, y } = getCoordinates(i, lvl);
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polygon
              key={`grid-${lvl}`}
              points={points}
              fill={lvl === 100 ? 'rgba(30, 41, 59, 0.4)' : 'none'}
              stroke="rgba(148, 163, 184, 0.2)"
              strokeWidth="1"
            />
          );
        })}

        {/* Các trục nan hoa (Axes) */}
        {skillScores.map((_, i) => {
          const { x, y } = getCoordinates(i, 100);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(148, 163, 184, 0.25)"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          );
        })}

        {/* Đa giác Chuẩn yêu cầu R(s) - Đường nét đứt màu cam hổ phách */}
        <polygon
          points={reqPoints}
          fill="rgba(245, 158, 11, 0.08)"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="4,4"
        />

        {/* Đa giác Năng lực Sinh viên C(s) - Gradient xanh ngọc lấp lánh */}
        <polygon
          points={currentPoints}
          fill="rgba(14, 165, 233, 0.35)"
          stroke="#0284c7"
          strokeWidth="2.5"
        />

        {/* Các điểm tròn dữ liệu trên từng trục */}
        {skillScores.map((s, i) => {
          const { x, y } = getCoordinates(i, s.currentScore);
          const isWeak = s.gap > 0;
          return (
            <g key={`point-${i}`}>
              <circle
                cx={x}
                cy={y}
                r="5"
                fill={isWeak ? '#ef4444' : '#10b981'}
                stroke="#ffffff"
                strokeWidth="2"
                style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
              />
              <text
                x={x}
                y={y - 8}
                fontSize="11"
                fontWeight="700"
                fill={isWeak ? '#f87171' : '#34d399'}
                textAnchor="middle"
              >
                {s.currentScore}%
              </text>
            </g>
          );
        })}

        {/* Nhãn tên từng nhóm kỹ năng quanh biểu đồ */}
        {skillScores.map((s, i) => {
          const labelCoord = getCoordinates(i, 118);
          // Rút gọn tên cho vừa mắt
          const shortName = s.skillName.split('&')[0].trim();
          return (
            <text
              key={`label-${i}`}
              x={labelCoord.x}
              y={labelCoord.y}
              fontSize="12"
              fontWeight="600"
              fill="#cbd5e1"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {shortName}
            </text>
          );
        })}
      </svg>

      {/* Chú giải biểu đồ (Legend) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
          <span style={{ width: '14px', height: '14px', borderRadius: '3px', background: 'rgba(14, 165, 233, 0.7)' }}></span>
          <span style={{ color: '#e2e8f0' }}>Năng lực hiện tại C(s)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
          <span style={{ width: '14px', height: '3px', borderTop: '2px dashed #f59e0b' }}></span>
          <span style={{ color: '#f59e0b' }}>Chuẩn đầu vào R(s) = {skillScores[0]?.requiredScore || 70}%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
          <span style={{ color: '#f87171' }}>Lỗ hổng cần bổ sung (Gap &gt; 0)</span>
        </div>
      </div>
    </div>
  );
};
