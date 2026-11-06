// ============================================================================
// VIEW: JOB MATCHER & TOPCV MARKET ANALYZER
// Đối sánh năng lực với 12 tin tuyển dụng TopCV (Bảng 2) & Quét JD thực tế
// ============================================================================
import React, { useState } from 'react';
import { StudentProfile, JobPosting } from '../../models/types';
import { SEED_JOB_POSTINGS } from '../../models/seedJobPostings';
import { JobMatchingController } from '../../controllers/JobMatchingController';
import { 
  Briefcase, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  MapPin, 
  DollarSign, 
  FileText 
} from 'lucide-react';

interface JobMatcherViewProps {
  student: StudentProfile;
}

export const JobMatcherView: React.FC<JobMatcherViewProps> = ({ student }) => {
  const scores = student.preTestReport?.skillScores || [];
  const [selectedJob, setSelectedJob] = useState<JobPosting>(SEED_JOB_POSTINGS[0]);
  const [filterType, setFilterType] = useState<'ALL' | 'Intern/Fresher' | 'Junior'>('ALL');
  
  // Custom JD Scanner
  const [activeTab, setActiveTab] = useState<'topcv' | 'customJd'>('topcv');
  const [customJdText, setCustomJdText] = useState<string>(
    'Tuyển dụng Frontend Fresher tại Hà Nội:\n- Thành thạo HTML/CSS, Flexbox, Grid\n- Có kiến thức tốt về JavaScript ES6+ và ReactJS\n- Biết gọi RESTful API bằng Axios\n- Sử dụng Git làm việc nhóm và biết cách debug cơ bản'
  );

  const filteredJobs = SEED_JOB_POSTINGS.filter(j => {
    if (filterType === 'Intern/Fresher') return j.jobType.includes('Fresher');
    if (filterType === 'Junior') return j.jobType.includes('kinh nghiệm');
    return true;
  });

  // Đối sánh với công việc được chọn
  const matchResult = JobMatchingController.matchStudentWithJob(selectedJob, scores);

  // Quét JD tùy biến
  const customDetectedSkills = JobMatchingController.scanJobDescriptionText(customJdText);
  const customJobSimulated: JobPosting = {
    id: 'CUSTOM_JD',
    title: 'Vị trí Tuyển dụng Tùy biến (Custom JD)',
    company: 'Doanh nghiệp IT Tuyển dụng',
    location: 'Hà Nội',
    source: 'Quét từ văn bản dán',
    jobType: 'Thực tập sinh / Fresher',
    skillsRequired: customDetectedSkills,
    salaryRange: 'Thỏa thuận theo năng lực',
    keyRequirements: []
  };
  const customMatchResult = JobMatchingController.matchStudentWithJob(customJobSimulated, scores);

  return (
    <div className="job-matcher-container" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Top Banner */}
      <div className="admin-header-card">
        <div>
          <div className="badge-pill admin-badge">KHẢO SÁT THỊ TRƯỜNG IT VIỆT NAM (BẢNG 2 ĐỀ CƯƠNG)</div>
          <h2>Đối Sánh Năng Lực Với Tin Tuyển Dụng TopCV Hà Nội</h2>
          <p className="admin-desc">
            Phân tích 12 tin tuyển dụng thực tế (tháng 10/2026). Đo lường tỷ lệ tương thích (%) và đề xuất các nhóm kỹ năng cần bù đắp trước khi nộp hồ sơ.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            className={`pill-btn ${activeTab === 'topcv' ? 'active' : ''}`}
            onClick={() => setActiveTab('topcv')}
          >
            <Briefcase size={13} /> 12 Tin Tuyển Dụng TopCV Mẫu
          </button>
          <button
            className={`pill-btn ${activeTab === 'customJd' ? 'active' : ''}`}
            onClick={() => setActiveTab('customJd')}
          >
            <FileText size={13} /> Quét JD Bất Kỳ (Custom Scanner)
          </button>
        </div>
      </div>

      {activeTab === 'topcv' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '18px' }}>
          {/* Left: Job Postings List */}
          <div className="card-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--text-main)' }}>Danh sách 12 Tin Tuyển dụng Thăm dò:</h3>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  className={`pill-btn ${filterType === 'ALL' ? 'active' : ''}`}
                  onClick={() => setFilterType('ALL')}
                >
                  Tất cả (12)
                </button>
                <button
                  className={`pill-btn ${filterType === 'Intern/Fresher' ? 'active' : ''}`}
                  onClick={() => setFilterType('Intern/Fresher')}
                >
                  Fresher/Intern (4)
                </button>
                <button
                  className={`pill-btn ${filterType === 'Junior' ? 'active' : ''}`}
                  onClick={() => setFilterType('Junior')}
                >
                  Có kinh nghiệm (8)
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '600px', overflowY: 'auto' }}>
              {filteredJobs.map(job => {
                const isSelected = job.id === selectedJob.id;
                const quickMatch = JobMatchingController.matchStudentWithJob(job, scores).overallMatchPercentage;
                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    style={{
                      background: isSelected ? 'var(--color-info-bg)' : 'var(--bg-card-subtle)',
                      border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <strong style={{ color: 'var(--text-main)', fontSize: '14px' }}>{job.title}</strong>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: '800',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          background: quickMatch >= 75 ? 'var(--color-success-bg)' : 'var(--color-warning-bg)',
                          color: quickMatch >= 75 ? 'var(--color-success-text)' : 'var(--color-warning-text)'
                        }}
                      >
                        Khớp: {quickMatch}%
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Building2 size={13} /> {job.company}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={13} /> {job.location}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {Object.entries(job.skillsRequired).map(([gId, req]) => req ? (
                        <span key={gId} className="skill-code-badge" style={{ fontSize: '10px' }}>{gId}</span>
                      ) : null)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Match Inspector */}
          <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="panel-header">
                <Sparkles size={18} color="var(--accent)" />
                <h3>Phân Tích Độ Tương Thích Năng Lực</h3>
              </div>

              <div style={{ background: 'var(--bg-card-subtle)', padding: '20px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                  Tỷ lệ đáp ứng yêu cầu của {student.name}:
                </span>
                <div style={{ fontSize: '42px', fontWeight: '800', color: matchResult.overallMatchPercentage >= 75 ? 'var(--color-success-text)' : 'var(--color-warning-text)', margin: '6px 0' }}>
                  {matchResult.overallMatchPercentage}%
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: '1.4' }}>
                  {matchResult.advice}
                </p>
              </div>

              <h4 style={{ color: 'var(--text-main)', fontSize: '14px', marginBottom: '12px' }}>
                Đối sánh chi tiết 6 nhóm kỹ năng:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {matchResult.matchedSkills.map(s => (
                  <div
                    key={s.skillGroupId}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-subtle)',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  >
                    <div>
                      <span className="skill-code-badge" style={{ marginRight: '6px' }}>{s.skillGroupId}</span>
                      <strong style={{ color: 'var(--text-main)' }}>{s.skillName}</strong>
                      {s.required && <span style={{ color: 'var(--color-warning-text)', marginLeft: '6px' }}>(Tin yêu cầu)</span>}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Điểm: {s.studentScore}%</span>
                      {s.isReady ? (
                        <span style={{ color: 'var(--color-success-text)', fontWeight: '700' }}>✓ Đạt</span>
                      ) : (
                        <span style={{ color: 'var(--color-danger-text)', fontWeight: '700' }}>⚠️ Hổng</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--color-info-bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-info-border)', marginTop: '20px' }}>
              <strong style={{ color: 'var(--accent)', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                💡 Cơ sở căn cứ Đề cương:
              </strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                Khảo sát khẳng định 100% tin yêu cầu HTML/CSS & JS, 92% React, 75% API & Git. Việc bù đắp đúng trọng số sẽ nâng tỷ lệ đỗ phỏng vấn tối đa.
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* CUSTOM JD SCANNER TAB */
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '18px' }}>
          <div className="card-panel">
            <h3 style={{ fontSize: '16px', color: 'var(--text-main)', marginBottom: '8px' }}>Dán nội dung Job Description (JD) cần phân tích:</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Hệ thống sẽ tự động quét các từ khóa kỹ năng theo khung chuẩn 6 nhóm để tính toán độ tương thích.
            </p>

            <textarea
              rows={12}
              value={customJdText}
              onChange={e => setCustomJdText(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                borderRadius: '8px',
                padding: '14px',
                color: 'var(--accent)',
                fontFamily: 'inherit',
                fontSize: '13px',
                lineHeight: '1.6',
                outline: 'none',
                marginBottom: '14px'
              }}
            />
          </div>

          <div className="card-panel">
            <div className="panel-header">
              <Sparkles size={18} color="var(--accent)" />
              <h3>Kết Quả Quét Kỹ Năng Tự Động</h3>
            </div>

            <div style={{ background: 'var(--bg-card-subtle)', padding: '20px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                Mức độ tương thích của sinh viên:
              </span>
              <div style={{ fontSize: '42px', fontWeight: '800', color: customMatchResult.overallMatchPercentage >= 75 ? 'var(--color-success-text)' : 'var(--color-warning-text)', margin: '6px 0' }}>
                {customMatchResult.overallMatchPercentage}%
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-main)' }}>{customMatchResult.advice}</p>
            </div>

            <h4 style={{ color: 'var(--text-main)', fontSize: '14px', marginBottom: '10px' }}>Các nhóm kỹ năng phát hiện trong JD:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {customMatchResult.matchedSkills.map(s => (
                <div
                  key={s.skillGroupId}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: s.required ? 'var(--color-info-bg)' : 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-subtle)',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                >
                  <strong style={{ color: s.required ? 'var(--accent)' : 'var(--text-muted)' }}>
                    {s.skillGroupId} - {s.skillName}
                  </strong>
                  <span style={{ color: 'var(--text-main)' }}>{s.required ? '✓ Tìm thấy trong JD' : '— Không yêu cầu'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
