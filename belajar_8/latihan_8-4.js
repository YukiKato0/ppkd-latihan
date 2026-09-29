// Objek, Array & Filter
const peserta = {
  name: "Saka Bayu",
  "alamat lengkap": "Jl. Sawo",
  jurusan: "Web Programing",
}

console.log(peserta.name);
console.log(peserta["alamat lengkap"]);
console.log(peserta.jurusan);

peserta.nilai = 80;
console.log("Peserta:", peserta);

delete peserta.nilai;
peserta.status = "Baru";
peserta.email = "example@gmail.com"
console.log("Peserta Baru:", peserta);


const siswa = [
  {
    id: 1,
    name: "Rudi",
    nilai: 80,
  },
  {
    id: 2,
    name: "Wawan",
    nilai: 50,
  },
  {
    id: 3,
    name: "Ratna",
    nilai: 75,
  },
];
console.log("Siswa:", siswa);
siswa.forEach((item, index) => {
  console.log(`${index} | Nama: ${item.name}`);
});

const siswaLulus = siswa.filter((s) => {
  return s.nilai >= 75;
})

console.log("Siswa Lulus:", siswaLulus);