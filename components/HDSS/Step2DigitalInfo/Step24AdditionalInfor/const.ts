// Nursery School: trường mầm non.
// Kindergarten: trường mẫu giáo.
// Primary School: trường tiểu học.
// Secondary School: trường trung học cơ sở
// High School: trường trung học phổ thông.
// University: trường đại học.
// College: cao đẳng.
// State School: trường công lập.

export const ACADEMIC_LEVEL = [
  {
    value: 1,
    name: 'highschool',
  },
  {
    value: 2,
    name: 'college',
  },
  {
    value: 3,
    name: 'university',
  },
  {
    value: 4,
    name: 'graduateschool',
  },
];

export const MARIAL_STATUS = [
  {
    value: 1,
    name: 'single',
  },
  {
    value: 2,
    name: 'married',
  },
  {
    value: 3,
    name: 'separated',
  },
  {
    value: 4,
    name: 'other',
  },
];

export const CAREER_DATA = [
  {
    value: 'CJ1.01',
    name: 'Chính trị - Xã hội - Quản lý Nhà nước',
    positions: [
      { value: 'CJ1.01.1', name: 'Chủ tịch nước, Phó Chủ tịch nước' },
      { value: 'CJ1.01.2', name: 'Chủ tịch Quốc hội, Phó Chủ tịch Quốc hội' },
      { value: 'CJ1.01.3', name: 'Thủ tướng, Phó thủ tướng' },
      { value: 'CJ1.01.4', name: 'Tổng Bí thư' },
      { value: 'CJ1.01.5', name: 'Chủ tịch, Phó Chủ tịch' },
      { value: 'CJ1.01.6', name: 'Bí thu, Phó Bí thư' },
      { value: 'CJ1.01.7', name: 'Thủ trưởng, Phó thủ trưởng' },
      { value: 'CJ1.01.8', name: 'Chủ nhiệm, Phó Chủ nhiệm' },
      { value: 'CJ1.01.9', name: 'Vụ trưởng, Phó Vụ trưởng' },
      { value: 'CJ1.01.10', name: 'Cục trưởng, Phó Cục trưởng' },
      { value: 'CJ1.01.11', name: 'Ủy viên' },
      { value: 'CJ1.01.12', name: 'Giám đốc Sở, Phó Giám đốc Sở' },
      { value: 'CJ1.01.13', name: 'Khác' },
    ],
  },
  {
    value: 'CJ1.02',
    name: 'Cung cấp nước, xử lý nước thải',
    positions: [
      { value: 'CJ1.02.1', name: 'Chủ tịch, Phó Chủ tịch HĐQT' },
      { value: 'CJ1.02.2', name: 'Tổng Giám đốc, Phó Tổng Giám đốc' },
      { value: 'CJ1.02.3', name: 'Giám đốc, Phó Giám đốc' },
      { value: 'CJ1.02.4', name: 'Trưởng phòng, Phó phòng' },
      { value: 'CJ1.02.5', name: 'Trưởng Bộ phận, Tổ trưởng' },
      { value: 'CJ1.02.6', name: 'Chuyên viên, nhân viên' },
      { value: 'CJ1.02.7', name: 'Khác' },
    ],
  },
  {
    value: 'CJ1.03',
    name: 'DV hộ gia đình',
    positions: [
      { value: 'CJ1.03.1', name: 'Chủ hộ' },
      { value: 'CJ1.03.2', name: 'Thành viên' },
      { value: 'CJ1.04.1', name: 'Chủ tịch, Phó Chủ tịch HĐQT' },
      { value: 'CJ1.04.2', name: 'Tổng Giám đốc, Phó Tổng Giám đốc' },
      { value: 'CJ1.04.3', name: 'Giám đốc, Phó Giám đốc' },
      { value: 'CJ1.04.4', name: 'Trưởng phòng, Phó phòng' },
      { value: 'CJ1.04.5', name: 'Trưởng Bộ phận, Tổ trưởng' },
      { value: 'CJ1.04.6', name: 'Chuyên viên, nhân viên' },
      { value: 'CJ1.04.7', name: 'Khác' },
    ],
  },
  {
    value: 'CJ1.04',
    name: 'DV lưu trú, ăn uống, du lịch',
    positions: [
      { value: 'CJ1.04.1', name: 'Chủ tịch, Phó Chủ tịch HĐQT' },
      { value: 'CJ1.04.2', name: 'Tổng Giám đốc, Phó Tổng Giám đốc' },
      { value: 'CJ1.04.3', name: 'Giám đốc, Phó Giám đốc' },
      { value: 'CJ1.04.4', name: 'Trưởng phòng, Phó phòng' },
      { value: 'CJ1.04.5', name: 'Trưởng Bộ phận, Tổ trưởng' },
      { value: 'CJ1.04.6', name: 'Chuyên viên, nhân viên' },
      { value: 'CJ1.04.7', name: 'Khác' },
    ],
  },
  { value: 'CJ1.05', name: 'Giáo dục - Đào tạo' },
  { value: 'CJ1.06', name: 'Hành chính và DV hỗ trợ' },
  { value: 'CJ1.07', name: 'Hoạt động của tổ chức/cơ quan quốc tế' },
  { value: 'CJ1.08', name: 'Khai khoáng' },
  { value: 'CJ1.09', name: 'Khoa học - Công nghệ' },
  { value: 'CJ1.10', name: 'Kiến trúc - Xây dựng' },
  { value: 'CJ1.11', name: 'Kinh doanh (bán buôn - bán lẻ)' },
  { value: 'CJ1.12', name: 'Kinh doanh Bất động sản' },
  { value: 'CJ1.13', name: 'Lâm nghiệp' },
  { value: 'CJ1.14', name: 'Nội trợ - Công việc gia đình' },
  { value: 'CJ1.15', name: 'Nông nghiệp' },
  { value: 'CJ1.16', name: 'Sản xuất - Chế biến chế tạo' },
  { value: 'CJ1.17', name: 'Sản xuất và phân phối điện, khí đốt, hơi nước' },
  { value: 'CJ1.18', name: 'Tài chính - Ngân hàng - Bảo hiểm' },
  { value: 'CJ1.19', name: 'Thông tin và truyền thông' },
  { value: 'CJ1.20', name: 'Thủy sản' },
  { value: 'CJ1.21', name: 'Văn hóa - Xã hội - Thể dục thể thao' },
  { value: 'CJ1.22', name: 'Vận tải kho bãi' },
  { value: 'CJ1.23', name: 'Y tế - trợ giúp xã hội' },
  { value: 'CJ1.24', name: 'Khác' },
];
