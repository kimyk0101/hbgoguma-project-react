const dummyUsers = [
  {
    uid: 1,
    name: "test",
    nickname: "테스터",
    password: "test123",
    telNumber: "01012345678",
    email: "test@example.com",
    locaGu: "1", // int
    locaDong: "2", // int
    thumbnail: "", // 이미지주소
    recommend_uid: 0,
    point: 10000,
    userRate: 3500, //int 백분위
    registerDate: "2024-02-03 00:00:00",
    isDeleted: false, //탈퇴계정 접근제어
    isAdmin: false,
    updateTime: "2024-02-03 00:00:00"
  },
  {
    uid: 2,
    name: "ehgud", // 도형님
    nickname: "김도형",
    password: "ehgud123",
    telNumber: "01012345678",
    email: "ehgud@example.com",
    locaGu: "1", // int
    locaDong: "4", // int
    thumbnail: "", // 이미지주소
    recommend_uid: 0,
    point: 50000,
    userRate: 3500, //int 백분위
    registerDate: "2024-02-03 00:00:00",
    isDeleted: false, //탈퇴계정 접근제어
    isAdmin: false,
    updateTime: "2024-02-03 00:00:00"
  },
  {
    uid: 3,
    name: "wnsgml",
    nickname: "한준희",
    password: "wnsgml123",
    telNumber: "01012345678",
    email: "wnsgml@example.com",
    locaGu: "1", // int
    locaDong: "6", // int
    thumbnail: "", // 이미지주소
    recommend_uid: 0,
    point: 40000,
    userRate: 5000, //int 백분위
    registerDate: "2024-02-03 00:00:00",
    isDeleted: false, //탈퇴계정 접근제어
    isAdmin: false,
    updateTime: "2024-02-03 00:00:00"
  },
  {
    uid: 4,
    name: "dusrud",
    nickname: "김연경",
    password: "dusrud123",
    telNumber: "01012345678",
    email: "dusrud@example.com",
    locaGu: "1", // int
    locaDong: "7", // int
    thumbnail: "", // 이미지주소
    recommend_uid: 0,
    point: 30000,
    userRate: 7500, //int 백분위
    registerDate: "2024-02-03 00:00:00",
    isDeleted: false, //탈퇴계정 접근제어
    isAdmin: false,
    updateTime: "2024-02-03 00:00:00"
  },
  {
    uid: 5,
    name: "tmdghks",
    nickname: "곽승환",
    password: "tmdghks123",
    telNumber: "01012345678",
    email: "tmdghks@example.com",
    locaGu: "강남구", // int
    locaDong: "압구정동", // int
    thumbnail: "", // 이미지주소
    recommend_uid: 0,
    point: 20000,
    userRate: 10000, //int 백분위
    registerDate: "2024-02-03 00:00:00",
    isDeleted: false, //탈퇴계정 접근제어
    isAdmin: false,
    updateTime: "2024-02-03 00:00:00"
  }
  // {
  //   name: "admin",
  //   password: "admin1234",
  //   nickname: "관리자",
  //   telNumber: "01012341234",
  //   email: "admin@example.com",
  //   locaGu: "강남구",
  //   locaDong: "도곡동",
  //   thumbnail: "",
  //   registerDate: "2024-02-04",
  //   point: 8900,
  //   userRate: 85
  // },
  // {
  //   name: "Jung123",
  //   password: "pw123!",
  //   nickname: "우성배우",
  //   telNumber: "01056789012",
  //   email: "woosung@example.com",
  //   locaGu: "강남구",
  //   locaDong: "도곡동",
  //   thumbnail: "",
  //   registerDate: "2024-02-05",
  //   point: 4000,
  //   userRate: 65
  // },
];

export default dummyUsers;

// {
//   name: 이름
//   nickname: 닉네임
//   password: 비밀번호
//   telNumber: 전화번호
//   email: 이메일
//   locaGu: 구정보
//   locaDong: 동정보
//   thumbnail: 썸네일 주소
//   point: 유저 포인트
//   userRate: 유저 평가 점수
//   registerDate: 가입일자
// },

