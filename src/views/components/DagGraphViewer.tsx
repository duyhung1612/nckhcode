// ============================================================================
// VIEW COMPONENT: INTERACTIVE DAG GRAPH VIEWER (SƠ ĐỒ TIÊN QUYẾT CÓ HƯỚNG SVG)
// Trực quan hóa cấu trúc tiên quyết (Prerequisite DAG) phục vụ kiểm định học thuật
// ============================================================================
import React, { useState } from 'react';
import { SkillScore } from '../../models/types';
import { SEED_SKILL_GROUPS } from '../../models/seedSkills';
import { Network } from 'lucide-react';

interface DagGraphViewerProps {
  skillScores: SkillScore[];
  onSelectSkill?: (groupId: string) => void;
}

export const DagGraphViewer: React.FC<DagGraphViewerProps> = ({
  skillScores,
  onSelectSkill
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('G2');

  // Tọa độ các Node trên canvas SVG (width: 700, height: 380)
  const nodePositions: Record<string, { x: number; y: number; tier: number }> = {
    G1: { x: 120, y: 90, tier: 1 },   // HTML/CSS
    G2: { x: 120, y: 270, tier: 1 },  // JavaScript & DOM
    G5: { x: 350, y: 50, tier: 1 },   // Git/GitHub (Độc lập)
    G6: { x: 580, y: 270, tier: 1 },  // Debug & Test
    G3: { x: 350, y: 190, tier: 2 },  // React cơ bản (Tiên quyết từ G2 & G1)
    G4: { x: 350, y: 310, tier: 2 }   // API & Async (Tiên quyết từ G2)
  };

  // Các cung có hướng (Directed Edges: Source -> Target)
  const edges: { from: string; to: string; label?: string }[] = [
    { from: 'G1', to: 'G3', label: 'Cấu trúc UI' },
    { from: 'G2', to: 'G3', label: 'Bắt buộc (Tiên quyết)' },
    { from: 'G2', to: 'G4', label: 'ES6+ & Promise' },
    { from: 'G2', to: 'G6', label: 'Logic gỡ lỗi' },
    { from: 'G3', to: 'G6', label: 'Component debug' }
  ];

  const selectedGroup = SEED_SKILL_GROUPS.find(g => g.id === selectedNodeId);
  const selectedScore = skillScores.find(s => s.skillGroupId === selectedNodeId);

  return (
    <div className="dag-viewer-card card-panel" style={{ marginTop: '20px' }}>
      <div className="panel-header">
        <Network size={18} color="var(--accent)" />
        <h3>Sơ đồ Đồ thị Tiên quyết Có hướng (Prerequisite DAG Network)</h3>
      </div>
      <p className="panel-sub">
        Quy tắc sư phạm: Node nguồn là tiền đề bắt buộc phải nắm vững trước khi học Node đích. Nhấp vào từng Node để xem chi tiết liên kết và chỉ báo.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', alignItems: 'center' }}>
        {/* SVG Canvas */}
        <div style={{ background: 'var(--dag-canvas-bg)', borderRadius: '12px', padding: '16px', border: '1px solid var(--border-subtle)', position: 'relative' }}>
          <svg width="100%" height="340" viewBox="0 0 700 360" style={{ overflow: 'visible' }}>
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="8"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="var(--primary)" />
              </marker>
            </defs>

            {/* Background Tier Columns */}
            <rect x="30" y="20" width="180" height="320" rx="8" fill="var(--dag-tier-bg)" stroke="var(--border-subtle)" />
            <text x="120" y="330" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="700">TẦNG 1: NỀN TẢNG</text>

            <rect x="260" y="20" width="180" height="320" rx="8" fill="var(--dag-tier-bg)" stroke="var(--border-subtle)" />
            <text x="350" y="330" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="700">TẦNG 2: ỨNG DỤNG NÂNG CAO</text>

            <rect x="490" y="20" width="180" height="320" rx="8" fill="var(--dag-tier-bg)" stroke="var(--border-subtle)" />
            <text x="580" y="330" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="700">TẦNG 3: BỔ TRỢ & GỠ LỖI</text>

            {/* Directed Edges */}
            {edges.map((e, idx) => {
              const start = nodePositions[e.from];
              const end = nodePositions[e.to];
              const isSelectedPath = e.from === selectedNodeId || e.to === selectedNodeId;
              return (
                <g key={idx}>
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={isSelectedPath ? 'var(--primary)' : 'var(--dag-edge-stroke)'}
                    strokeWidth={isSelectedPath ? 2.5 : 1.5}
                    strokeDasharray={isSelectedPath ? 'none' : '4,4'}
                    markerEnd="url(#arrowhead)"
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {SEED_SKILL_GROUPS.map(g => {
              const pos = nodePositions[g.id];
              const scoreObj = skillScores.find(s => s.skillGroupId === g.id);
              const score = scoreObj?.currentScore ?? 50;
              const isWeak = score < 70;
              const isSelected = g.id === selectedNodeId;

              return (
                <g
                  key={g.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedNodeId(g.id);
                    if (onSelectSkill) onSelectSkill(g.id);
                  }}
                >
                  {/* Outer glow ring if selected */}
                  {isSelected && (
                    <circle r="36" fill="var(--color-info-bg)" stroke="var(--primary)" strokeWidth="2" />
                  )}

                  {/* Main Node Circle */}
                  <circle
                    r="28"
                    fill={isWeak ? 'var(--dag-node-weak-fill)' : 'var(--dag-node-pass-fill)'}
                    stroke={isWeak ? 'var(--dag-node-weak-stroke)' : 'var(--dag-node-pass-stroke)'}
                    strokeWidth="2.5"
                    style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' }}
                  />

                  {/* Node Text Label */}
                  <text textAnchor="middle" y="-4" fill="var(--dag-node-id)" fontSize="12" fontWeight="800">
                    {g.id}
                  </text>
                  <text textAnchor="middle" y="12" fill={isWeak ? 'var(--dag-node-weak-score)' : 'var(--dag-node-pass-score)'} fontSize="11" fontWeight="700">
                    {score}%
                  </text>

                  {/* Name below node */}
                  <text textAnchor="middle" y="44" fill="var(--text-main)" fontSize="10" fontWeight="600">
                    {g.name.split('&')[0].trim()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Node Detail Inspector Sidebar */}
        {selectedGroup && (
          <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="skill-code-badge">{selectedGroup.id}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Tầng tiên quyết: <strong>{nodePositions[selectedGroup.id].tier}</strong>
              </span>
            </div>

            <h4 style={{ color: 'var(--text-main)', fontSize: '15px', marginBottom: '6px' }}>{selectedGroup.name}</h4>
            <div style={{ fontSize: '13px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
              <span>Điểm hiện tại: <strong>{selectedScore?.currentScore || 0}%</strong></span>
              {selectedScore && selectedScore.gap > 0 ? (
                <span className="gap-tag">Hổng -{selectedScore.gap}đ</span>
              ) : (
                <span className="pass-tag">✓ Đạt chuẩn</span>
              )}
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: '1.4' }}>
              {selectedGroup.description}
            </p>

            <div style={{ fontSize: '12px', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '6px' }}>
              <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '4px' }}>Quan hệ tiên quyết:</strong>
              {selectedGroup.prerequisites.length === 0 ? (
                <span style={{ color: 'var(--color-success-text)' }}>✓ Kỹ năng độc lập nền tảng, có thể học ngay.</span>
              ) : (
                <span style={{ color: 'var(--color-warning-text)' }}>
                  ⚠️ Bắt buộc hoàn thành trước: {selectedGroup.prerequisites.join(', ')}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
