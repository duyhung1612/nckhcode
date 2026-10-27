// ============================================================================
// MODEL LAYER: HỌC LIỆU VÀ BÀI TẬP BỔ SUNG CHO LỘ TRÌNH (ROADMAP RESOURCES)
// ============================================================================
import { LearningResource } from './types';

export const SKILL_RESOURCES: Record<string, {
  resources: LearningResource[];
  exercises: { title: string; description: string; requirements: string[] }[];
  baseHours: number;
}> = {
  G1: {
    baseHours: 4,
    resources: [
      {
        id: 'RES_G1_1',
        title: 'MDN Web Docs: HTML Semantic Elements & Accessibility',
        type: 'doc',
        durationMinutes: 45,
        url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html',
        summary: 'Hướng dẫn chuẩn hóa cấu trúc trang với thẻ <header>, <nav>, <main>, <section>, <article> và <aside>.'
      },
      {
        id: 'RES_G1_2',
        title: 'CSS Tricks: A Complete Guide to Flexbox & CSS Grid',
        type: 'interactive',
        durationMinutes: 60,
        url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
        summary: 'Học cách căn chỉnh trục chính/phụ, phân bổ không gian co giãn linh hoạt và dựng layout 12 cột.'
      },
      {
        id: 'RES_G1_3',
        title: 'Chuyên đề Responsive Web Design với Modern Media Queries',
        type: 'video',
        durationMinutes: 45,
        url: 'https://web.dev/learn/design/',
        summary: 'Kỹ thuật mobile-first, sử dụng breakpoints phổ biến (640px, 768px, 1024px) và đơn vị tương đối.'
      }
    ],
    exercises: [
      {
        title: 'Thực hành Refactor giao diện HTML Div Soup sang Semantic HTML',
        description: 'Chuyển đổi một trang tin tức mẫu đang dùng toàn thẻ div thành các thẻ ngữ nghĩa chuẩn SEO & Accessibility.',
        requirements: ['Dùng đúng <nav> cho menu', 'Dùng <article> cho từng bài viết', 'Form có <label> gắn với <input> qua for/id']
      },
      {
        title: 'Dựng Responsive Product Card Grid',
        description: 'Dựng lưới hiển thị sản phẩm tự động thích ứng: 1 cột trên Mobile, 2 cột trên Tablet, 4 cột trên Desktop.',
        requirements: ['Sử dụng CSS Grid (repeat(auto-fit, minmax(...)))', 'Không bị vỡ chữ khi co giãn màn hình']
      }
    ]
  },
  G2: {
    baseHours: 6,
    resources: [
      {
        id: 'RES_G2_1',
        title: 'JavaScript.info: Modern ES6+ Syntax & Features',
        type: 'doc',
        durationMinutes: 60,
        url: 'https://javascript.info/',
        summary: 'Nắm vững let/const, arrow functions, destructuring, rest/spread parameters và toán tử optional chaining (?.).'
      },
      {
        id: 'RES_G2_2',
        title: 'Deep Dive: Scope, Lexical Environment, Closures & This',
        type: 'video',
        durationMinutes: 75,
        url: 'https://javascript.info/closure',
        summary: 'Giải mã cơ chế Closure trong JavaScript, Execution Context và cách xác định ngữ cảnh this trong function vs arrow function.'
      },
      {
        id: 'RES_G2_3',
        title: 'DOM Manipulation & Event Delegation in Depth',
        type: 'interactive',
        durationMinutes: 45,
        url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events',
        summary: 'Tối ưu hiệu năng DOM với cơ chế Event Delegation (ủy quyền sự kiện), event bubbling và capturing.'
      }
    ],
    exercises: [
      {
        title: 'Bài tập 1: ES6 Array Methods & Data Transformation',
        description: 'Luyện tập biến đổi dữ liệu mảng đối tượng phức tạp bằng map, filter, reduce và destructuring.',
        requirements: ['Lọc danh sách sinh viên có điểm >= 7.0', 'Tính điểm trung bình toàn khóa bằng reduce', 'Viết hàm thuần khiết (pure function)']
      },
      {
        title: 'Bài tập 2: Ứng dụng To-Do List với DOM & Event Delegation',
        description: 'Xây dựng ứng dụng quản lý công việc cơ bản bằng Vanilla JS, bắt sự kiện click xóa/sửa trên thẻ cha.',
        requirements: ['Không gắn event listener riêng lẻ cho từng item', 'Lưu dữ liệu vào localStorage', 'Có animation nhẹ khi hoàn thành']
      },
      {
        title: 'Bài tập 3: Thử thách Closure & Memoization Function',
        description: 'Viết một hàm bọc (decorator) để cache kết quả của các hàm tính toán tốn thời gian dựa vào cơ chế Closure.',
        requirements: ['Kiểm tra tham số đầu vào trong cache object', 'Trả về kết quả ngay nếu đã tính trước đó']
      }
    ]
  },
  G3: {
    baseHours: 5,
    resources: [
      {
        id: 'RES_G3_1',
        title: 'React Official Docs: Quick Start & Thinking in React',
        type: 'doc',
        durationMinutes: 60,
        url: 'https://react.dev/learn',
        summary: 'Tư duy phân rã giao diện thành cây Component, nguyên tắc dữ liệu một chiều và nâng state lên component cha chung.'
      },
      {
        id: 'RES_G3_2',
        title: 'Mastering React Hooks: useState & useEffect Patterns',
        type: 'video',
        durationMinutes: 60,
        url: 'https://react.dev/reference/react/useEffect',
        summary: 'Hiểu vòng đời của Effect, dependency array, cleanup function và tránh bẫy infinite re-render loop.'
      },
      {
        id: 'RES_G3_3',
        title: 'Rendering Lists & Conditional Rendering Best Practices',
        type: 'interactive',
        durationMinutes: 45,
        url: 'https://react.dev/learn/rendering-lists',
        summary: 'Tại sao không nên dùng mảng index làm key? Cách conditional render an toàn tránh in ra số 0 trên màn hình.'
      }
    ],
    exercises: [
      {
        title: 'Xây dựng bộ lọc sản phẩm Real-time với React State',
        description: 'Tạo component ô tìm kiếm và danh mục, tự động lọc danh sách sản phẩm hiển thị trên màn hình.',
        requirements: ['Chỉ lưu danh sách gốc và từ khóa tìm kiếm trong state', 'Tính danh sách hiển thị bằng derived state (useMemo/filter)', 'Gán key duy nhất ổn định']
      },
      {
        title: 'Custom Hook useFetchData có xử lý Loading & Error',
        description: 'Viết hook tái sử dụng useFetchData(url) bọc useEffect và quản lý 3 trạng thái: data, loading, error.',
        requirements: ['Hủy request khi component unmount (AbortController)', 'Hiển thị Skeleton khi loading', 'Có nút bấm Thử lại (retry)']
      }
    ]
  },
  G4: {
    baseHours: 4,
    resources: [
      {
        id: 'RES_G4_1',
        title: 'JavaScript Promises & Async/Await: From Zero to Hero',
        type: 'video',
        durationMinutes: 50,
        url: 'https://javascript.info/async-await',
        summary: 'Nguyên lý hoạt động của Promise, microtask queue trong Event Loop và cú pháp async/await đồng bộ hóa mã bất đồng bộ.'
      },
      {
        id: 'RES_G4_2',
        title: 'Fetch API & Robust Error Handling Strategies',
        type: 'doc',
        durationMinutes: 45,
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
        summary: 'Hiểu rõ tại sao fetch không từ chối (reject) khi mã trạng thái HTTP là 404/500 và cách dùng response.ok.'
      },
      {
        id: 'RES_G4_3',
        title: 'RESTful API Standards & HTTP Status Codes Reference',
        type: 'doc',
        durationMinutes: 30,
        url: 'https://restfulapi.net/',
        summary: 'Quy ước đặt tên endpoint REST, các phương thức GET, POST, PUT, DELETE và ý nghĩa các nhóm mã trạng thái (2xx, 4xx, 5xx).'
      }
    ],
    exercises: [
      {
        title: 'Kết nối Mock API và xử lý các kịch bản lỗi mạng',
        description: 'Viết module gọi API danh sách tin tức từ Mockoon hoặc Fake API, mô phỏng lỗi 500 và timeout.',
        requirements: ['Kiểm tra if (!response.ok) throw new Error(...)', 'Bắt lỗi trong try/catch và hiển thị thông báo thân thiện', 'Mô phỏng delay mạng']
      }
    ]
  },
  G5: {
    baseHours: 4,
    resources: [
      {
        id: 'RES_G5_1',
        title: 'Git Immersion & Branching Workflow for Frontend Teams',
        type: 'interactive',
        durationMinutes: 45,
        url: 'https://learngitbranching.js.org/',
        summary: 'Mô phỏng quy trình git checkout -b feature, commit, rebase/merge và resolve conflicts.'
      },
      {
        id: 'RES_G5_2',
        title: 'Conventional Commits Specification & GitHub Flow',
        type: 'doc',
        durationMinutes: 30,
        url: 'https://www.conventionalcommits.org/',
        summary: 'Quy tắc đặt thông điệp commit chuẩn quốc tế (feat:, fix:, docs:, refactor:, chore:) giúp kho mã nguồn chuyên nghiệp.'
      },
      {
        id: 'RES_G5_3',
        title: 'Chrome DevTools: Network, Sources & Elements Masterclass',
        type: 'video',
        durationMinutes: 45,
        url: 'https://developer.chrome.com/docs/devtools/',
        summary: 'Kiểm tra gói tin Network (Payload, Headers, Timing), giả lập mạng chậm 3G và kiểm tra DOM Layout.'
      }
    ],
    exercises: [
      {
        title: 'Thực hành Tạo nhánh, Gặp xung đột Merge Conflict và Giải quyết',
        description: 'Tạo hai nhánh feature-header và feature-footer sửa cùng một dòng trong file README hoặc App.tsx, thực hiện merge và xử lý conflict.',
        requirements: ['Tạo conflict có chủ đích', 'Dùng VSCode hoặc terminal giải quyết conflict', 'Commit bản merge với thông điệp chuẩn']
      }
    ]
  },
  G6: {
    baseHours: 4,
    resources: [
      {
        id: 'RES_G6_1',
        title: 'Debugging JavaScript Applications with Chrome DevTools',
        type: 'video',
        durationMinutes: 45,
        url: 'https://developer.chrome.com/docs/devtools/javascript/',
        summary: 'Thay thế console.log bằng Breakpoints, Step Over, Step Into, Watch Expressions và Call Stack.'
      },
      {
        id: 'RES_G6_2',
        title: 'Common JavaScript Frontend Errors & How to Fix Them',
        type: 'article',
        durationMinutes: 40,
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors',
        summary: 'Phân tích các lỗi kinh điển: Cannot read properties of undefined, Uncaught TypeError, Maximum call stack size exceeded.'
      },
      {
        id: 'RES_G6_3',
        title: 'Introduction to Unit Testing with Vitest / Jest',
        type: 'doc',
        durationMinutes: 45,
        url: 'https://vitest.dev/guide/',
        summary: 'Cấu trúc bài test theo mô hình AAA (Arrange - Act - Assert), viết test case cho các hàm tiện ích (utils) tính toán.'
      }
    ],
    exercises: [
      {
        title: 'Thực hành Debug mã nguồn lỗi (Bug Hunt Challenge)',
        description: 'Nhận một đoạn code có sẵn 3 lỗi logic tiềm ẩn: sai thứ tự bất đồng bộ, closure giữ biến cũ và mutating state trực tiếp.',
        requirements: ['Dùng Breakpoint xác định chính xác dòng gây lỗi', 'Ghi nhật ký nguyên nhân gốc rễ', 'Sửa lại mã nguồn hoàn chỉnh']
      }
    ]
  }
};
