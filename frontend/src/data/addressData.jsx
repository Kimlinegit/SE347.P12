
const cities = [
    // 'Thành phố Hà Nội', 
    'Thành phố Hồ Chí Minh', 
    // 'Tỉnh/Thành phố C'
];
const districtsMap = {
'Thành phố Hà Nội': [
    'Quận Ba Đình', 
    'Quận Hoàn Kiếm', 
    'Quận Tây Hồ',
    'Quận Long Biên',
    'Quận Cầu Giấy',
    'Quận Đống Đa',
    'Quận Hai Bà Trưng',
    'Quận Hoàng Mai',
    'Quận Thanh Xuân',
    'Huyện Sóc Sơn',
    'Huyện Đông Anh',
    'Huyện Gia Lâm',
    'Quận Nam từ Liêm',
    'Huyện Thanh Trì',
    'Quận Bắc Từ Liêm',
    'Huyện Mê Linh',
    'Quận Hà Đông',
    'Thị Xã Sơn Tây',
    'Huyện Ba Vì',
    'Huyện Phúc Thọ',
    'Huyện Đan Phượng',
    'Huyện Hoài Đức',
    'Huyện Quốc Oai',
    'Huyện Thạch Thất',
    'Huyện Chương Mỹ',
    'Huyện Thanh Oai',
    'Huyện Thường Tín',
    'Huyện Phú Xuyên',
    'Huyện Ứng Hòa',
    'Huyện Mỹ Đức'
],
'Thành phố Hồ Chí Minh': [
    'Quận 1', 
    'Quận 12', 
    'Quận Gò Vấp',
    'Quận Bình Thạnh',
    'Quận Tân Bình',
    'Quận Tân Phú',
    'Quận Phú Nhuận',
    'Quận Thủ Đức',
    'Quận 3',
    'Quận 10',
    'Quận 11',
    'Quận 4',
    'Quận 5',
    'Quận 6',
    'Quận 8',
    'Quận Bình Tân',
    'Quận 7',
    'Huyện Củ Chi',
    'Huyện Hóc Môn',
    'Huyện Bình Chánh',
    'Huyện Nhà Bè',
    'Huyện Cần Giờ'
],
'Tỉnh/Thành phố C': [
    'Quận/Huyện C1', 
    'Quận/Huyện C2', 
    'Quận/Huyện C3'],
};
const wardsMap = {
'Quận 1': [
    'Phường Bến Nghé', 
    'Phường Bến Thành', 
    'Phường Cô Giang',
    'Phường Cầu Kho',
    'Phường Cầu Ông Lãnh',
    'Phường Đa Kao',
    'Phường Nguyễn Thái Bình',
    'Phường Nguyễn Cư Trinh',
    'Phường Phạm Ngũ Lão',
    'Phường Tân Định'
    ],
'Quận 12': [
    'Phường Thạnh Xuân', 
    'Phường Thạnh Lộc', 
    'Phường Hiệp Thành',
    'Phường Thới An',
    'Phường Tân Chánh Hiệp',
    'Phường An Phú Đông',
    'Phường Tân Thới Hiệp',
    'Phường Trung Mỹ Tây',
    'Phường Tân Hưng Thuận',
    'Phường Đông Hưng Thuận',
    'Phường Tân Thới Nhất'
    ],
'Quận Gò Vấp': [
    'Phường 15', 
    'Phường 13', 
    'Phường 17',
    'Phường 06',
    'Phường 16',
    'Phường 12',
    'Phường 14',
    'Phường 10',
    'Phường 05',
    'Phường 07',
    'Phường 04',
    'Phường 01',
    'Phường 09',
    'Phường 08',
    'Phường 11',
    'Phường 03'
    ],
    'Quận Bình Thạnh': [
    'Phường 13',
    'Phường 11',
    'Phường 27',
    'Phường 26',
    'Phường 12',
    'Phường 25',
    'Phường 05',
    'Phường 07',
    'Phường 24',
    'Phường 06',
    'Phường 14',
    'Phường 15',
    'Phường 02',
    'Phường 01',
    'Phường 03',
    'Phường 17',
    'Phường 21',
    'Phường 22',
    'Phường 19',
    'Phường 28',
    ],
    'Quận Tân Bình': [
    'Phường 02',
    'Phường 04',
    'Phường 12',
    'Phường 13',
    'Phường 01',
    'Phường 03',
    'Phường 11',
    'Phường 07',
    'Phường 05',
    'Phường 10',
    'Phường 06',
    'Phường 08',
    'Phường 09',
    'Phường 14',
    'Phường 15',
    ],
    'Quận Tân Phú': [
    'Phường Tân Sơn Nhì',
    'Phường Tây Thạnh',
    'Phường Sơn Kỳ',
    'Phường Tân Quý',
    'Phường Tân Thành',
    'Phường Phú Thọ Hòa',
    'Phường Phú Thạnh',
    'Phường Phú Trung',
    'Phường Hòa Thạnh',
    'Phường Hiệp Tân',
    'Phường Tân Thới Hòa'
    ],
    'Quận Phú Nhuận': [
    'Phường 04',
    'Phường 05',
    'Phường 09',
    'Phường 07',
    'Phường 03',
    'Phường 01',
    'Phường 02',
    'Phường 08',
    'Phường 15',
    'Phường 10',
    'Phường 11',
    'Phường 17',
    'Phường 13',
    ],
    'Quận Thủ Đức': [
    'Phường Thảo Điền',
    'Phường An Phú',
    'Phường An Khánh',
    'Phường Bình Trưng Đông',
    'Phường Bình Trưng Tây',
    'Phường Cát Lái',
    'Phường Thạnh Mỹ Lợi',
    'Phường An Lợi Đông',
    'Phường Thủ Thiêm',
    'Phường Linh Xuân',
    'Phường Bình Chiểu',
    'Phường Linh Trung',
    'Phường Tam Bình',
    'Phường Tam Phú',
    'Phường Hiệp Bình Phước',
    'Phường Hiệp Bình Chánh',
    'Phường Linh Chiểu',
    'Phường Linh Tây',
    'Phường Linh Đông',
    'Phường Bình Thọ',
    'Phường Trường Thọ',
    'Phường Long Bình',
    'Phường Long Thạnh Mỹ',
    'Phường Tân Phú',
    'Phường Hiệp Phú',
    'Phường Tăng Nhơn Phú A',
    'Phường Tăng Nhơn Phú B',
    'Phường Phước Long B',
    'Phường Phước Long A',
    'Phường Trường Thạnh',
    'Phường Long Phước',
    'Phường Long Trường',
    'Phường Phước Bình',
    'Phường Phú Hữu'
    ],
    'Quận 3': [
    'Phường 14',
    'Phường 12',
    'Phường 11',
    'Phường 13',
    'Phường Võ Thị Sáu',
    'Phường 09',
    'Phường 10',
    'Phường 04',
    'Phường 05',
    'Phường 03',
    'Phường 02',
    'Phường 01',
    ],
    'Quận 10': [
    'Phường 15',
    'Phường 13',
    'Phường 14',
    'Phường 12',
    'Phường 11',
    'Phường 10',
    'Phường 09',
    'Phường 01',
    'Phường 08',
    'Phường 02',
    'Phường 04',
    'Phường 07',
    'Phường 05',
    'Phường 06',
    ],
    'Quận 11': [
    'Phường 15',
    'Phường 05',
    'Phường 14',
    'Phường 11',
    'Phường 03',
    'Phường 10',
    'Phường 13',
    'Phường 08',
    'Phường 09',
    'Phường 12',
    'Phường 07',
    'Phường 06',
    'Phường 04',
    'Phường 01',
    'Phường 02',
    'Phường 16',
    ],
    'Quận 4': [
    'Phường 13',
    'Phường 09',
    'Phường 06',
    'Phường 08',
    'Phường 10',
    'Phường 18',
    'Phường 14',
    'Phường 04',
    'Phường 03',
    'Phường 16',
    'Phường 02',
    'Phường 15',
    'Phường 01',
    ],
    'Quận 5': [
    'Phường 04',
    'Phường 09',
    'Phường 03',
    'Phường 12',
    'Phường 02',
    'Phường 08',
    'Phường 07',
    'Phường 01',
    'Phường 11',
    'Phường 14',
    'Phường 05',
    'Phường 06',
    'Phường 10',
    'Phường 13',
    ],
    'Quận 6': [
    'Phường 14',
    'Phường 13',
    'Phường 09',
    'Phường 06',
    'Phường 12',
    'Phường 05',
    'Phường 11',
    'Phường 02',
    'Phường 01',
    'Phường 04',
    'Phường 08',
    'Phường 03',
    'Phường 07',
    'Phường 10',
    ],
    'Quận 8': [
    'Phường 08',
    'Phường 02',
    'Phường 01',
    'Phường 03',
    'Phường 11',
    'Phường 09',
    'Phường 10',
    'Phường 04',
    'Phường 13',
    'Phường 12',
    'Phường 05',
    'Phường 14',
    'Phường 06',
    'Phường 15',
    'Phường 16',
    'Phường 07',
    ],
    'Quận Bình Tân': [
    'Phường Bình Hưng Hòa',
    'Phường Bình Hưng Hòa A',
    'Phường Bình Hưng Hòa B',
    'Phường Bình Trị Đông',
    'Phường Bình Trị Đông A',
    'Phường Bình Trị Đông B',
    'Phường Tân Tạo',
    'Phường Tân Tạo A',
    'Phường An Lạc',
    'Phường An Lạc A'
    ],
    'Quận 7': [
    'Phường Tân Thuận Đông',
    'Phường Tân Thuận Tây',
    'Phường Tân Kiểng',
    'Phường Tân Hưng',
    'Phường Bình Thuận',
    'Phường Tân Quy',
    'Phường Phú Thuận',
    'Phường Tân Phú',
    'Phường Tân phong',
    'Phường Phú Mỹ'
    ],
    'Huyện Củ Chi': [
    'Thị Trấn Củ Chi',
    'Xã Phú Mỹ Hưng',
    'Xã An Phú',
    'Xã Trung Lập Thượng',
    'Xã An Nhơn Tây',
    'Xã Nhuận Đức',
    'Xã Phạm Văn Cội',
    'Xã Phú Hòa Đông',
    'Xã Trung Lập Hạ',
    'Xã Trung An',
    'Xã Phước Thạnh',
    'Xã Phước Hiệp',
    'Xã Tân An Hội',
    'Xã Phước Vĩnh An',
    'Xã Thái Mỹ',
    'Xã Tân Thạnh Tây',
    'Xã Phú Hòa',
    'Xã Tân Thạnh Đông',
    'Xã Bình Mỹ',
    'Xã Tân Phú Trung',
    'Xã Tân Thanh Hội'
    ],
    'Huyện Hóc Môn': [
    'Thị Trấn Hóc Môn',
    'Xã Tân Hiệp',
    'Xã Nhị Bình',
    'Xã Đông Thạnh',
    'Xã Tân Thới Nhì',
    'Xã Thới Tam Thôn',
    'Xã Xuân Thới Sơn',
    'Xã Tân Xuân',
    'Xã Xuân Thới Đông',
    'Xã Trung Chánh',
    'Xã Xuân Thới Thượng',
    'Xã Bà Điểm'
    ],
    'Huyện Bình Chánh': [
    'Thị Trấn Tân Túc',
    'Xã Phạm Văn Hai',
    'Xã Vĩnh Lộc A',
    'Xã Vĩnh Lộc B',
    'Xã Bình Lợi',
    'Xã Lê Minh Xuân',
    'Xã Tân Nhựt',
    'Xã Tân Kiên',
    'Xã Bình Hưng',
    'Xã Phong Phú',
    'Xã An Phú Tây',
    'Xã Hưng Long',
    'Xã Đa Phước',
    'Xã Tân Quý Tây',
    'Xã Bình Chánh',
    'Xã Quy Đức'
    ],
    'Huyện Nhà Bè': [
    'Thị Trấn Nhà Bè',
    'Xã Phước Kiển',
    'Xã Phước Lộc',
    'Xã Nhơn Đức',
    'Xã Phú Xuân',
    'Xã Long Thới',
    'Xã Hiệp Phước'
    ],
    'Huyện Cần Giờ': [
    'Thị Trấn Cần Thạnh',
    'Xã Bình Khánh',
    'Xã Tam Thôn Hiệp',
    'Xã An Thới Đông',
    'Xã Thạnh An',
    'Xã Long Hòa',
    'Xã Lý Nhơn'
    ]
// Tương tự cho các quận/huyện khác
};

export {
    cities,
    districtsMap,
    wardsMap
}