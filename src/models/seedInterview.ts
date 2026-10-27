// ============================================================================
// MODEL LAYER: NGÂN HÀNG CÂU HỎI PHỎNG VẤN KỸ THUẬT (MOCK INTERVIEW CARDS)
// Chuẩn bị năng lực ứng tuyển thực tập sinh theo yêu cầu doanh nghiệp
// ============================================================================
import { InterviewQuestion } from './types';

export const SEED_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // --- G1: HTML/CSS ---
  {
    id: 'INT_G1_01',
    skillGroupId: 'G1',
    skillName: 'HTML/CSS & Responsive',
    question: 'Giải thích mô hình hộp (Box Model) trong CSS và ý nghĩa của box-sizing: border-box?',
    difficulty: 'Cơ bản (Fresher)',
    keyPointsToMention: ['Content, Padding, Border, Margin', 'Mặc định content-box làm tăng kích thước', 'border-box giữ kích thước cố định'],
    idealAnswer: 'Box Model gồm 4 thành phần: Content (nội dung), Padding (khoảng đệm), Border (viền) và Margin (khoảng cách ngoài). Mặc định box-sizing: content-box sẽ cộng thêm padding và border vào width của phần tử khiến giao diện dễ bị vỡ. Khi đặt box-sizing: border-box, width bao trọn cả padding và border, giúp việc căn chỉnh layout dễ dàng và chuẩn xác.',
    commonMistakes: ['Nghĩ rằng margin cũng được tính vào width khi dùng border-box', 'Không phân biệt được padding bên trong và margin bên ngoài']
  },
  {
    id: 'INT_G1_02',
    skillGroupId: 'G1',
    skillName: 'HTML/CSS & Responsive',
    question: 'Khi nào bạn nên dùng CSS Flexbox và khi nào nên dùng CSS Grid?',
    difficulty: 'Cơ bản (Fresher)',
    keyPointsToMention: ['Flexbox: 1 chiều (hàng hoặc cột)', 'Grid: 2 chiều (hàng và cột đồng thời)', 'Use cases cụ thể'],
    idealAnswer: 'Flexbox là hệ thống bố cục một chiều (1D), tối ưu cho việc căn chỉnh các phần tử theo một hướng (như menu điều hướng, thanh công cụ, căn giữa item). CSS Grid là hệ thống bố cục hai chiều (2D), tối ưu cho việc chia lưới toàn trang gồm nhiều hàng và cột đan xen (như bảng sản phẩm, layout báo chí phức tạp). Có thể kết hợp Grid cho layout tổng thể và Flexbox cho các thành phần con.',
    commonMistakes: ['Cố dùng Flexbox lồng nhau 4-5 cấp để làm lưới thay vì dùng Grid', 'Xem Flexbox và Grid loại trừ lẫn nhau']
  },

  // --- G2: JavaScript & DOM ---
  {
    id: 'INT_G2_01',
    skillGroupId: 'G2',
    skillName: 'JavaScript & DOM',
    question: 'Giải thích cơ chế hoạt động của Event Loop trong JavaScript?',
    difficulty: 'Nâng cao (Junior)',
    keyPointsToMention: ['Call Stack', 'Web APIs', 'Callback Queue (Microtask vs Macrotask)', 'Single-threaded non-blocking'],
    idealAnswer: 'JavaScript là ngôn ngữ đơn luồng (single-threaded). Khi gặp các tác vụ bất đồng bộ (như setTimeout, fetch), JS đẩy sang Web APIs để xử lý nền và tiếp tục chạy mã đồng bộ trong Call Stack. Khi Call Stack rỗng, Event Loop sẽ kiểm tra hàng đợi: ưu tiên lấy toàn bộ Microtask (Promise, queueMicrotask) ra chạy trước, sau đó mới lấy Macrotask (setTimeout, setInterval).',
    commonMistakes: ['Nghĩ rằng setTimeout(fn, 0) sẽ chạy ngay lập tức mà không cần chờ Call Stack rỗng', 'Không biết Promise có độ ưu tiên cao hơn setTimeout']
  },
  {
    id: 'INT_G2_02',
    skillGroupId: 'G2',
    skillName: 'JavaScript & DOM',
    question: 'Closure là gì? Cho một ví dụ thực tế về ứng dụng của Closure?',
    difficulty: 'Cơ bản (Fresher)',
    keyPointsToMention: ['Lexical Scope', 'Hàm con truy cập biến hàm cha', 'Data privacy / Memoization'],
    idealAnswer: 'Closure là khả năng một hàm ghi nhớ và truy cập vào các biến thuộc phạm vi từ vựng (lexical scope) của nó, ngay cả khi hàm cha đã thực thi xong và kết thúc. Ví dụ thực tế: tạo biến riêng tư (private variable) trong hàm đếm counter, hoặc hàm ghi nhớ kết quả tính toán (memoization), hoặc các custom hook trong React.',
    commonMistakes: ['Nhầm closure với callback thông thường', 'Không chú ý rò rỉ bộ nhớ (memory leak) nếu closure giữ tham chiếu tới các biến quá lớn không dùng nữa']
  },

  // --- G3: React cơ bản ---
  {
    id: 'INT_G3_01',
    skillGroupId: 'G3',
    skillName: 'React cơ bản',
    question: 'Tại sao không được phép thay đổi (mutate) State trực tiếp trong React mà phải dùng setState/setCount?',
    difficulty: 'Cơ bản (Fresher)',
    keyPointsToMention: ['Immutability', 'Reconciliation', 'So sánh tham chiếu Object.is', 'Re-render trigger'],
    idealAnswer: 'React dựa vào tính bất biến (Immutability) để phát hiện sự thay đổi trạng thái thông qua so sánh tham chiếu vùng nhớ (shallow comparison - Object.is). Nếu ta mutate trực tiếp (ví dụ: state.push()), tham chiếu của object/array không hề thay đổi, React sẽ coi như không có gì mới và bỏ qua việc kích hoạt render lại giao diện, gây lỗi đồng bộ.',
    commonMistakes: ['Viết arr.push() rồi gọi setArr(arr)', 'Không dùng cú pháp spread [...arr] hoặc hàm cập nhật functional setArr(prev => [...prev])']
  },
  {
    id: 'INT_G3_02',
    skillGroupId: 'G3',
    skillName: 'React cơ bản',
    question: 'Quy tắc Dependency Array trong useEffect là gì? Điều gì xảy ra nếu quên truyền dependency?',
    difficulty: 'Cơ bản (Fresher)',
    keyPointsToMention: ['[]: Chạy 1 lần mount', '[deps]: Chạy khi deps thay đổi', 'Không truyền: Chạy sau mọi lần render', 'Infinite loop'],
    idealAnswer: 'Dependency Array quy định khi nào Effect sẽ thực thi lại. Nếu không truyền mảng phụ thuộc, useEffect sẽ chạy lại sau mỗi lần component render, nếu bên trong có setState sẽ dẫn đến lỗi lặp vô hạn (Infinite Loop). Nếu truyền [], effect chỉ chạy 1 lần khi mount. Nếu truyền [a, b], effect chỉ chạy lại khi a hoặc b thay đổi giá trị.',
    commonMistakes: ['Bỏ sót các biến/hàm được dùng bên trong effect ra khỏi mảng dependency (stale closure)', 'Truyền object mới mỗi lần render làm effect chạy liên tục']
  },

  // --- G4: Kết nối API & Bất đồng bộ ---
  {
    id: 'INT_G4_01',
    skillGroupId: 'G4',
    skillName: 'Kết nối API & Bất đồng bộ',
    question: 'Tại sao Fetch API không nhảy vào khối catch khi máy chủ trả về mã lỗi 404 hoặc 500?',
    difficulty: 'Cơ bản (Fresher)',
    keyPointsToMention: ['Fetch chỉ reject khi lỗi mạng (network failure)', 'Mã HTTP 404/500 vẫn là response hợp lệ', 'response.ok'],
    idealAnswer: 'Fetch API được thiết kế để chỉ reject Promise khi có lỗi mạng thực sự (như mất internet, sai DNS hoặc CORS block). Khi máy chủ vẫn phản hồi (dù là mã 404 Not Found hay 500 Internal Server Error), Promise vẫn được giải quyết (resolved). Do đó lập trình viên phải chủ động kiểm tra thuộc tính response.ok (true khi status 200–299) và ném lỗi thủ công.',
    commonMistakes: ['Chỉ bọc fetch trong try/catch mà không kiểm tra response.ok, dẫn đến giao diện hiển thị dữ liệu rác']
  },

  // --- G5: Git/GitHub & DevTools ---
  {
    id: 'INT_G5_01',
    skillGroupId: 'G5',
    skillName: 'Git/GitHub & DevTools',
    question: 'Trình bày quy trình làm việc nhóm bằng Git Feature Branch chuẩn mà bạn áp dụng?',
    difficulty: 'Cơ bản (Fresher)',
    keyPointsToMention: ['git pull main', 'git checkout -b feature/...', 'Conventional commit', 'Push & Pull Request (PR)'],
    idealAnswer: 'Quy trình chuẩn: 1. Đứng tại nhánh main/develop cập nhật bản mới nhất (git pull). 2. Tạo nhánh tính năng mới (git checkout -b feature/login). 3. Lập trình và commit theo quy chuẩn Conventional Commits (feat, fix). 4. Đẩy nhánh lên GitHub (git push -u origin feature/login). 5. Tạo Pull Request (PR) để đồng đội review code trước khi gộp (merge) vào nhánh chính.',
    commonMistakes: ['Commit và push thẳng vào nhánh main khi làm việc nhóm', 'Dùng git push --force bừa bãi']
  },

  // --- G6: Debug & Kiểm thử ---
  {
    id: 'INT_G6_01',
    skillGroupId: 'G6',
    skillName: 'Debug & Kiểm thử',
    question: 'Làm thế nào để tìm nguyên nhân và khắc phục lỗi rò rỉ bộ nhớ (Memory Leak) trong ứng dụng Frontend?',
    difficulty: 'Nâng cao (Junior)',
    keyPointsToMention: ['Cleanup function trong useEffect', 'Event listener chưa gỡ', 'DevTools Memory Heap Snapshot'],
    idealAnswer: 'Nguyên nhân phổ biến: quên clear setInterval/setTimeout, chưa gỡ bỏ addEventListener khi component unmount, hoặc giữ tham chiếu biến toàn cục trong closure. Cách debug: Dùng Chrome DevTools tab Memory, chụp Heap Snapshot trước và sau khi thao tác chuyển trang để đối sánh các object còn sót lại (Detached DOM trees). Trong React, luôn viết hàm cleanup trong useEffect để hủy listener/interval.',
    commonMistakes: ['Chỉ dựa vào console.log thay vì dùng công cụ Profiler/Memory của trình duyệt']
  }
];
