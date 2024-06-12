import { TRANG_THAI_NHAN_SU } from "../constants/fakeData";


const TrangThaiNhanSu = (code: string, name: string) => {
  const STATUS_CLASSNAME = {
    [TRANG_THAI_NHAN_SU.CHUA_LAM_VIEC]: "bg-secondary",
    [TRANG_THAI_NHAN_SU.DANG_LAM_VIEC]: "bg-primary",
    other: "status other",
  }
  return (
    <p className="d-flex align-items-center fs-4 mb-2">
      <span className={`spaces w-10 h-10 me-3 bg-warning rounded-circle ${STATUS_CLASSNAME[code] || STATUS_CLASSNAME["other"]}`}>
      </span>
      {name}
    </p>
  );
};

export default TrangThaiNhanSu;
