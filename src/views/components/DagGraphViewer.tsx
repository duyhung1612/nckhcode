// ============================================================================
// VIEW COMPONENT: INTERACTIVE DAG GRAPH VIEWER (SƠ ĐỒ TIÊN QUYẾT CÓ HƯỚNG SVG)
// Trực quan hóa cấu trúc tiên quyết (Prerequisite DAG) phục vụ kiểm định học thuật
// ============================================================================
import React, { useState } from 'react';
import { SkillScore } from '../../models/types';
import { SEED_SKILL_GROUPS } from '../../models/seedSkills';
import { Network, Info, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

interface DagGraphViewerProps {
  skillScores: SkillScore[];
  onSelectSkill?: (groupId: string) => void;
}

export const DagGraphViewer: React.FC<DagGraphViewerProps> = ({
  skillScores,
  onSelectSkill
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('G2');
  const safeScores = Array.isArray(skillScores) ? skillScores : [];

  // Reset selected node khi điểm số/sinh viên thay đổi
  React.useEffect(() => {
    setSelectedNodeId('G2');
  }, [skillScores]);

  // Tọa độ chuẩn xác từng Node theo 3 Cột Tầng (viewBox: 760 x 410)
  // Cột 1 (Tầng 1): x = 135 | Cột 2 (Tầng 2): x = 380 | Cột 3 (Tầng 3): x = 625
  const nodePositions: Record<string, { x: number; y: number; tier: number }> = {
    G1: { x: 135, y: 125, tier: 1 },  // HTML/CSS & UI (Nền tảng)
    G2: { x: 135, y: 235, tier: 1 },  // JavaScript & DOM (Nền tảng cốt lõi)
    G5: { x: 135, y: 340, tier: 1 },  // Git/GitHub (Nền tảng độc lập)
    G3: { x: 380, y: 155, tier: 2 },  // React cơ bản (Tiên quyết từ G2 & G1)
    G4: { x: 380, y: 295, tier: 2 },  // Kết nối API & Async (Tiên quyết từ G2)
    G6: { x: 625, y: 225, tier: 3 }   // Debug & Kiểm thử (Tiên quyết từ G2 & G3)
  };

  // Các cung có hướng (Directed Edges: Source -> Target) cùng vị trí nhãn tối ưu
  const edges: { from: string; to: string; label?: string; labelX?: number; labelY?: number }[] = [
    { from: 'G1', to: 'G3', label: 'Cấu trúc UI', labelX: 257, labelY: 130 },
    { from: 'G2', to: 'G3', label: 'Bắt buộc (Tiên quyết)', labelX: 257, labelY: 185 },
    { from: 'G2', to: 'G4', label: 'ES6+ & Promise', labelX: 257, labelY: 275 },
    { from: 'G3', to: 'G6', label: 'Component debug', labelX: 502, labelY: 178 },
    { from: 'G2', to: 'G6', label: 'Logic gỡ lỗi', labelX: 502, labelY: 242 }
  ];

  const selectedGroup = SEED_SKILL_GROUPS.find(g => g.id === selectedNodeId);
  const selectedScore = safeScores.find(s => s?.skillGroupId === selectedNodeId);

  return (
    <div className="dag-viewer-card card-panel spatial-card" style={{ marginTop: '24px' }}>
      <div className="panel-header">
        <Network size={20} color="var(--accent)" />
        <h3>Sơ đồ Đồ thị Tiên quyết Có hướng (Prerequisite DAG Network)</h3>
      </div>
      <p className="panel-sub">
        Quy tắc sư phạm: Node nguồn là tiền đề bắt buộc phải nắm vững trước khi học Node đích. Nhấp vào từng Node để xem chi tiết liên kết và chỉ báo.
      </p>

      <div className="dag-viewer-layout-grid">
        {/* SVG Canvas */}
        <div className="dag-canvas-container">
          <svg
            viewBox="0 0 760 410"
            className="dag-svg-canvas"
            style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="9"
                markerHeight="7"
                refX="8"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 9 3.5, 0 7" fill="var(--dag-edge-stroke)" />
              </marker>

              <marker
                id="arrowheadActive"
                markerWidth="10"
                markerHeight="8"
                refX="9"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 10 4, 0 8" fill="#38bdf8" />
              </marker>

              {/* Node drop shadow */}
              <filter id="dagNodeShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Background Tier Columns */}
            {/* Tầng 1 */}
            <rect x="25" y="20" width="220" height="370" rx="12" fill="var(--dag-tier-bg)" stroke="var(--border-subtle)" />
            <rect x="35" y="30" width="200" height="28" rx="6" fill="var(--dag-tier-header-bg)" />
            <text x="135" y="48" textAnchor="middle" fill="var(--accent)" fontSize="11" fontWeight="700" letterSpacing="0.05em">
              TẦNG 1: NỀN TẢNG
            </text>

            {/* Tầng 2 */}
            <rect x="270" y="20" width="220" height="370" rx="12" fill="var(--dag-tier-bg)" stroke="var(--border-subtle)" />
            <rect x="280" y="30" width="200" height="28" rx="6" fill="var(--dag-tier-header-bg)" />
            <text x="380" y="48" textAnchor="middle" fill="var(--accent)" fontSize="11" fontWeight="700" letterSpacing="0.05em">
              TẦNG 2: ỨNG DỤNG NÂNG CAO
            </text>

            {/* Tầng 3 */}
            <rect x="515" y="20" width="220" height="370" rx="12" fill="var(--dag-tier-bg)" stroke="var(--border-subtle)" />
            <rect x="525" y="30" width="200" height="28" rx="6" fill="var(--dag-tier-header-bg)" />
            <text x="625" y="48" textAnchor="middle" fill="var(--accent)" fontSize="11" fontWeight="700" letterSpacing="0.05em">
              TẦNG 3: BỔ TRỢ & GỠ LỖI
            </text>

            {/* Directed Edges */}
            {edges.map((e, idx) => {
              const start = nodePositions[e.from];
              const end = nodePositions[e.to];
              const isSelectedPath = e.from === selectedNodeId || e.to === selectedNodeId;

              // Tính điểm cắt tiếp tuyến mép ngoài đường tròn (bán kính 26 + lề 4px = 30px)
              const radiusMargin = 30;
              const dx = end.x - start.x;
              const dy = end.y - start.y;
              const dist = Math.sqrt(dx * dx + dy * dy) || 1;
              const x1 = start.x + (dx / dist) * radiusMargin;
              const y1 = start.y + (dy / dist) * radiusMargin;
              const x2 = end.x - (dx / dist) * radiusMargin;
              const y2 = end.y - (dy / dist) * radiusMargin;

              const lblX = e.labelX ?? (start.x + end.x) / 2;
              const lblY = e.labelY ?? (start.y + end.y) / 2 - 6;

              return (
                <g key={`edge-${idx}`}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={isSelectedPath ? '#38bdf8' : 'var(--dag-edge-stroke)'}
                    strokeWidth={isSelectedPath ? 2.5 : 1.5}
                    strokeDasharray={isSelectedPath ? 'none' : '4,4'}
                    markerEnd={isSelectedPath ? 'url(#arrowheadActive)' : 'url(#arrowhead)'}
                    style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
                  />
                  {e.label && (
                    <text
                      x={lblX}
                      y={lblY}
                      fill={isSelectedPath ? '#38bdf8' : 'var(--text-dim)'}
                      fontSize="9.5"
                      fontWeight="700"
                      textAnchor="middle"
                      style={{
                        paintOrder: 'stroke fill',
                        stroke: 'var(--dag-canvas-bg)',
                        strokeWidth: '4px',
                        strokeLinejoin: 'round'
                      }}
                    >
                      {e.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {SEED_SKILL_GROUPS.map(g => {
              const pos = nodePositions[g.id];
              const scoreObj = safeScores.find(s => s?.skillGroupId === g.id);
              const score = scoreObj?.currentScore ?? 0;
              const isWeak = (scoreObj?.gap ?? 0) > 0;
              const isSelected = g.id === selectedNodeId;

              return (
                <g
                  key={g.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => {
                    setSelectedNodeId(g.id);
                    if (onSelectSkill) onSelectSkill(g.id);
                  }}
                  className="dag-node-group"
                >
                  {/* Outer animated halo ring if selected */}
                  {isSelected && (
                    <circle
                      r="34"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      className="dag-node-halo"
                    />
                  )}

                  {/* Main Node Circle */}
                  <circle
                    r="26"
                    className="dag-main-circle"
                    fill={isWeak ? 'var(--dag-node-weak-fill)' : 'var(--dag-node-pass-fill)'}
                    stroke={isWeak ? 'var(--dag-node-weak-stroke)' : 'var(--dag-node-pass-stroke)'}
                    strokeWidth="2.5"
                    filter="url(#dagNodeShadow)"
                  />

                  {/* Node Text Label */}
                  <text
                    textAnchor="middle"
                    y="-4"
                    fill="var(--dag-node-id)"
                    fontSize="12"
                    fontWeight="800"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {g.id}
                  </text>
                  <text
                    textAnchor="middle"
                    y="12"
                    fill={isWeak ? 'var(--dag-node-weak-score)' : 'var(--dag-node-pass-score)'}
                    fontSize="11"
                    fontWeight="700"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {score}%
                  </text>

                  {/* Name below node */}
                  <text
                    textAnchor="middle"
                    y="44"
                    fill="var(--text-main)"
                    fontSize="10.5"
                    fontWeight="600"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {g.name.split('&')[0].trim()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Node Detail Inspector Sidebar */}
        {selectedGroup && (
          <div className="dag-inspector-panel">
            <div className="inspector-header">
              <span className="skill-code-badge">{selectedGroup.id}</span>
              <span className="inspector-tier-tag">
                <Layers size={12} /> Tầng: <strong>{nodePositions[selectedGroup.id]?.tier || 1}</strong>
              </span>
            </div>

            <h4 className="inspector-title">{selectedGroup.name}</h4>
            <div className="inspector-score-row">
              <span>Điểm hiện tại: <strong>{selectedScore?.currentScore || 0}%</strong></span>
              {selectedScore && selectedScore.gap > 0 ? (
                <span className="gap-tag">Hổng -{selectedScore.gap}đ</span>
              ) : (
                <span className="pass-tag">✓ Đạt chuẩn</span>
              )}
            </div>

            <p className="inspector-desc">
              {selectedGroup.description}
            </p>

            <div className="inspector-prereq-box">
              <strong className="prereq-box-label">
                <Info size={13} /> Quan hệ tiên quyết:
              </strong>
              {selectedGroup.prerequisites.length === 0 ? (
                <span className="prereq-ok">
                  <CheckCircle2 size={13} /> Kỹ năng độc lập nền tảng, có thể học ngay.
                </span>
              ) : (
                <span className="prereq-warn">
                  <AlertTriangle size={13} /> Bắt buộc hoàn thành trước: {selectedGroup.prerequisites.join(', ')}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
