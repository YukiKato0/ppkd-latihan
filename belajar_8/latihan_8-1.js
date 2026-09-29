const pelanggaranBerat = false;
const teori = 90;
const praktek = 10;
const kehadiaran = 90;
const studentName = "Saka Bayu";
let { studentKategori, studentStatus } =
  pelanggaranBerat ? { studentKategori: "Pelanggaran Berat", studentStatus: "Tidak Lulus" } :
  kehadiaran < 90 ? { studentKategori: "Kehadiran Kurang", studentStatus: "Tidak Lulus" } :
  teori < 75 ? { studentKategori: "Teori Kurang", studentStatus: "Tidak Lulus" } :
  praktek < 80 ? { studentKategori: "Praktek Kurang", studentStatus: "Tidak Lulus" } : "Lulus";

console.log("Nama:", studentName);
console.log("Rata-rata:", (teori + praktek) / 2);
console.log("Kategori:", studentKategori);
console.log("Status:", studentStatus);