// ============================================================================
// MODEL LAYER: 6 NHÓM KỸ NĂNG & 18 KỸ NĂNG CON (BẢNG 3 TRONG ĐỀ CƯƠNG)
// ============================================================================
import { SkillGroup } from './types';

export const SEED_SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'G1',
    code: 'HTML_CSS',
    name: 'HTML/CSS & Responsive UI',
    description: 'Nền tảng giao diện web, thẻ ngữ nghĩa, bố cục Flexbox/Grid và thiết kế tương thích đa thiết bị.',
    initialWeight: 0.15,
    prerequisites: [], // Tầng 1: Không có tiên quyết
    subSkills: [
      {
        id: 'G1.1',
        name: 'HTML ngữ nghĩa và form',
        observableIndicator: 'Dùng đúng thẻ ngữ nghĩa (header, nav, main, article) và thuộc tính form cơ bản thay cho thẻ div chung chung.',
        primarySource: 'roadmap.sh; tin tuyển dụng; chương trình học phần Web'
      },
      {
        id: 'G1.2',
        name: 'Layout Flexbox/Grid',
        observableIndicator: 'Dựng được bố cục nhiều cột, căn chỉnh và phân bổ không gian bằng Flexbox và Grid.',
        primarySource: 'roadmap.sh; tin tuyển dụng'
      },
      {
        id: 'G1.3',
        name: 'Responsive và media query',
        observableIndicator: 'Trang hiển thị đúng trên màn hình điện thoại và máy tính nhờ media query và đơn vị linh hoạt (rem, %, vh/vw).',
        primarySource: 'roadmap.sh; tin tuyển dụng'
      }
    ]
  },
  {
    id: 'G2',
    code: 'JS_DOM',
    name: 'JavaScript & DOM',
    description: 'Ngôn ngữ lập trình cốt lõi, cú pháp ES6+, quản lý phạm vi biến, closure, this context và tương tác DOM sự kiện.',
    initialWeight: 0.25,
    prerequisites: [], // Tầng 1: Kiến thức lập trình nền tảng
    subSkills: [
      {
        id: 'G2.1',
        name: 'Ngôn ngữ JavaScript hiện đại (ES6+)',
        observableIndicator: 'Dùng thành thạo let/const, arrow function, template literal, destructuring, spread/rest operator.',
        primarySource: 'roadmap.sh; tin tuyển dụng'
      },
      {
        id: 'G2.2',
        name: 'Scope, closure và this',
        observableIndicator: 'Dự đoán đúng kết quả đoạn mã liên quan tới phạm vi biến, closure và ngữ cảnh this trong các hàm.',
        primarySource: 'roadmap.sh; chương trình học phần Web'
      },
      {
        id: 'G2.3',
        name: 'DOM và xử lý sự kiện',
        observableIndicator: 'Thao tác được phần tử trang, xử lý bubble/capture sự kiện để tạo tương tác người dùng mượt mà.',
        primarySource: 'roadmap.sh; tin tuyển dụng'
      }
    ]
  },
  {
    id: 'G3',
    code: 'REACT_BASIC',
    name: 'React cơ bản',
    description: 'Xây dựng giao diện hướng thành phần, quản lý luồng dữ liệu một chiều qua props, state và React hooks.',
    initialWeight: 0.20,
    prerequisites: ['G2'], // Tầng 2: Tiên quyết bắt buộc phải có JavaScript vững
    subSkills: [
      {
        id: 'G3.1',
        name: 'Component, props và state',
        observableIndicator: 'Tách được giao diện thành các component độc lập, truyền dữ liệu qua props, quản lý state đơn giản.',
        primarySource: 'roadmap.sh; tin tuyển dụng'
      },
      {
        id: 'G3.2',
        name: 'Hooks (useState, useEffect)',
        observableIndicator: 'Dùng useState cho trạng thái cục bộ và useEffect đúng mảng phụ thuộc (dependency array) khi lấy dữ liệu.',
        primarySource: 'roadmap.sh; tin tuyển dụng'
      },
      {
        id: 'G3.3',
        name: 'Keys và render có điều kiện',
        observableIndicator: 'Render danh sách với key ổn định (id) và hiển thị phần tử có điều kiện đúng logic (ternary, short-circuit).',
        primarySource: 'roadmap.sh; chương trình học phần Web'
      }
    ]
  },
  {
    id: 'G4',
    code: 'API_ASYNC',
    name: 'Kết nối API & bất đồng bộ',
    description: 'Lập trình bất đồng bộ với Promise, async/await, gọi API RESTful qua fetch/axios, kiểm soát loading và bắt lỗi.',
    initialWeight: 0.15,
    prerequisites: ['G2'], // Tầng 2: Tiên quyết bắt buộc phải có JavaScript ES6+
    subSkills: [
      {
        id: 'G4.1',
        name: 'Promise và async/await',
        observableIndicator: 'Viết và đọc được mã bất đồng bộ bằng Promise và async/await, xử lý đúng thứ tự thực thi trong Event Loop.',
        primarySource: 'roadmap.sh; tin tuyển dụng'
      },
      {
        id: 'G4.2',
        name: 'fetch và xử lý lỗi',
        observableIndicator: 'Gọi API bằng fetch/axios, kiểm tra response.ok, xử lý trạng thái đang tải (loading) và hiển thị thông báo lỗi.',
        primarySource: 'tin tuyển dụng; roadmap.sh'
      },
      {
        id: 'G4.3',
        name: 'REST và JSON cơ bản',
        observableIndicator: 'Hiểu các phương thức HTTP (GET, POST, PUT, DELETE), mã trạng thái (200, 400, 404, 500) và cấu trúc JSON.',
        primarySource: 'tin tuyển dụng; roadmap.sh'
      }
    ]
  },
  {
    id: 'G5',
    code: 'GIT_DEVTOOLS',
    name: 'Git/GitHub & DevTools',
    description: 'Hệ thống quản lý phiên bản mã nguồn, quy trình làm việc nhóm phân nhánh Git và sử dụng công cụ nhà phát triển.',
    initialWeight: 0.10,
    prerequisites: [], // Tầng 1 (Độc lập): Có thể học bất cứ lúc nào
    subSkills: [
      {
        id: 'G5.1',
        name: 'add, commit, status',
        observableIndicator: 'Thực hiện được quy trình add – commit và kiểm tra trạng thái kho mã nguồn với thông điệp rõ nghĩa.',
        primarySource: 'roadmap.sh; tin tuyển dụng'
      },
      {
        id: 'G5.2',
        name: 'branch và merge',
        observableIndicator: 'Tạo nhánh, chuyển nhánh và gộp nhánh an toàn khi làm việc nhóm trên tính năng mới.',
        primarySource: 'roadmap.sh; tin tuyển dụng'
      },
      {
        id: 'G5.3',
        name: 'remote, pull/push, xử lý conflict cơ bản',
        observableIndicator: 'Đồng bộ mã nguồn với GitHub và xử lý được xung đột merge conflict đơn giản trên mã nguồn.',
        primarySource: 'tin tuyển dụng; kinh nghiệm làm việc nhóm'
      }
    ]
  },
  {
    id: 'G6',
    code: 'DEBUG_TEST',
    name: 'Debug & kiểm thử',
    description: 'Kỹ năng khoanh vùng lỗi, đọc thông báo console, đặt breakpoint truy vết luồng thực thi và hiểu cơ bản về Unit Test.',
    initialWeight: 0.15,
    prerequisites: [], // Tầng 1 (Độc lập / bổ trợ)
    subSkills: [
      {
        id: 'G6.1',
        name: 'Đọc lỗi console và dùng DevTools',
        observableIndicator: 'Đọc được thông báo lỗi trên Console (TypeError, ReferenceError) và dùng DevTools Elements/Sources để khoanh vùng.',
        primarySource: 'tin tuyển dụng; chương trình học phần Web'
      },
      {
        id: 'G6.2',
        name: 'Truy vết logic',
        observableIndicator: 'Lần theo luồng chạy của chương trình (tracing, console.log/breakpoint) để tìm nguyên nhân sai kết quả.',
        primarySource: 'chương trình học phần Web; roadmap.sh'
      },
      {
        id: 'G6.3',
        name: 'Khái niệm unit test',
        observableIndicator: 'Hiểu mục đích của kiểm thử đơn vị, cấu trúc một ca kiểm thử đơn giản (Arrange, Act, Assert).',
        primarySource: 'tin tuyển dụng; roadmap.sh'
      }
    ]
  }
];
