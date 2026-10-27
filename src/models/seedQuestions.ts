// ============================================================================
// MODEL LAYER: NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM ĐỀ A & ĐỀ B (MA TRẬN BẢNG 4)
// Gồm 6 nhóm kỹ năng, 10 câu/nhóm (3 Dễ / 4 Trung bình / 3 Khó)
// ============================================================================
import { Question } from './types';

export const SEED_QUESTIONS: Question[] = [
  // ==========================================
  // NHÓM 1: HTML/CSS & Responsive UI (G1)
  // ==========================================
  // ĐỀ A
  {
    id: 'QA_G1_01',
    examSet: 'A',
    skillGroupId: 'G1',
    subSkillId: 'G1.1',
    difficulty: 'Dễ',
    bloomLevel: 'Nhớ',
    content: 'Thẻ HTML5 ngữ nghĩa nào dưới đây phù hợp nhất để chứa các liên kết điều hướng chính của trang web?',
    options: [
      { key: 'A', text: '<div class="menu">' },
      { key: 'B', text: '<nav>' },
      { key: 'C', text: '<section>' },
      { key: 'D', text: '<aside>' }
    ],
    correctAnswer: 'B',
    explanation: 'Thẻ <nav> trong HTML5 được thiết kế chuyên biệt đại diện cho vùng chứa các liên kết điều hướng chính.'
  },
  {
    id: 'QA_G1_02',
    examSet: 'A',
    skillGroupId: 'G1',
    subSkillId: 'G1.1',
    difficulty: 'Dễ',
    bloomLevel: 'Nhớ',
    content: 'Thuộc tính nào của thẻ <input> dùng để liên kết với thẻ <label> nhằm tối ưu khả năng tiếp cận (Accessibility)?',
    options: [
      { key: 'A', text: 'name' },
      { key: 'B', text: 'id' },
      { key: 'C', text: 'type' },
      { key: 'D', text: 'value' }
    ],
    correctAnswer: 'B',
    explanation: 'Thẻ <label for="xyz"> liên kết trực tiếp với thẻ <input id="xyz"> qua thuộc tính id.'
  },
  {
    id: 'QA_G1_03',
    examSet: 'A',
    skillGroupId: 'G1',
    subSkillId: 'G1.2',
    difficulty: 'Dễ',
    bloomLevel: 'Hiểu',
    content: 'Trong Flexbox, thuộc tính nào trên phần tử cha dùng để căn chỉnh các item theo trục chính (main axis)?',
    options: [
      { key: 'A', text: 'align-items' },
      { key: 'B', text: 'justify-content' },
      { key: 'C', text: 'align-content' },
      { key: 'D', text: 'flex-direction' }
    ],
    correctAnswer: 'B',
    explanation: 'justify-content chịu trách nhiệm căn chỉnh các flex items dọc theo trục chính (main axis).'
  },
  {
    id: 'QA_G1_04',
    examSet: 'A',
    skillGroupId: 'G1',
    subSkillId: 'G1.2',
    difficulty: 'Trung bình',
    bloomLevel: 'Hiểu',
    content: 'Giá trị nào của display cho phép thiết lập bố cục lưới hai chiều đồng thời theo cả hàng và cột?',
    options: [
      { key: 'A', text: 'display: flex' },
      { key: 'B', text: 'display: grid' },
      { key: 'C', text: 'display: inline-block' },
      { key: 'D', text: 'display: table-cell' }
    ],
    correctAnswer: 'B',
    explanation: 'CSS Grid là hệ thống bố cục 2 chiều (hàng và cột), trong khi Flexbox chủ yếu là 1 chiều.'
  },
  {
    id: 'QA_G1_05',
    examSet: 'A',
    skillGroupId: 'G1',
    subSkillId: 'G1.2',
    difficulty: 'Trung bình',
    bloomLevel: 'Vận dụng',
    content: 'Để căn một phần tử con ra chính giữa màn hình cả chiều ngang lẫn dọc bằng Flexbox, đoạn CSS nào trên phần tử cha là chính xác?',
    codeSnippet: '.parent {\n  display: flex;\n  /* Cần thêm 2 thuộc tính nào? */\n}',
    options: [
      { key: 'A', text: 'justify-content: center; align-items: center;' },
      { key: 'B', text: 'text-align: center; vertical-align: middle;' },
      { key: 'C', text: 'margin: 0 auto; align-content: center;' },
      { key: 'D', text: 'place-items: flex-center;' }
    ],
    correctAnswer: 'A',
    explanation: 'justify-content: center (căn giữa trục ngang) và align-items: center (căn giữa trục dọc).'
  },
  {
    id: 'QA_G1_06',
    examSet: 'A',
    skillGroupId: 'G1',
    subSkillId: 'G1.3',
    difficulty: 'Trung bình',
    bloomLevel: 'Hiểu',
    content: 'Đơn vị rem trong CSS được tính toán dựa trên giá trị nào?',
    options: [
      { key: 'A', text: 'font-size của phần tử cha trực tiếp' },
      { key: 'B', text: 'font-size của phần tử gốc <html>' },
      { key: 'C', text: 'Độ rộng của khung nhìn (viewport width)' },
      { key: 'D', text: 'Chiều cao của phần tử hiện tại' }
    ],
    correctAnswer: 'B',
    explanation: 'rem (root em) luôn tham chiếu tới kích thước phông chữ (font-size) của phần tử gốc (thẻ html).'
  },
  {
    id: 'QA_G1_07',
    examSet: 'A',
    skillGroupId: 'G1',
    subSkillId: 'G1.3',
    difficulty: 'Trung bình',
    bloomLevel: 'Vận dụng',
    content: 'Để áp dụng kiểu dáng cho các thiết bị có chiều rộng màn hình tối đa 768px (Mobile & Tablet dọc), cú pháp media query nào đúng?',
    options: [
      { key: 'A', text: '@media (min-width: 768px) { ... }' },
      { key: 'B', text: '@media (max-width: 768px) { ... }' },
      { key: 'C', text: '@media screen and (device-width: 768px) { ... }' },
      { key: 'D', text: '@media only (screen-size <= 768px) { ... }' }
    ],
    correctAnswer: 'B',
    explanation: '@media (max-width: 768px) áp dụng quy tắc từ 0px đến 768px.'
  },
  {
    id: 'QA_G1_08',
    examSet: 'A',
    skillGroupId: 'G1',
    subSkillId: 'G1.3',
    difficulty: 'Khó',
    bloomLevel: 'Vận dụng',
    content: 'Thẻ meta viewport nào sau đây là chuẩn mực bắt buộc để trang web hiển thị responsive đúng tỷ lệ trên thiết bị di động?',
    options: [
      { key: 'A', text: '<meta name="viewport" content="width=1024, initial-scale=1.0">' },
      { key: 'B', text: '<meta name="viewport" content="width=device-width, initial-scale=1.0">' },
      { key: 'C', text: '<meta name="viewport" content="user-scalable=no">' },
      { key: 'D', text: '<meta name="viewport" content="height=device-height">' }
    ],
    correctAnswer: 'B',
    explanation: 'width=device-width đặt độ rộng trang theo kích thước màn hình thiết bị và initial-scale=1.0 đặt mức thu phóng ban đầu.'
  },
  {
    id: 'QA_G1_09',
    examSet: 'A',
    skillGroupId: 'G1',
    subSkillId: 'G1.2',
    difficulty: 'Khó',
    bloomLevel: 'Phân tích',
    content: 'Đoạn mã CSS Grid: grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) có hành vi như thế nào khi co giãn màn hình?',
    options: [
      { key: 'A', text: 'Luôn cố định 4 cột trên mọi kích thước màn hình' },
      { key: 'B', text: 'Tự động tính số cột vừa với khung chứa, mỗi cột tối thiểu 250px và co giãn đều' },
      { key: 'C', text: 'Tạo vô hạn cột và gây thanh cuộn ngang khi màn hình < 250px' },
      { key: 'D', text: 'Chỉ hoạt động khi có thẻ media query hỗ trợ' }
    ],
    correctAnswer: 'B',
    explanation: 'auto-fit kết hợp minmax tạo ra lưới tự động tính số cột, không cần media query mà vẫn responsive.'
  },
  {
    id: 'QA_G1_10',
    examSet: 'A',
    skillGroupId: 'G1',
    subSkillId: 'G1.1',
    difficulty: 'Khó',
    bloomLevel: 'Phân tích',
    content: 'Khi xây dựng một bài viết trên blog có phần tiêu đề, tác giả, ngày đăng và các bình luận độc lập, cấu trúc HTML nào ngữ nghĩa nhất?',
    options: [
      { key: 'A', text: '<div class="post"> có các thẻ <span>' },
      { key: 'B', text: '<article> chứa <header>, các đoạn <p> nội dung và các thẻ <article> con cho bình luận' },
      { key: 'C', text: '<section> chứa thẻ <aside> cho toàn bộ nội dung bài' },
      { key: 'D', text: '<main> lồng bên trong thẻ <footer>' }
    ],
    correctAnswer: 'B',
    explanation: '<article> dùng cho nội dung độc lập tự trọn vẹn, các bình luận cũng là các <article> con lồng bên trong.'
  },

  // ==========================================
  // NHÓM 2: JavaScript & DOM (G2)
  // ==========================================
  {
    id: 'QA_G2_01',
    examSet: 'A',
    skillGroupId: 'G2',
    subSkillId: 'G2.1',
    difficulty: 'Dễ',
    bloomLevel: 'Nhớ',
    content: 'Từ khóa nào trong JavaScript ES6 dùng để khai báo hằng số không thể gán lại giá trị?',
    options: [
      { key: 'A', text: 'var' },
      { key: 'B', text: 'let' },
      { key: 'C', text: 'const' },
      { key: 'D', text: 'static' }
    ],
    correctAnswer: 'C',
    explanation: 'const được dùng để khai báo một biến có phạm vi khối (block-scoped) và không thể gán lại bằng toán tử gán.'
  },
  {
    id: 'QA_G2_02',
    examSet: 'A',
    skillGroupId: 'G2',
    subSkillId: 'G2.1',
    difficulty: 'Dễ',
    bloomLevel: 'Hiểu',
    content: 'Kết quả in ra console của đoạn mã sau là gì?\nconst user = { name: "An", age: 20 };\nconst { name, age } = user;\nconsole.log(name, age);',
    options: [
      { key: 'A', text: 'undefined undefined' },
      { key: 'B', text: 'An 20' },
      { key: 'C', text: '{ name: "An", age: 20 }' },
      { key: 'D', text: 'Lỗi cú pháp SyntaxError' }
    ],
    correctAnswer: 'B',
    explanation: 'Đây là cú pháp Destructuring Assignment của ES6 giúp trích xuất các thuộc tính từ object vào các biến riêng biệt.'
  },
  {
    id: 'QA_G2_03',
    examSet: 'A',
    skillGroupId: 'G2',
    subSkillId: 'G2.3',
    difficulty: 'Dễ',
    bloomLevel: 'Nhớ',
    content: 'Phương thức chuẩn nào của Document dùng để gắn một hàm lắng nghe sự kiện (event listener) vào phần tử HTML?',
    options: [
      { key: 'A', text: 'element.attachEvent()' },
      { key: 'B', text: 'element.addEventListener()' },
      { key: 'C', text: 'element.listen()' },
      { key: 'D', text: 'element.setEventHandler()' }
    ],
    correctAnswer: 'B',
    explanation: 'addEventListener() là phương thức chuẩn của W3C DOM để đăng ký xử lý sự kiện.'
  },
  {
    id: 'QA_G2_04',
    examSet: 'A',
    skillGroupId: 'G2',
    subSkillId: 'G2.1',
    difficulty: 'Trung bình',
    bloomLevel: 'Hiểu',
    content: 'Điểm khác biệt quan trọng nhất giữa Arrow Function và Regular Function trong JavaScript là gì?',
    options: [
      { key: 'A', text: 'Arrow function chạy chậm hơn function thường' },
      { key: 'B', text: 'Arrow function không có ngữ cảnh this riêng mà kế thừa từ phạm vi bao quanh (lexical this)' },
      { key: 'C', text: 'Arrow function không thể nhận tham số đầu vào' },
      { key: 'D', text: 'Arrow function có thể dùng làm hàm khởi tạo constructor với từ khóa new' }
    ],
    correctAnswer: 'B',
    explanation: 'Arrow functions không định nghĩa ngữ cảnh this của riêng mình, this được bind theo ngữ cảnh bao bọc (lexical scoping).'
  },
  {
    id: 'QA_G2_05',
    examSet: 'A',
    skillGroupId: 'G2',
    subSkillId: 'G2.2',
    difficulty: 'Trung bình',
    bloomLevel: 'Hiểu',
    content: 'Đoạn mã sau in ra giá trị gì?\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}',
    options: [
      { key: 'A', text: '0 1 2' },
      { key: 'B', text: '3 3 3' },
      { key: 'C', text: 'undefined undefined undefined' },
      { key: 'D', text: 'Lỗi ReferenceError' }
    ],
    correctAnswer: 'B',
    explanation: 'Biến var có phạm vi hàm (function scope). Khi setTimeout thực thi sau 100ms, vòng lặp đã kết thúc và i có giá trị là 3.'
  },
  {
    id: 'QA_G2_06',
    examSet: 'A',
    skillGroupId: 'G2',
    subSkillId: 'G2.2',
    difficulty: 'Trung bình',
    bloomLevel: 'Vận dụng',
    content: 'Khái niệm Closure trong JavaScript được định nghĩa chính xác là gì?',
    options: [
      { key: 'A', text: 'Một hàm tự động đóng trình duyệt sau khi chạy xong' },
      { key: 'B', text: 'Khả năng một hàm ghi nhớ và truy cập vào các biến thuộc phạm vi từ vựng (lexical scope) của nó ngay cả khi hàm đó được thực thi bên ngoài phạm vi đó' },
      { key: 'C', text: 'Cơ chế giải phóng bộ nhớ của trình thu gom rác (Garbage Collector)' },
      { key: 'D', text: 'Một phương thức dùng để đóng kết nối WebSocket' }
    ],
    correctAnswer: 'B',
    explanation: 'Closure là sự kết hợp giữa một hàm và môi trường từ vựng nơi hàm đó được khai báo.'
  },
  {
    id: 'QA_G2_07',
    examSet: 'A',
    skillGroupId: 'G2',
    subSkillId: 'G2.3',
    difficulty: 'Trung bình',
    bloomLevel: 'Vận dụng',
    content: 'Khi người dùng click vào một phần tử con bên trong nhiều thẻ cha, sự kiện lan truyền từ thẻ con ngược lên các thẻ cha được gọi là gì?',
    options: [
      { key: 'A', text: 'Event Capturing' },
      { key: 'B', text: 'Event Bubbling (Sủi bọt sự kiện)' },
      { key: 'C', text: 'Event Throttle' },
      { key: 'D', text: 'Event Hijacking' }
    ],
    correctAnswer: 'B',
    explanation: 'Event bubbling là giai đoạn sự kiện sau khi kích hoạt tại target element sẽ truyền ngược lên các phần tử tổ tiên đến document.'
  },
  {
    id: 'QA_G2_08',
    examSet: 'A',
    skillGroupId: 'G2',
    subSkillId: 'G2.2',
    difficulty: 'Khó',
    bloomLevel: 'Phân tích',
    content: 'Đoạn mã sau in ra giá trị gì trên màn hình console?\nconst obj = {\n  count: 10,\n  getCount: function() {\n    return () => this.count;\n  }\n};\nconst fn = obj.getCount();\nconsole.log(fn());',
    options: [
      { key: 'A', text: 'undefined' },
      { key: 'B', text: '10' },
      { key: 'C', text: 'Lỗi TypeError: this is undefined' },
      { key: 'D', text: 'NaN' }
    ],
    correctAnswer: 'B',
    explanation: 'getCount là regular function được gọi qua obj nên this bên trong là obj. Arrow function kế thừa this của getCount, do đó this.count là 10.'
  },
  {
    id: 'QA_G2_09',
    examSet: 'A',
    skillGroupId: 'G2',
    subSkillId: 'G2.3',
    difficulty: 'Khó',
    bloomLevel: 'Vận dụng',
    content: 'Kỹ thuật "Event Delegation" mang lại lợi ích lớn nhất nào khi xử lý danh sách gồm 10,000 phần tử (ví dụ: danh sách sản phẩm)?',
    options: [
      { key: 'A', text: 'Giúp trình duyệt tải trang nhanh hơn mà không cần tải file CSS' },
      { key: 'B', text: 'Chỉ cần gắn 1 event listener duy nhất lên phần tử cha thay vì gắn 10,000 listener riêng lẻ, tiết kiệm đáng kể bộ nhớ' },
      { key: 'C', text: 'Tự động gửi request lên server mỗi khi click' },
      { key: 'D', text: 'Ngăn chặn hoàn toàn việc người dùng nhấp đúp' }
    ],
    correctAnswer: 'B',
    explanation: 'Event Delegation lợi dụng event bubbling để quản lý sự kiện tập trung tại thẻ cha, tối ưu bộ nhớ vượt trội.'
  },
  {
    id: 'QA_G2_10',
    examSet: 'A',
    skillGroupId: 'G2',
    subSkillId: 'G2.1',
    difficulty: 'Khó',
    bloomLevel: 'Phân tích',
    content: 'Đoạn mã sao chép object sau tạo ra bản sao nông (shallow copy) hay bản sao sâu (deep copy)?\nconst original = { a: 1, b: { c: 2 } };\nconst clone = { ...original };',
    options: [
      { key: 'A', text: 'Deep copy hoàn toàn, sửa clone.b.c không ảnh hưởng original' },
      { key: 'B', text: 'Shallow copy, sửa clone.b.c sẽ làm thay đổi cả original.b.c' },
      { key: 'C', text: 'Gây lỗi cú pháp vì spread không áp dụng được cho object lồng nhau' },
      { key: 'D', text: 'Tạo liên kết tham chiếu (không phải bản sao)' }
    ],
    correctAnswer: 'B',
    explanation: 'Toán tử Spread (...) chỉ copy nông các thuộc tính tầng 1. Thuộc tính b vẫn giữ nguyên tham chiếu vùng nhớ cũ.'
  },

  // ==========================================
  // NHÓM 3: React cơ bản (G3)
  // ==========================================
  {
    id: 'QA_G3_01',
    examSet: 'A',
    skillGroupId: 'G3',
    subSkillId: 'G3.1',
    difficulty: 'Dễ',
    bloomLevel: 'Nhớ',
    content: 'Trong React, thuộc tính nào được truyền từ component cha xuống component con và có tính chất chỉ đọc (read-only)?',
    options: [
      { key: 'A', text: 'state' },
      { key: 'B', text: 'props' },
      { key: 'C', text: 'context' },
      { key: 'D', text: 'ref' }
    ],
    correctAnswer: 'B',
    explanation: 'props là dữ liệu truyền từ component cha và component con không được phép biến đổi (mutate) props trực tiếp.'
  },
  {
    id: 'QA_G3_02',
    examSet: 'A',
    skillGroupId: 'G3',
    subSkillId: 'G3.2',
    difficulty: 'Dễ',
    bloomLevel: 'Nhớ',
    content: 'Hook nào trong React dùng để khai báo và quản lý trạng thái nội bộ (local state) trong Function Component?',
    options: [
      { key: 'A', text: 'useEffect' },
      { key: 'B', text: 'useState' },
      { key: 'C', text: 'useContext' },
      { key: 'D', text: 'useMemo' }
    ],
    correctAnswer: 'B',
    explanation: 'useState trả về một cặp gồm giá trị state hiện tại và hàm cập nhật state.'
  },
  {
    id: 'QA_G3_03',
    examSet: 'A',
    skillGroupId: 'G3',
    subSkillId: 'G3.3',
    difficulty: 'Dễ',
    bloomLevel: 'Hiểu',
    content: 'Khi render một danh sách các phần tử bằng phương thức .map(), tại sao React yêu cầu mỗi phần tử phải có thuộc tính key?',
    options: [
      { key: 'A', text: 'Để tự động đánh số thứ tự hiển thị' },
      { key: 'B', text: 'Để thuật toán Reconciliation của React xác định chính xác phần tử nào bị thêm, sửa hoặc xóa, tối ưu quá trình re-render' },
      { key: 'C', text: 'Để áp dụng CSS class cho phần tử đó' },
      { key: 'D', text: 'Để lưu trữ dữ liệu vào database' }
    ],
    correctAnswer: 'B',
    explanation: 'key giúp React nhận diện danh tính ổn định của từng item khi danh sách biến động.'
  },
  {
    id: 'QA_G3_04',
    examSet: 'A',
    skillGroupId: 'G3',
    subSkillId: 'G3.2',
    difficulty: 'Trung bình',
    bloomLevel: 'Hiểu',
    content: 'useEffect(() => { console.log("Mounted"); }, []);\nĐoạn effect với mảng phụ thuộc rỗng ([]) này sẽ chạy khi nào?',
    options: [
      { key: 'A', text: 'Chạy lại sau mỗi lần component re-render' },
      { key: 'B', text: 'Chỉ chạy đúng 1 lần sau khi component được mount lần đầu tiên vào DOM' },
      { key: 'C', text: 'Chỉ chạy trước khi component bị unmount' },
      { key: 'D', text: 'Không bao giờ chạy' }
    ],
    correctAnswer: 'B',
    explanation: 'Mảng dependency rỗng [] báo hiệu cho React rằng effect không phụ thuộc vào bất kỳ prop hay state nào, chỉ chạy 1 lần khi mount.'
  },
  {
    id: 'QA_G3_05',
    examSet: 'A',
    skillGroupId: 'G3',
    subSkillId: 'G3.1',
    difficulty: 'Trung bình',
    bloomLevel: 'Vận dụng',
    content: 'Cách cập nhật state đếm tăng thêm 1 nào dưới đây là an toàn nhất khi có nhiều sự kiện kích hoạt dồn dập?',
    options: [
      { key: 'A', text: 'setCount(count + 1)' },
      { key: 'B', text: 'setCount(prevCount => prevCount + 1)' },
      { key: 'C', text: 'count = count + 1' },
      { key: 'D', text: 'count++' }
    ],
    correctAnswer: 'B',
    explanation: 'Functional update form setCount(prev => prev + 1) đảm bảo luôn lấy đúng giá trị state mới nhất trong hàng đợi cập nhật.'
  },
  {
    id: 'QA_G3_06',
    examSet: 'A',
    skillGroupId: 'G3',
    subSkillId: 'G3.3',
    difficulty: 'Trung bình',
    bloomLevel: 'Vận dụng',
    content: 'Đoạn mã sau hiển thị gì khi biến unreadCount = 0?\n<div>{unreadCount && <span>Có tin nhắn mới</span>}</div>',
    options: [
      { key: 'A', text: 'Không hiển thị gì cả (khoảng trống)' },
      { key: 'B', text: 'In ra số 0 trên màn hình giao diện' },
      { key: 'C', text: 'In ra chữ "Có tin nhắn mới"' },
      { key: 'D', text: 'Gây lỗi crash ứng dụng' }
    ],
    correctAnswer: 'B',
    explanation: 'Trong JS, 0 là falsy. Toán tử && trả về vế trái nếu là falsy, dẫn đến React render trực tiếp giá trị số 0 ra UI. Cách đúng: unreadCount > 0 && ...'
  },
  {
    id: 'QA_G3_07',
    examSet: 'A',
    skillGroupId: 'G3',
    subSkillId: 'G3.2',
    difficulty: 'Trung bình',
    bloomLevel: 'Vận dụng',
    content: 'Hàm cleanup trả về bên trong useEffect được kích hoạt khi nào?',
    codeSnippet: 'useEffect(() => {\n  const timer = setInterval(() => {}, 1000);\n  return () => clearInterval(timer);\n}, [id]);',
    options: [
      { key: 'A', text: 'Chỉ khi trang web bị tắt hoàn toàn' },
      { key: 'B', text: 'Trước khi effect chạy lại ở lần render tiếp theo (khi id thay đổi) và khi component unmount' },
      { key: 'C', text: 'Ngay khi hàm useEffect vừa bắt đầu thực thi' },
      { key: 'D', text: 'Chỉ chạy khi có lỗi exception xảy ra' }
    ],
    correctAnswer: 'B',
    explanation: 'Cleanup function dọn dẹp tài nguyên trước khi effect chạy lần mới và trước khi component bị gỡ khỏi DOM.'
  },
  {
    id: 'QA_G3_08',
    examSet: 'A',
    skillGroupId: 'G3',
    subSkillId: 'G3.1',
    difficulty: 'Khó',
    bloomLevel: 'Phân tích',
    content: 'CÂU HỎI MẪU NGHIÊN CỨU: Một component danh sách lọc theo từ khóa đang lưu cả danh sách gốc và danh sách đã lọc trong hai state riêng, gây lệch dữ liệu khi danh sách gốc thay đổi. Cách sửa phù hợp nhất là gì?',
    options: [
      { key: 'A', text: 'Thêm state thứ ba đồng bộ hai state' },
      { key: 'B', text: 'Chỉ lưu danh sách gốc trong state, tính danh sách lọc khi render (derived state)' },
      { key: 'C', text: 'Dùng ref thay state cho cả hai' },
      { key: 'D', text: 'Tải lại trang sau mỗi lần lọc' }
    ],
    correctAnswer: 'B',
    explanation: 'Đúng theo nguyên lý "Don\'t put in state what you can compute on the fly": tính danh sách lọc trực tiếp từ danh sách gốc và từ khóa tìm kiếm.'
  },
  {
    id: 'QA_G3_09',
    examSet: 'A',
    skillGroupId: 'G3',
    subSkillId: 'G3.2',
    difficulty: 'Khó',
    bloomLevel: 'Phân tích',
    content: 'Nguyên nhân nào dẫn đến lỗi "Maximum update depth exceeded" (vòng lặp vô hạn re-render) trong đoạn mã sau?\nfunction MyComp() {\n  const [data, setData] = useState([]);\n  useEffect(() => {\n    setData([{ id: 1 }]);\n  });\n}',
    options: [
      { key: 'A', text: 'Do data là một mảng rỗng' },
      { key: 'B', text: 'Do useEffect không khai báo dependency array, mỗi lần setData kích hoạt render, render lại kích hoạt useEffect gọi setData tiếp' },
      { key: 'C', text: 'Do ID của phần tử là số nguyên' },
      { key: 'D', text: 'Do React không hỗ trợ hàm mũi tên trong effect' }
    ],
    correctAnswer: 'B',
    explanation: 'Thiếu dependency array khiến effect chạy sau mỗi lần render. setData gây render lại -> lặp vô tận.'
  },
  {
    id: 'QA_G3_10',
    examSet: 'A',
    skillGroupId: 'G3',
    subSkillId: 'G3.3',
    difficulty: 'Khó',
    bloomLevel: 'Phân tích',
    content: 'Tại sao việc dùng chỉ số index mảng (items.map((item, index) => <Item key={index} />)) làm key có thể gây lỗi nghiêm trọng khi danh sách hỗ trợ xóa, sắp xếp hoặc thêm vào đầu?',
    options: [
      { key: 'A', text: 'Vì index là số nguyên, React chỉ chấp nhận chuỗi (string) làm key' },
      { key: 'B', text: 'Vì khi thứ tự phần tử thay đổi, index của item thay đổi theo khiến React liên kết nhầm local state của component cũ sang dữ liệu mới' },
      { key: 'C', text: 'Vì index làm tăng kích thước bundle của ứng dụng' },
      { key: 'D', text: 'Vì index không hiển thị được trên màn hình' }
    ],
    correctAnswer: 'B',
    explanation: 'Index không đại diện cho danh tính nội tại của dữ liệu. Khi đổi chỗ hoặc xóa, index bị gán lại gây lệch state nội bộ giữa các phần tử.'
  },

  // ==========================================
  // NHÓM 4: Kết nối API & bất đồng bộ (G4)
  // ==========================================
  {
    id: 'QA_G4_01',
    examSet: 'A',
    skillGroupId: 'G4',
    subSkillId: 'G4.3',
    difficulty: 'Dễ',
    bloomLevel: 'Nhớ',
    content: 'Mã trạng thái HTTP (Status Code) nào dưới đây biểu thị yêu cầu đã được máy chủ tiếp nhận và xử lý thành công?',
    options: [
      { key: 'A', text: '200 OK' },
      { key: 'B', text: '404 Not Found' },
      { key: 'C', text: '500 Internal Server Error' },
      { key: 'D', text: '301 Moved Permanently' }
    ],
    correctAnswer: 'A',
    explanation: '200 OK biểu thị request thành công theo chuẩn giao thức HTTP.'
  },
  {
    id: 'QA_G4_02',
    examSet: 'A',
    skillGroupId: 'G4',
    subSkillId: 'G4.3',
    difficulty: 'Dễ',
    bloomLevel: 'Nhớ',
    content: 'Phương thức HTTP nào theo tiêu chuẩn RESTful được sử dụng để lấy danh sách tài nguyên từ máy chủ mà không làm thay đổi dữ liệu?',
    options: [
      { key: 'A', text: 'POST' },
      { key: 'B', text: 'GET' },
      { key: 'C', text: 'PUT' },
      { key: 'D', text: 'DELETE' }
    ],
    correctAnswer: 'B',
    explanation: 'GET là phương thức an toàn (safe) và bình đạm (idempotent) dùng để đọc dữ liệu.'
  },
  {
    id: 'QA_G4_03',
    examSet: 'A',
    skillGroupId: 'G4',
    subSkillId: 'G4.1',
    difficulty: 'Dễ',
    bloomLevel: 'Hiểu',
    content: 'Một Promise trong JavaScript có thể nằm ở một trong những trạng thái nào sau đây?',
    options: [
      { key: 'A', text: 'Pending, Fulfilled, Rejected' },
      { key: 'B', text: 'Start, Pause, Stop' },
      { key: 'C', text: 'Ready, Running, Terminated' },
      { key: 'D', text: 'Open, Closed, Reconnecting' }
    ],
    correctAnswer: 'A',
    explanation: 'Promise có 3 trạng thái duy nhất: Pending (chờ), Fulfilled (thành công) hoặc Rejected (thất bại).'
  },
  {
    id: 'QA_G4_04',
    examSet: 'A',
    skillGroupId: 'G4',
    subSkillId: 'G4.1',
    difficulty: 'Trung bình',
    bloomLevel: 'Hiểu',
    content: 'Từ khóa await trong JavaScript chỉ có thể được sử dụng hợp lệ bên trong đâu?',
    options: [
      { key: 'A', text: 'Bên trong bất kỳ vòng lặp nào' },
      { key: 'B', text: 'Bên trong một hàm được khai báo với từ khóa async (hoặc top-level module)' },
      { key: 'C', text: 'Bên trong khối lệnh if/else' },
      { key: 'D', text: 'Bên trong hàm setTimeout' }
    ],
    correctAnswer: 'B',
    explanation: 'await chỉ có thể dùng trong async function (hoặc ES Module cấp cao nhất - top-level await).'
  },
  {
    id: 'QA_G4_05',
    examSet: 'A',
    skillGroupId: 'G4',
    subSkillId: 'G4.2',
    difficulty: 'Trung bình',
    bloomLevel: 'Vận dụng',
    content: 'CÂU HỎI MẪU NGHIÊN CỨU: Đoạn mã dùng fetch lấy danh sách sản phẩm nhưng giao diện không hiển thị khi máy chủ trả lỗi 500. Phương án xử lý đúng nhất là gì?',
    options: [
      { key: 'A', text: 'Bỏ qua lỗi và giữ giao diện trống' },
      { key: 'B', text: 'Kiểm tra response.ok, hiển thị thông báo lỗi và giữ dữ liệu cũ (nếu có)' },
      { key: 'C', text: 'Gọi lại API vô hạn đến khi thành công' },
      { key: 'D', text: 'Ẩn toàn bộ trang khi có lỗi' }
    ],
    correctAnswer: 'B',
    explanation: 'Fetch API không tự động reject khi nhận mã 500. Lập trình viên phải kiểm tra response.ok, thông báo lỗi cho người dùng và duy trì dữ liệu fallback.'
  },
  {
    id: 'QA_G4_06',
    examSet: 'A',
    skillGroupId: 'G4',
    subSkillId: 'G4.2',
    difficulty: 'Trung bình',
    bloomLevel: 'Vận dụng',
    content: 'Tại sao khi dùng Fetch API cần phải gọi await response.json() thay vì nhận dữ liệu ngay sau lệnh fetch?',
    options: [
      { key: 'A', text: 'Vì fetch chỉ trả về Headers, còn response.json() là thao tác đọc luồng dữ liệu (ReadableStream) bất đồng bộ' },
      { key: 'B', text: 'Vì fetch là hàm đồng bộ' },
      { key: 'C', text: 'Vì response.json() dùng để mã hóa mật khẩu' },
      { key: 'D', text: 'Vì đây là quy định bắt buộc của CSS' }
    ],
    correctAnswer: 'A',
    explanation: 'fetch() giải quyết ngay khi nhận được HTTP Header. Đọc body dưới dạng JSON là một stream bất đồng bộ cần thêm await.'
  },
  {
    id: 'QA_G4_07',
    examSet: 'A',
    skillGroupId: 'G4',
    subSkillId: 'G4.1',
    difficulty: 'Trung bình',
    bloomLevel: 'Phân tích',
    content: 'Đoạn mã sau in ra thứ tự nào trên console?\nconsole.log("1");\nsetTimeout(() => console.log("2"), 0);\nPromise.resolve().then(() => console.log("3"));\nconsole.log("4");',
    options: [
      { key: 'A', text: '1 -> 2 -> 3 -> 4' },
      { key: 'B', text: '1 -> 4 -> 3 -> 2' },
      { key: 'C', text: '1 -> 4 -> 2 -> 3' },
      { key: 'D', text: '3 -> 1 -> 4 -> 2' }
    ],
    correctAnswer: 'B',
    explanation: 'Thứ tự ưu tiên Event Loop: Đồng bộ (1, 4) -> Microtask queue (Promise: 3) -> Macrotask queue (setTimeout: 2).'
  },
  {
    id: 'QA_G4_08',
    examSet: 'A',
    skillGroupId: 'G4',
    subSkillId: 'G4.2',
    difficulty: 'Khó',
    bloomLevel: 'Vận dụng',
    content: 'Khi người dùng gõ tìm kiếm liên tục, làm thế nào để hủy (cancel) các HTTP request cũ đang bay để tránh dữ liệu cũ ghi đè lên kết quả mới?',
    options: [
      { key: 'A', text: 'Sử dụng AbortController và truyền signal vào hàm fetch' },
      { key: 'B', text: 'Tắt kết nối internet tạm thời' },
      { key: 'C', text: 'Gọi hàm window.stop()' },
      { key: 'D', text: 'Khởi động lại trình duyệt' }
    ],
    correctAnswer: 'A',
    explanation: 'AbortController cung cấp đối tượng signal cho fetch để chủ động hủy bỏ network request khi không còn cần thiết.'
  },
  {
    id: 'QA_G4_09',
    examSet: 'A',
    skillGroupId: 'G4',
    subSkillId: 'G4.3',
    difficulty: 'Khó',
    bloomLevel: 'Phân tích',
    content: 'Để gửi dữ liệu một đối tượng mới lên server theo chuẩn JSON, cấu hình fetch nào sau đây là đầy đủ và chính xác nhất?',
    codeSnippet: 'fetch(url, {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify(data)\n})',
    options: [
      { key: 'A', text: 'Thiếu headers Content-Type' },
      { key: 'B', text: 'Cấu hình hoàn toàn chính xác theo chuẩn HTTP' },
      { key: 'C', text: 'Body phải là đối tượng trực tiếp data (không cần stringify)' },
      { key: 'D', text: 'Method phải là GET' }
    ],
    correctAnswer: 'B',
    explanation: 'Cần method POST, header báo kiểu dữ liệu Content-Type: application/json, và chuyển object thành JSON string.'
  },
  {
    id: 'QA_G4_10',
    examSet: 'A',
    skillGroupId: 'G4',
    subSkillId: 'G4.1',
    difficulty: 'Khó',
    bloomLevel: 'Phân tích',
    content: 'Phương thức Promise.all([p1, p2, p3]) có hành vi như thế nào nếu một trong ba promise (ví dụ p2) bị reject?',
    options: [
      { key: 'A', text: 'Vẫn đợi các promise khác và trả về kết quả thành công của p1 và p3' },
      { key: 'B', text: 'Ngay lập tức reject toàn bộ với lý do lỗi của p2 (fail-fast)' },
      { key: 'C', text: 'Tự động gọi lại p2 nhiều lần' },
      { key: 'D', text: 'Chuyển trạng thái sang pending mãi mãi' }
    ],
    correctAnswer: 'B',
    explanation: 'Promise.all hoạt động theo cơ chế all-or-nothing (fail-fast). Nếu muốn nhận kết quả cả thành công lẫn thất bại, dùng Promise.allSettled.'
  },

  // ==========================================
  // NHÓM 5: Git/GitHub & DevTools (G5)
  // ==========================================
  {
    id: 'QA_G5_01',
    examSet: 'A',
    skillGroupId: 'G5',
    subSkillId: 'G5.1',
    difficulty: 'Dễ',
    bloomLevel: 'Nhớ',
    content: 'Lệnh Git nào dùng để đưa các tệp đã chỉnh sửa vào khu vực chuẩn bị commit (Staging Area)?',
    options: [
      { key: 'A', text: 'git status' },
      { key: 'B', text: 'git add .' },
      { key: 'C', text: 'git commit' },
      { key: 'D', text: 'git push' }
    ],
    correctAnswer: 'B',
    explanation: 'git add đưa các tệp từ working directory vào staging area.'
  },
  {
    id: 'QA_G5_02',
    examSet: 'A',
    skillGroupId: 'G5',
    subSkillId: 'G5.1',
    difficulty: 'Dễ',
    bloomLevel: 'Nhớ',
    content: 'Lệnh nào dùng để kiểm tra trạng thái các tệp đang thay đổi, chưa được theo dõi (untracked) hoặc đã stage?',
    options: [
      { key: 'A', text: 'git log' },
      { key: 'B', text: 'git status' },
      { key: 'C', text: 'git branch' },
      { key: 'D', text: 'git checkout' }
    ],
    correctAnswer: 'B',
    explanation: 'git status cung cấp thông tin tổng quan trạng thái làm việc hiện tại của Git.'
  },
  {
    id: 'QA_G5_03',
    examSet: 'A',
    skillGroupId: 'G5',
    subSkillId: 'G5.2',
    difficulty: 'Dễ',
    bloomLevel: 'Nhớ',
    content: 'Cú pháp lệnh Git nào cho phép tạo một nhánh mới có tên feature-login và chuyển ngay sang nhánh đó?',
    options: [
      { key: 'A', text: 'git checkout -b feature-login' },
      { key: 'B', text: 'git branch feature-login' },
      { key: 'C', text: 'git switch feature-login' },
      { key: 'D', text: 'git merge feature-login' }
    ],
    correctAnswer: 'A',
    explanation: 'git checkout -b (hoặc git switch -c) tạo mới và đồng thời chuyển sang nhánh vừa tạo.'
  },
  {
    id: 'QA_G5_04',
    examSet: 'A',
    skillGroupId: 'G5',
    subSkillId: 'G5.2',
    difficulty: 'Trung bình',
    bloomLevel: 'Hiểu',
    content: 'Khi ở nhánh main và muốn gộp các thay đổi từ nhánh feature vào main, câu lệnh nào được sử dụng?',
    options: [
      { key: 'A', text: 'git merge feature' },
      { key: 'B', text: 'git branch feature' },
      { key: 'C', text: 'git push feature' },
      { key: 'D', text: 'git clone feature' }
    ],
    correctAnswer: 'A',
    explanation: 'Đứng tại nhánh đích (main) và chạy git merge <nhánh-nguồn>.'
  },
  {
    id: 'QA_G5_05',
    examSet: 'A',
    skillGroupId: 'G5',
    subSkillId: 'G5.3',
    difficulty: 'Trung bình',
    bloomLevel: 'Hiểu',
    content: 'Merge Conflict (Xung đột gộp nhánh) trong Git xảy ra trong tình huống điển hình nào?',
    options: [
      { key: 'A', text: 'Khi hai lập trình viên cùng sửa trên cùng một dòng trong cùng một tệp và Git không thể tự quyết định lấy bản nào' },
      { key: 'B', text: 'Khi mất kết nối mạng internet' },
      { key: 'C', text: 'Khi dung lượng commit vượt quá 100MB' },
      { key: 'D', text: 'Khi tên nhánh quá dài' }
    ],
    correctAnswer: 'A',
    explanation: 'Conflict xảy ra khi có các thay đổi đối nghịch nhau trên cùng vùng code giữa hai nhánh.'
  },
  {
    id: 'QA_G5_06',
    examSet: 'A',
    skillGroupId: 'G5',
    subSkillId: 'G5.3',
    difficulty: 'Trung bình',
    bloomLevel: 'Vận dụng',
    content: 'Lệnh git pull thực chất là sự kết hợp của hai hành động Git nào?',
    options: [
      { key: 'A', text: 'git add và git commit' },
      { key: 'B', text: 'git fetch và git merge' },
      { key: 'C', text: 'git clone và git checkout' },
      { key: 'D', text: 'git branch và git push' }
    ],
    correctAnswer: 'B',
    explanation: 'git pull = git fetch (tải dữ liệu từ remote về) + git merge (gộp vào nhánh cục bộ hiện tại).'
  },
  {
    id: 'QA_G5_07',
    examSet: 'A',
    skillGroupId: 'G5',
    subSkillId: 'G5.1',
    difficulty: 'Trung bình',
    bloomLevel: 'Vận dụng',
    content: 'Tệp nào dùng để chỉ định cho Git bỏ qua không theo dõi thư mục node_modules hoặc các tệp cấu hình chứa mã khóa bí mật (.env)?',
    options: [
      { key: 'A', text: '.gitconfig' },
      { key: 'B', text: '.gitignore' },
      { key: 'C', text: 'package.json' },
      { key: 'D', text: 'README.md' }
    ],
    correctAnswer: 'B',
    explanation: '.gitignore liệt kê các pattern file/thư mục mà Git sẽ hoàn toàn bỏ qua.'
  },
  {
    id: 'QA_G5_08',
    examSet: 'A',
    skillGroupId: 'G5',
    subSkillId: 'G5.3',
    difficulty: 'Khó',
    bloomLevel: 'Vận dụng',
    content: 'Khi gặp xung đột conflict, các ký hiệu đánh dấu <<<<<<< HEAD, =======, và >>>>>>> feature biểu thị điều gì trong tệp?',
    options: [
      { key: 'A', text: 'Ký hiệu lỗi cú pháp của ngôn ngữ lập trình' },
      { key: 'B', text: 'Vùng xung đột: Phần giữa HEAD và ======= là code nhánh hiện tại, phần giữa ======= và feature là code nhánh cần gộp' },
      { key: 'C', text: 'Mã hóa bảo mật SHA của commit' },
      { key: 'D', text: 'Thẻ HTML đặc biệt của GitHub' }
    ],
    correctAnswer: 'B',
    explanation: 'Git chèn conflict markers để lập trình viên lựa chọn giữ bản code nào hoặc kết hợp cả hai.'
  },
  {
    id: 'QA_G5_09',
    examSet: 'A',
    skillGroupId: 'G5',
    subSkillId: 'G5.2',
    difficulty: 'Khó',
    bloomLevel: 'Phân tích',
    content: 'Thông điệp commit nào dưới đây tuân thủ đúng quy ước quốc tế Conventional Commits nhất cho việc bổ sung tính năng giỏ hàng?',
    options: [
      { key: 'A', text: 'update code' },
      { key: 'B', text: 'fix bug and add cart' },
      { key: 'C', text: 'feat(cart): implement add to cart and quantity adjustment' },
      { key: 'D', text: 'Commit lan 2' }
    ],
    correctAnswer: 'C',
    explanation: 'Conventional Commits có cấu trúc type(scope): description rõ ràng, tách bạch tính năng (feat).'
  },
  {
    id: 'QA_G5_10',
    examSet: 'A',
    skillGroupId: 'G5',
    subSkillId: 'G5.3',
    difficulty: 'Khó',
    bloomLevel: 'Phân tích',
    content: 'Lệnh git push --force có thể gây hậu quả nguy hiểm gì khi làm việc nhóm trên nhánh chung (như develop hoặc main)?',
    options: [
      { key: 'A', text: 'Làm hỏng ổ cứng máy tính cá nhân' },
      { key: 'B', text: 'Ghi đè và xóa mất lịch sử commit của các thành viên khác trên server từ xa' },
      { key: 'C', text: 'Tự động hủy bỏ tài khoản GitHub' },
      { key: 'D', text: 'Khóa toàn bộ quyền truy cập mạng' }
    ],
    correctAnswer: 'B',
    explanation: '--force cưỡng chế viết đè lịch sử nhánh remote, cực kỳ rủi ro trong làm việc nhóm.'
  },

  // ==========================================
  // NHÓM 6: Debug & kiểm thử (G6)
  // ==========================================
  {
    id: 'QA_G6_01',
    examSet: 'A',
    skillGroupId: 'G6',
    subSkillId: 'G6.1',
    difficulty: 'Dễ',
    bloomLevel: 'Nhớ',
    content: 'Tab nào trong Chrome DevTools dùng để kiểm tra các thông điệp lỗi console.error() và thực thi lệnh JavaScript trực tiếp?',
    options: [
      { key: 'A', text: 'Elements' },
      { key: 'B', text: 'Console' },
      { key: 'C', text: 'Network' },
      { key: 'D', text: 'Application' }
    ],
    correctAnswer: 'B',
    explanation: 'Tab Console là nơi xuất các thông điệp log/error và là môi trường REPL tương tác.'
  },
  {
    id: 'QA_G6_02',
    examSet: 'A',
    skillGroupId: 'G6',
    subSkillId: 'G6.1',
    difficulty: 'Dễ',
    bloomLevel: 'Nhớ',
    content: 'Tab nào trong DevTools cho phép kiểm tra chi tiết các yêu cầu API HTTP gửi đi, Headers, Payload và dữ liệu JSON phản hồi?',
    options: [
      { key: 'A', text: 'Sources' },
      { key: 'B', text: 'Network' },
      { key: 'C', text: 'Performance' },
      { key: 'D', text: 'Memory' }
    ],
    correctAnswer: 'B',
    explanation: 'Tab Network ghi lại mọi hoạt động truyền thông mạng của trang web.'
  },
  {
    id: 'QA_G6_03',
    examSet: 'A',
    skillGroupId: 'G6',
    subSkillId: 'G6.3',
    difficulty: 'Dễ',
    bloomLevel: 'Nhớ',
    content: 'Mục đích chính của Kiểm thử đơn vị (Unit Test) trong phát triển phần mềm là gì?',
    options: [
      { key: 'A', text: 'Kiểm tra tốc độ gõ phím của lập trình viên' },
      { key: 'B', text: 'Kiểm tra tính đúng đắn của từng đơn vị mã nguồn nhỏ nhất (hàm, phương thức) một cách độc lập' },
      { key: 'C', text: 'Kiểm tra giao diện người dùng trên nhiều loại máy tính' },
      { key: 'D', text: 'Kiểm tra khả năng chịu tải của server khi có hàng triệu người dùng' }
    ],
    correctAnswer: 'B',
    explanation: 'Unit test tập trung kiểm thử các đơn vị code riêng lẻ, cô lập với hệ thống bên ngoài.'
  },
  {
    id: 'QA_G6_04',
    examSet: 'A',
    skillGroupId: 'G6',
    subSkillId: 'G6.1',
    difficulty: 'Trung bình',
    bloomLevel: 'Hiểu',
    content: 'Lỗi "Uncaught TypeError: Cannot read properties of undefined (reading \'name\')" thường xuất phát từ nguyên nhân nào?',
    options: [
      { key: 'A', text: 'Do biến đang truy cập thuộc tính .name có giá trị là undefined (chưa được gán hoặc API chưa tải xong)' },
      { key: 'B', text: 'Do tên biến bị viết hoa' },
      { key: 'C', text: 'Do mạng internet bị ngắt' },
      { key: 'D', text: 'Do máy chủ bị tắt' }
    ],
    correctAnswer: 'A',
    explanation: 'Truy cập thuộc tính trên một giá trị null hoặc undefined sinh ra ngoại lệ TypeError kinh điển.'
  },
  {
    id: 'QA_G6_05',
    examSet: 'A',
    skillGroupId: 'G6',
    subSkillId: 'G6.2',
    difficulty: 'Trung bình',
    bloomLevel: 'Vận dụng',
    content: 'Lợi thế lớn nhất của việc đặt Breakpoint trong tab Sources so với việc viết console.log() tràn lan khi debug là gì?',
    options: [
      { key: 'A', text: 'Breakpoint có thể tạm dừng luồng chạy tại thời điểm thực thi, xem giá trị biến trong Call Stack và không cần sửa/xóa code sau khi fix xong' },
      { key: 'B', text: 'Breakpoint tự động sửa lỗi cho lập trình viên' },
      { key: 'C', text: 'Breakpoint giúp website chạy nhanh gấp đôi' },
      { key: 'D', text: 'Breakpoint không cần mở trình duyệt' }
    ],
    correctAnswer: 'A',
    explanation: 'Breakpoint cho phép kiểm tra trạng thái bộ nhớ thời gian thực, từng bước thực thi (step over, step into) sạch sẽ.'
  },
  {
    id: 'QA_G6_06',
    examSet: 'A',
    skillGroupId: 'G6',
    subSkillId: 'G6.2',
    difficulty: 'Trung bình',
    bloomLevel: 'Vận dụng',
    content: 'Khi gặp lỗi giao diện không cập nhật sau khi gọi hàm sửa mảng: items.push(newItem); setItems(items); nguyên nhân là gì?',
    options: [
      { key: 'A', text: 'items.push biến đổi trực tiếp (mutate) mảng cũ, tham chiếu vùng nhớ không đổi nên React coi như state chưa đổi và bỏ qua render' },
      { key: 'B', text: 'Do hàm push không hỗ trợ object' },
      { key: 'C', text: 'Do React bị lỗi cú pháp' },
      { key: 'D', text: 'Do mạng chậm' }
    ],
    correctAnswer: 'A',
    explanation: 'React so sánh tham chiếu (Object.is). Cần tạo mảng mới: setItems([...items, newItem]).'
  },
  {
    id: 'QA_G6_07',
    examSet: 'A',
    skillGroupId: 'G6',
    subSkillId: 'G6.3',
    difficulty: 'Trung bình',
    bloomLevel: 'Hiểu',
    content: 'Mô hình chuẩn AAA trong viết Unit Test đại diện cho 3 bước nào?',
    options: [
      { key: 'A', text: 'Action, Algorithm, Array' },
      { key: 'B', text: 'Arrange (Thiết lập), Act (Hành động), Assert (Khẳng định kết quả)' },
      { key: 'C', text: 'Async, Await, Apply' },
      { key: 'D', text: 'Add, Align, Animate' }
    ],
    correctAnswer: 'B',
    explanation: 'AAA: Arrange (chuẩn bị dữ liệu), Act (gọi hàm cần test), Assert (so sánh kết quả mong đợi).'
  },
  {
    id: 'QA_G6_08',
    examSet: 'A',
    skillGroupId: 'G6',
    subSkillId: 'G6.2',
    difficulty: 'Khó',
    bloomLevel: 'Phân tích',
    content: 'Đoạn mã sau xảy ra lỗi gì khi chạy?\nfunction sum(n) {\n  if (n === 0) return 0;\n  return n + sum(n);\n}',
    options: [
      { key: 'A', text: 'Lỗi RangeError: Maximum call stack size exceeded (Tràn ngăn xếp do đệ quy vô hạn)' },
      { key: 'B', text: 'Chạy bình thường và trả về kết quả n' },
      { key: 'C', text: 'Lỗi cú pháp SyntaxError' },
      { key: 'D', text: 'Lỗi bộ nhớ RAM đầy' }
    ],
    correctAnswer: 'A',
    explanation: 'sum(n) gọi lại chính nó với cùng tham số n mà không giảm dần về 0, dẫn tới tràn Call Stack.'
  },
  {
    id: 'QA_G6_09',
    examSet: 'A',
    skillGroupId: 'G6',
    subSkillId: 'G6.1',
    difficulty: 'Khó',
    bloomLevel: 'Phân tích',
    content: 'Để giả lập tình huống mạng yếu hoặc mất kết nối nhằm kiểm tra trạng thái Offline và Skeleton UI của ứng dụng, ta thao tác ở đâu trong DevTools?',
    options: [
      { key: 'A', text: 'Tab Network -> Throttling dropdown -> Chọn Slow 3G hoặc Offline' },
      { key: 'B', text: 'Rút dây mạng trực tiếp' },
      { key: 'C', text: 'Tab Memory -> Take snapshot' },
      { key: 'D', text: 'Tab Security -> Clear certificates' }
    ],
    correctAnswer: 'A',
    explanation: 'Network Throttling cho phép giả lập mạng chậm 3G, 4G hoặc Offline ngay trong trình duyệt.'
  },
  {
    id: 'QA_G6_10',
    examSet: 'A',
    skillGroupId: 'G6',
    subSkillId: 'G6.3',
    difficulty: 'Khó',
    bloomLevel: 'Phân tích',
    content: 'Đoạn test case sau kiểm tra hàm tính tổng hợp lệ khi nào?\ntest("tính tổng đúng", () => {\n  expect(sum(2, 3)).toBe(5);\n});',
    options: [
      { key: 'A', text: 'Khi hàm sum(2, 3) trả về chính xác giá trị 5' },
      { key: 'B', text: 'Khi hàm sum(2, 3) không có lỗi cú pháp' },
      { key: 'C', text: 'Khi kết quả khác 5' },
      { key: 'D', text: 'Khi mã nguồn được biên dịch xong' }
    ],
    correctAnswer: 'A',
    explanation: 'expect(value).toBe(expected) là assertion so sánh bằng nghiêm ngặt trong Jest/Vitest.'
  }
];

// Sinh đôi Đề B tự động theo ma trận Bảng 4 (Twin questions)
export const GENERATE_EXAM_B_QUESTIONS = (): Question[] => {
  return SEED_QUESTIONS.map(qA => {
    return {
      ...qA,
      id: qA.id.replace('QA_', 'QB_'),
      examSet: 'B',
      twinQuestionId: qA.id,
      content: `[Đề B - Câu sinh đôi] ${qA.content.replace('CÂU HỎI MẪU NGHIÊN CỨU: ', '')}`
    };
  });
};

export const ALL_QUESTIONS: Question[] = [
  ...SEED_QUESTIONS,
  ...GENERATE_EXAM_B_QUESTIONS()
];
