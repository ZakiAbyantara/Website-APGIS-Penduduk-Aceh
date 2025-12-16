// ===============================
// INISIALISASI PETA
// ===============================
const map = L.map("map").setView([4.9, 96.7], 8);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

// ===============================
// DATA POPULASI ACEH (BPS)
// ===============================
const dataAceh = [
  { name: "Kabupaten Simeulue", pop: 93228, lat: 2.6160, lng: 96.0830 },
  { name: "Kabupaten Aceh Singkil", pop: 124101, lat: 2.3370, lng: 97.7820 },
  { name: "Kabupaten Aceh Selatan", pop: 238081, lat: 3.3110, lng: 97.3510 },
  { name: "Kabupaten Aceh Tenggara", pop: 216495, lat: 3.4850, lng: 97.8450 },
  { name: "Kabupaten Aceh Timur", pop: 436081, lat: 4.7792, lng: 97.9980 },
  { name: "Kabupaten Aceh Tengah", pop: 212494, lat: 4.6340, lng: 96.8430 },
  { name: "Kabupaten Aceh Barat", pop: 210113, lat: 4.1460, lng: 96.1280 },
  { name: "Kabupaten Aceh Besar", pop: 415318, lat: 5.4529, lng: 95.4770 },
  { name: "Kabupaten Pidie", pop: 434511, lat: 5.0740, lng: 95.9400 },
  { name: "Kabupaten Bireuen", pop: 454224, lat: 5.2030, lng: 96.7000 },
  { name: "Kabupaten Aceh Utara", pop: 602694, lat: 5.0300, lng: 97.2800 },
  { name: "Kabupaten Aceh Barat Daya", pop: 145726, lat: 3.7370, lng: 96.8360 },
  { name: "Kabupaten Gayo Lues", pop: 109204, lat: 3.9550, lng: 97.3510 },
  { name: "Kabupaten Aceh Tamiang", pop: 279132, lat: 4.2320, lng: 98.0020 },
  { name: "Kabupaten Nagan Raya", pop: 160728, lat: 4.1660, lng: 96.4800 },
  { name: "Kabupaten Aceh Jaya", pop: 94418, lat: 4.8620, lng: 95.6450 },
  { name: "Kabupaten Bener Meriah", pop: 155364, lat: 4.7260, lng: 96.8610 },
  { name: "Kabupaten Pidie Jaya", pop: 164566, lat: 5.1950, lng: 96.1830 },
  { name: "Kota Banda Aceh", pop: 270321, lat: 5.5483, lng: 95.3238 },
  { name: "Kota Sabang", pop: 41431, lat: 5.8920, lng: 95.3230 },
  { name: "Kota Langsa", pop: 185174, lat: 4.4683, lng: 97.9683 },
  { name: "Kota Lhokseumawe", pop: 189978, lat: 5.1801, lng: 97.1507 },
  { name: "Kota Subulussalam", pop: 82927, lat: 2.7510, lng: 97.9750 }
];

let markers = [];

// ===============================
// WARNA & ICON
// ===============================
function getColor(pop) {
  if (pop >= 500000) return "red";
  if (pop >= 300000) return "orange";
  if (pop >= 200000) return "yellow";
  return "green";
}

function getIcon(pop) {
  const color = getColor(pop);
  return L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

// ===============================
// RENDER MARKER
// ===============================
function renderMarkers(data) {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  data.forEach(d => {
    const marker = L.marker([d.lat, d.lng], { icon: getIcon(d.pop) }).addTo(map);
    marker.bindPopup(`<strong>${d.name}</strong><br>Jumlah Penduduk: ${d.pop.toLocaleString("id-ID")} jiwa`);
    markers.push(marker);
  });
}

// ===============================
// FILTER & SEARCH
// ===============================
function filterData() {
  const name = document.getElementById("searchName").value.toLowerCase();
  const minPop = document.getElementById("minPop").value;

  const filtered = dataAceh.filter(d => {
    const matchName = name ? d.name.toLowerCase().includes(name) : true;
    const matchPop = minPop ? d.pop >= minPop : true;
    return matchName && matchPop;
  });

  renderMarkers(filtered);
}

function resetData() {
  document.getElementById("searchName").value = "";
  document.getElementById("minPop").value = "";
  renderMarkers(dataAceh);
}

// ===============================
// RENDER AWAL
// ===============================
renderMarkers(dataAceh);

// ===============================
// LEGENDA
// ===============================
const legend = L.control({ position: "bottomright" });
legend.onAdd = function () {
  const div = L.DomUtil.create("div", "legend");
  div.innerHTML = `
    <strong>Jumlah Penduduk</strong><br>
    <i style="background: green"></i> < 200.000<br>
    <i style="background: yellow"></i> 200.000 – 299.999<br>
    <i style="background: orange"></i> 300.000 – 499.999<br>
    <i style="background: red"></i> ≥ 500.000
  `;
  return div;
};
legend.addTo(map);

// ===============================
// SKALA & NORTH ARROW
// ===============================
L.control.scale({ position: "bottomleft", metric: true, imperial: false }).addTo(map);

const northArrow = L.control({ position: "topleft" });
northArrow.onAdd = () => {
  const div = L.DomUtil.create("div", "north-arrow");
  div.innerHTML = "N ↑";
  return div;
};
northArrow.addTo(map);
