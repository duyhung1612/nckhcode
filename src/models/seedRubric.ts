// ============================================================================
// MODEL LAYER: BÀI THỰC HÀNH MẪU & RUBRIC CHẤM ĐIỂM (BẢNG 5 TRONG ĐỀ CƯƠNG)
// ============================================================================
import { RubricCriterion } from './types';

export const PRACTICAL_EXERCISE_SPEC = {
  title: 'Xây dựng ứng dụng Mini Product Catalog với Tìm kiếm, Lọc danh mục và API',
  objective: 'Đo lường năng lực tích hợp toàn diện của sinh viên: dựng giao diện Responsive, thao tác React/JS, gọi API bất đồng bộ, xử lý lỗi và quản lý phiên bản Git.',
  durationDays: '7 - 10 ngày (hoàn thành trước hoặc song song với học bổ sung)',
  requirements: [
    'Xây dựng ứng dụng danh sách sản phẩm lấy dữ liệu từ Mock API (hoặc FakeStore API / DummyJSON).',
    'Có ô tìm kiếm sản phẩm theo tên theo thời gian thực (real-time filter).',
    'Có bộ lọc theo danh mục sản phẩm (Category pills / dropdown).',
    'Hiển thị trạng thái đang tải (Loading spinner / Skeleton) và thông báo lỗi thân thiện khi API thất bại.',
    'Bố cục đáp ứng (Responsive) mượt mà trên cả điện thoại (Mobile 375px) và máy tính (Desktop >= 1024px).',
    'Mã nguồn được tổ chức theo cấu trúc rõ ràng, component phân tách hợp lý.',
    'Kho mã nguồn GitHub công khai với tối thiểu 5 commit có thông điệp rõ nghĩa (Conventional Commits).'
  ],
  deliverables: [
    'Đường dẫn kho mã nguồn công khai (GitHub Repository URL)',
    'Đường dẫn bản chạy thực tế (Live Demo: Vercel / Netlify / GitHub Pages)',
    'Bản chụp nhật ký commit Git (Git log history) và ảnh chụp giao diện Mobile/Desktop'
  ]
};

export const SEED_RUBRIC_CRITERIA: RubricCriterion[] = [
  {
    id: 'CRIT_1',
    name: 'Tính đúng chức năng',
    description: 'Đánh giá mức độ hoàn thiện các tính năng cốt lõi: tìm kiếm, lọc, gọi API, xử lý trạng thái giao diện.',
    levels: [
      {
        score: 0,
        title: '0 – Chưa đạt',
        description: 'Ứng dụng không chạy được, phát sinh lỗi màn hình trắng (crash) hoặc thiếu hầu hết các yêu cầu chính.'
      },
      {
        score: 1,
        title: '1 – Cơ bản',
        description: 'Chạy được phần chức năng chính (hiển thị danh sách, tìm kiếm cơ bản), nhưng còn lỗi nhỏ khi lọc hoặc dữ liệu trống.'
      },
      {
        score: 2,
        title: '2 – Khá',
        description: 'Đủ toàn bộ chức năng theo yêu cầu, xử lý trơn tru các trường hợp người dùng thao tác thông thường.'
      },
      {
        score: 3,
        title: '3 – Tốt',
        description: 'Đủ chức năng xuất sắc, xử lý triệt để cả các trường hợp biên (từ khóa không tồn tại, debounce tìm kiếm, mạng ngắt kết nối).'
      }
    ]
  },
  {
    id: 'CRIT_2',
    name: 'Cấu trúc mã và Component',
    description: 'Đánh giá chất lượng mã nguồn: tính mô-đun, tách hàm/component, quản lý state và tính dễ bảo trì.',
    levels: [
      {
        score: 0,
        title: '0 – Chưa đạt',
        description: 'Mã nguồn rối rắm, viết toàn bộ logic trong một tệp duy nhất, lồng ghép quá nhiều cấp, không tuân thủ quy tắc đặt tên.'
      },
      {
        score: 1,
        title: '1 – Cơ bản',
        description: 'Có phân tách file/component nhưng chưa hợp lý, prop drilling nhiều cấp hoặc đặt tên biến/hàm khó hiểu.'
      },
      {
        score: 2,
        title: '2 – Khá',
        description: 'Cấu trúc thư mục ngăn nắp, component được tách nhỏ hợp lý theo chức năng, đặt tên biến/hàm tường minh.'
      },
      {
        score: 3,
        title: '3 – Tốt',
        description: 'Tách biệt rõ ràng Presentational Component và Container/Hook, mã nguồn dễ đọc, có chú thích (JSDoc/TypeScript) khi cần thiết.'
      }
    ]
  },
  {
    id: 'CRIT_3',
    name: 'Xử lý lỗi, Git và Kiểm thử',
    description: 'Đánh giá thói quen kỹ thuật: kiểm soát lỗi bất đồng bộ, kỷ luật commit Git và tư duy kiểm thử.',
    levels: [
      {
        score: 0,
        title: '0 – Chưa đạt',
        description: 'Không có try/catch hoặc xử lý trạng thái lỗi API, commit duy nhất 1 lần (init commit) với thông điệp vô nghĩa.'
      },
      {
        score: 1,
        title: '1 – Cơ bản',
        description: 'Có thông báo lỗi cơ bản nhưng chưa hiển thị UI, các commit Git còn chung chung (vd: "update", "fix bug").'
      },
      {
        score: 2,
        title: '2 – Khá',
        description: 'Xử lý lỗi API và trạng thái loading tốt, lịch sử Git có các commit phân tách theo từng tính năng rõ ràng.'
      },
      {
        score: 3,
        title: '3 – Tốt',
        description: 'Bắt lỗi API đầy đủ với nút Retry, commit tuân thủ quy chuẩn, có kịch bản test case hoặc Unit Test đơn giản chạy qua.'
      }
    ]
  }
];
