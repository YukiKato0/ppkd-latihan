// IF ELSE
const totalBelanja = 1_000_000_000;
const isMember = false;
let diskon = 0;

if (isMember && totalBelanja >= 200_000_000) {
  diskon = 0.1;
} else if (totalBelanja >= 500_000_000) {
  diskon = 0.2;
} else {
  diskon = 0;
}

const potongan = totalBelanja * diskon;
const bayar = totalBelanja - potongan;

console.log(`Total Belanja: ${totalBelanja}`);
console.log(`Potongan Harga: ${potongan}`);
console.log(`Total Bayar: ${bayar}`);



// SWITCH
const color = "Biru";
switch (color) {
  case "Biru":
    console.log("Iya, Biru");
    break;
  case "Merah":
    console.log("Iya, Merah");
    break;
  default:
    console.log("Bukan, Biru / Merah");
    break;
}