/*
 * 사이트 내용은 이 파일만 수정하면 됩니다.
 * - 상품 추가: PRODUCTS 배열에 항목을 하나 더 넣습니다.
 * - image: images/ 폴더에 파일을 넣고 경로를 적습니다. 비워 두면 기본 색상 카드가 표시됩니다.
 * - links: 판매처별 상품 URL. 없는 판매처는 지웁니다. (kmong | etsy | gumroad)
 */

const SITE = {
  name: "Studio Name",
  tagline: {
    ko: "기록과 생산성을 돕는 전자책 · 굿노트 · 노션 템플릿",
    en: "Ebooks, GoodNotes & Notion templates for better planning",
  },
  about: {
    ko: "직접 쓰면서 다듬은 플래너와 템플릿을 만듭니다. 여기에 소개 문구를 적어 주세요.",
    en: "I design planners and templates I actually use every day. Replace this with your own introduction.",
  },
  email: "hello@example.com",
  social: {
    instagram: "https://instagram.com/",
    threads: "",
    pinterest: "",
    blog: "",
  },
  stores: {
    kmong: "https://kmong.com/",
    etsy: "https://www.etsy.com/shop/",
    gumroad: "https://gumroad.com/",
  },
};

const PRODUCTS = [
  {
    id: "ebook-1",
    category: "ebook",
    title: { ko: "전자책 제목 예시", en: "Sample Ebook Title" },
    desc: {
      ko: "전자책의 핵심 내용을 한두 문장으로 소개합니다.",
      en: "Describe what the reader will learn in one or two sentences.",
    },
    price: "₩15,000",
    image: "",
    links: { kmong: "https://kmong.com/" },
  },
  {
    id: "goodnotes-1",
    category: "goodnotes",
    title: { ko: "2027 디지털 플래너", en: "2027 Digital Planner" },
    desc: {
      ko: "하이퍼링크 월간·주간·일간 플래너. 굿노트, 노타빌리티 호환.",
      en: "Hyperlinked monthly, weekly and daily planner for GoodNotes & Notability.",
    },
    price: "$8",
    image: "",
    links: { etsy: "https://www.etsy.com/", gumroad: "https://gumroad.com/" },
  },
  {
    id: "notion-1",
    category: "notion",
    title: { ko: "노션 독서 기록 템플릿", en: "Notion Reading Tracker" },
    desc: {
      ko: "읽은 책, 밑줄, 리뷰를 한곳에서 관리하는 노션 템플릿.",
      en: "Track books, highlights and reviews in one Notion workspace.",
    },
    price: "$6",
    image: "",
    links: { etsy: "https://www.etsy.com/", gumroad: "https://gumroad.com/" },
  },
];
