// ============================================================================
// MODEL LAYER: 12 TIN TUYỂN DỤNG TOPCV HÀ NỘI (BẢNG 2 TRONG ĐỀ CƯƠNG)
// Tập dữ liệu thăm dò thực tế làm căn cứ hình thành khung kỹ năng chuẩn
// ============================================================================
import { JobPosting } from './types';

export const SEED_JOB_POSTINGS: JobPosting[] = [
  // --- 4 TIN THỰC TẬP SINH / FRESHER ---
  {
    id: 'TOPCV_01',
    title: 'Thực tập sinh Frontend Developer (ReactJS / JS)',
    company: 'FPT Software Hà Nội',
    location: 'Cầu Giấy, Hà Nội',
    source: 'TopCV (Thu thập: 19/10/2026)',
    jobType: 'Thực tập sinh / Fresher',
    skillsRequired: { G1: true, G2: true, G3: true, G4: true, G5: true, G6: false },
    salaryRange: 'Hỗ trợ 4 - 6 Triệu / tháng',
    keyRequirements: [
      'Sinh viên năm 3, 4 hoặc mới tốt nghiệp ngành CNTT',
      'Nắm vững HTML5, CSS3, Responsive design (Flexbox/Grid)',
      'Thành thạo JavaScript ES6+ (Arrow functions, Promise, Destructuring)',
      'Có kiến thức về ReactJS cơ bản (Component, State, Props, Hooks)',
      'Biết sử dụng Git cơ bản để làm việc nhóm'
    ]
  },
  {
    id: 'TOPCV_02',
    title: 'Fresher Frontend Web Developer (Không yêu cầu kinh nghiệm)',
    company: 'VTI Group',
    location: 'Nam Từ Liêm, Hà Nội',
    source: 'TopCV (Thu thập: 19/10/2026)',
    jobType: 'Thực tập sinh / Fresher',
    skillsRequired: { G1: true, G2: true, G3: true, G4: true, G5: true, G6: true },
    salaryRange: '8 - 12 Triệu / tháng',
    keyRequirements: [
      'Nắm chắc kiến thức cốt lõi JavaScript và lập trình Web',
      'Kinh nghiệm làm bài tập lớn hoặc đồ án với ReactJS',
      'Biết gọi API RESTful qua axios/fetch, xử lý JSON',
      'Có thói quen commit Git phân nhánh sạch sẽ',
      'Kỹ năng đọc lỗi DevTools và gỡ lỗi logic'
    ]
  },
  {
    id: 'TOPCV_03',
    title: 'Frontend Intern (React / JavaScript)',
    company: 'Rikkeisoft',
    location: 'Hà Đông, Hà Nội',
    source: 'TopCV (Thu thập: 19/10/2026)',
    jobType: 'Thực tập sinh / Fresher',
    skillsRequired: { G1: true, G2: true, G3: true, G4: true, G5: false, G6: false },
    salaryRange: 'Hỗ trợ 3.5 - 5 Triệu / tháng',
    keyRequirements: [
      'Định hướng phát triển lâu dài với Frontend',
      'Hiểu rõ HTML ngữ nghĩa, CSS Flexbox/Grid',
      'Hiểu cơ chế bất đồng bộ Promise, async/await',
      'Có sản phẩm demo cá nhân trên GitHub là lợi thế'
    ]
  },
  {
    id: 'TOPCV_04',
    title: 'Thực tập sinh Lập trình Web Frontend',
    company: 'Teko Vietnam',
    location: 'Đống Đa, Hà Nội',
    source: 'TopCV (Thu thập: 19/10/2026)',
    jobType: 'Thực tập sinh / Fresher',
    skillsRequired: { G1: true, G2: true, G3: true, G4: true, G5: true, G6: true },
    salaryRange: '5 - 7 Triệu / tháng',
    keyRequirements: [
      'Tư duy lập trình tốt, nắm chắc JavaScript DOM',
      'Biết sử dụng React Hooks: useState, useEffect',
      'Xử lý tốt giao diện Responsive trên Mobile và Desktop',
      'Biết sử dụng Git và Chrome DevTools'
    ]
  },

  // --- 8 TIN YÊU CẦU KINH NGHIỆM (JUNIOR 1-2 NĂM) ---
  {
    id: 'TOPCV_05',
    title: 'Junior Frontend Developer (ReactJS)',
    company: 'CMC Global',
    location: 'Cầu Giấy, Hà Nội',
    source: 'TopCV (Thu thập: 19/10/2026)',
    jobType: 'Có kinh nghiệm (1-2 năm)',
    skillsRequired: { G1: true, G2: true, G3: true, G4: true, G5: true, G6: true },
    salaryRange: '12 - 18 Triệu / tháng',
    keyRequirements: [
      'Tối thiểu 1 năm kinh nghiệm phát triển với ReactJS',
      'Tối ưu hiệu năng Web Vitals, gỡ lỗi Memory Leak',
      'Thành thạo Git flow và viết Unit test đơn giản'
    ]
  },
  {
    id: 'TOPCV_06',
    title: 'Lập trình viên ReactJS (Frontend Engineer)',
    company: 'VNPT Technology',
    location: 'Thanh Xuân, Hà Nội',
    source: 'TopCV (Thu thập: 19/10/2026)',
    jobType: 'Có kinh nghiệm (1-2 năm)',
    skillsRequired: { G1: true, G2: true, G3: true, G4: true, G5: true, G6: true },
    salaryRange: '14 - 20 Triệu / tháng',
    keyRequirements: [
      'Thành thạo ES6+, React Hooks, Redux / Zustand',
      'Kỹ năng tích hợp REST API bảo mật với JWT',
      'Giải quyết xung đột merge conflict nâng cao'
    ]
  },
  {
    id: 'TOPCV_07',
    title: 'Frontend Developer (JavaScript / TypeScript / React)',
    company: 'Viettel Telecom',
    location: 'Ba Đình, Hà Nội',
    source: 'TopCV (Thu thập: 19/10/2026)',
    jobType: 'Có kinh nghiệm (1-2 năm)',
    skillsRequired: { G1: true, G2: true, G3: true, G4: true, G5: true, G6: true },
    salaryRange: '15 - 22 Triệu / tháng',
    keyRequirements: [
      'Thành thạo TypeScript trong React',
      'Hiểu sâu kiến trúc Single Page Application (SPA)',
      'Thành thạo viết Test với Jest / Vitest'
    ]
  },
  {
    id: 'TOPCV_08',
    title: 'Web Frontend Engineer (ReactJS / Next.js)',
    company: 'One Mount Group',
    location: 'Hai Bà Trưng, Hà Nội',
    source: 'TopCV (Thu thập: 19/10/2026)',
    jobType: 'Có kinh nghiệm (1-2 năm)',
    skillsRequired: { G1: true, G2: true, G3: true, G4: true, G5: true, G6: true },
    salaryRange: '16 - 25 Triệu / tháng',
    keyRequirements: [
      'Kinh nghiệm 1-2 năm với React và Modern CSS',
      'Tối ưu hóa SEO và Server-Side Rendering',
      'CI/CD quy trình GitHub Actions'
    ]
  },
  {
    id: 'TOPCV_09',
    title: 'Frontend Developer (UI/UX & React)',
    company: 'Sapo Technology',
    location: 'Cầu Giấy, Hà Nội',
    source: 'TopCV (Thu thập: 19/10/2026)',
    jobType: 'Có kinh nghiệm (1-2 năm)',
    skillsRequired: { G1: true, G2: true, G3: true, G4: true, G5: true, G6: false },
    salaryRange: '11 - 16 Triệu / tháng',
    keyRequirements: [
      'Pixel-perfect UI từ Figma',
      'CSS Animations, Flexbox, Grid nâng cao',
      'Tương tác tốt với API và quản lý state phức tạp'
    ]
  },
  {
    id: 'TOPCV_10',
    title: 'Lập trình viên Web Frontend (ReactJS)',
    company: 'Base.vn',
    location: 'Đống Đa, Hà Nội',
    source: 'TopCV (Thu thập: 19/10/2026)',
    jobType: 'Có kinh nghiệm (1-2 năm)',
    skillsRequired: { G1: true, G2: true, G3: true, G4: true, G5: true, G6: true },
    salaryRange: '13 - 18 Triệu / tháng',
    keyRequirements: [
      'Nền tảng JavaScript cực kỳ vững vàng',
      'Kỹ năng Clean Code và Refactor Component',
      'Sử dụng DevTools phân tích hiệu năng'
    ]
  },
  {
    id: 'TOPCV_11',
    title: 'Software Engineer - Frontend',
    company: 'Sun* Inc. (Sun Asterisk)',
    location: 'Tây Hồ, Hà Nội',
    source: 'TopCV (Thu thập: 19/10/2026)',
    jobType: 'Có kinh nghiệm (1-2 năm)',
    skillsRequired: { G1: true, G2: true, G3: true, G4: true, G5: true, G6: true },
    salaryRange: '15 - 20 Triệu / tháng',
    keyRequirements: [
      'Tư duy giải thuật và cấu trúc dữ liệu tốt',
      'Xử lý thành thạo Promise / RxJS / Async event',
      'Quy chuẩn code convention nghiêm ngặt'
    ]
  },
  {
    id: 'TOPCV_12',
    title: 'Frontend Developer (React)',
    company: 'MISA Joint Stock Company',
    location: 'Cầu Giấy, Hà Nội',
    source: 'TopCV (Thu thập: 19/10/2026)',
    jobType: 'Có kinh nghiệm (1-2 năm)',
    skillsRequired: { G1: true, G2: true, G3: false, G4: true, G5: true, G6: true }, // Tin tuyển Vue/JS
    salaryRange: '12 - 17 Triệu / tháng',
    keyRequirements: [
      'Thành thạo HTML/CSS responsive',
      'JavaScript ES6+, DOM manipulation',
      'Có khả năng debug độc lập'
    ]
  }
];
