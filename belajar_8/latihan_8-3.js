const namePeople = ["Budi", "Laras", "Andi"];
const keranjang = ["Buah", "Sayuran", "Ikan"];

namePeople.pop();
namePeople.push("Raka");
namePeople.unshift("Rojak")

const totalName = namePeople.length;
const totalKeranjang = keranjang.length;

const namePeopleNew = [...namePeople, "Wawan"]

console.log("Nama:", namePeople);
console.log("Nama New:", namePeopleNew);
console.log("Keranjang:", keranjang);
console.log("Jumlah Orang", totalName);
console.log("Jumlah Item di dalam keranjang", totalKeranjang);
