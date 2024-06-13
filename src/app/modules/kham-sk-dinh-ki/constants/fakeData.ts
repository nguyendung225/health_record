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

export const VI_SINH_TEST_NHANH = [
    { service: "Hồng cầu trong phân test nhanh", result: "Âm tính/ Negative", reference: "Âm tính/ Negative", unit: "mmol/L"},
];

export const HOA_SINH = [
    { service: "Nitrite", result: "Âm tính/ Negative", reference: "Âm tính/ Negative", unit: "mmol/L" },
    { service: "Urobilinogen", result: "34", reference: "1.008 - 1.030", unit: "mmol/L" },
    { service: "Specific gravity", result: "Âm tính/ Negative", reference: "Âm tính/ Negative", unit: "umol/L" },
    { service: "Cetone", result: "4.4", reference: "4.8 - 7.5", unit: "mmol/L" },
    { service: "Creatinin (niệu)", result: "20", reference: "Normal (<33.9)", unit: "g/L" },
    { service: "Bilirubin", result: "Normal", reference: "Âm tính/ Negative", unit: "cell/uL" },
];

export const VI_SINH_MIEN_DICH_TU_DONG = [
    { service: "HBsAb định lượng", result: "Âm tính/ Negative (<2)", reference: "Âm tính/ Negative (<10)", unit: "IU/L" },
    { service: "HBsAb miễn dịch tự động", result: "Âm tính/ Negative (<2)", reference: "Âm tính/ Negative (<10)", unit: "IU/L" },
];

export const HUYET_HOC = [
    { service: "Thể tích khối tiểu cầu - PCT", result: "0.25", reference: "0.1 - 0.5", unit: "L/L" },
    { service: "HbA1c", result: "5.16", reference: "<6.4 (HPLC)", unit: "%" },
    { service: "% Hồng cầu có nhân - NRBC %", result: "0.0", reference: "0.0 - 0.4", unit: "%" },
    { service: "Số lượng hồng cầu - RBC", result: "5.38", reference: "4.2 - 5.4", unit: "T/L" },
    { service: "% Bạch cầu mono - MO %", result: "9.7", reference: "4.7 - 12.0", unit: "%" },
    { service: "Thể tích khối hồng cầu - HCT", result: "0.441", reference: "0.42 - 0.47", unit: "L/L" },
    { service: "Số lượng bạch cầu ưa bazơ - BA#", result: "0.04", reference: "0.01 - 0.07", unit: "G/L" },
    { service: "Số lượng bạch cầu - WBC", result: "8.3", reference: "4.0 - 10.0", unit: "G/I" },
];