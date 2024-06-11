export const listDataKhamSkDinhKi = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    status: "Đang triển khai", 
    date: "06/2024",
    healthFacilities: "BVĐKQT Vinmec Times City",
    address: "458 P. Minh Khai, KĐT Times City, Hai Bà Trưng, Hà Nội",
    quantity: "100"
}));

export const listDataKhamSkDinhKiChiTiet = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    code: 10000000 + i,
    name: "Trịnh Bùi Quang Huy",
    birthday: "01-01-2000",
    gender: "Nam",
    healthParameters: {
        BMI: "25.86kg/m2",
        bloodPressure: "139/82 mmHg",
        heartbeat: "96 lần/phút"
    },
    internalMedicine: ["Bình thưởng", "Có bệnh béo phì do chỉ số BMI > 25"],
    surgery: ["Bình thường"],
    eyes: ["Bình thường", "Hai mắt cận thị, tầm nhìn xa giảm, không viêm nhiễm"],
    otolaryngology: ["Lệch vách ngăn mũi sang trái"],
    dentistry: ["Hàm trên: Bình thường", "Hàm dưới: Lệch răng cửa, răng 48 lợi trùm"],
    dermatology: ["Bình thường"]
}));