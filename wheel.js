// Provjera da je korisnik došao preko unesene kode
var aktivniKod = sessionStorage.getItem("aktivniKod");

if (!aktivniKod) {
  window.location.replace("index.html");
}

// Nagrade na kolutu
const nagrade = [
  "Brezplačna kava",
  "5 € popusta",
  "Sladica gratis",
  "10 % popusta",
  "Poskusi znova",
  "Glavna nagrada",
  "Pijača gratis",
  "15 % popusta"
];

// Boje pojedinih polja
const barve = [
  "#0d3b2e",
  "#d6a83e",
  "#165c46",
  "#f0c866",
  "#0d3b2e",
  "#d6a83e",
  "#165c46",
  "#f0c866"
];

const kolo = document.getElementById("kolo");
const risanje = kolo.getContext("2d");
const gumb = document.getElementById("gumb-vrti");
const rezultat = document.getElementById("rezultat");

const sredina = kolo.width / 2;
const polmer = sredina - 18;

let zasuk = 0;
let seVrti = false;
let zeZavrteno = false;

// Izris kola
function narisiKolo() {
  const kos = (Math.PI * 2) / nagrade.length;

  risanje.clearRect(0, 0, kolo.width, kolo.height);

  nagrade.forEach(function (nagrada, i) {
    const zacetek = -Math.PI / 2 + i * kos;

    risanje.beginPath();
    risanje.moveTo(sredina, sredina);
    risanje.arc(sredina, sredina, polmer, zacetek, zacetek + kos);
    risanje.closePath();

    risanje.fillStyle = barve[i];
    risanje.fill();

    risanje.strokeStyle = "#fff8e8";
    risanje.lineWidth = 4;
    risanje.stroke();

    risanje.save();
    risanje.translate(sredina, sredina);
    risanje.rotate(zacetek + kos / 2);

    risanje.textAlign = "right";
    risanje.fillStyle = i === 3 || i === 7 ? "#17332a" : "#ffffff";
    risanje.font = "bold 26px Arial";

    const besede = nagrada.split(" ");

    if (besede.length > 2) {
      risanje.fillText(
        besede.slice(0, 2).join(" "),
        polmer - 25,
        -7
      );
      risanje.fillText(
        besede.slice(2).join(" "),
        polmer - 25,
        25
      );
    } else {
      risanje.fillText(nagrada, polmer - 25, 9);
    }

    risanje.restore();
  });

  // Sredina kola
  risanje.beginPath();
  risanje.arc(sredina, sredina, 58, 0, Math.PI * 2);

  risanje.fillStyle = "#fff8e8";
  risanje.fill();

  risanje.strokeStyle = "#d6a83e";
  risanje.lineWidth = 8;
  risanje.stroke();

  risanje.fillStyle = "#0d3b2e";
  risanje.textAlign = "center";
  risanje.textBaseline = "middle";
  risanje.font = "bold 23px Arial";
  risanje.fillText("ALMASA", sredina, sredina);
}

narisiKolo();

// Vrtnja kola
gumb.addEventListener("click", function () {
  if (seVrti || zeZavrteno) {
    return;
  }

  seVrti = true;
  gumb.disabled = true;
  rezultat.textContent = "Kolo se vrti...";

  const zmagovalec = Math.floor(Math.random() * nagrade.length);

  const kosStopinj = 360 / nagrade.length;

  // Polje pod kazalcem
  const cilj = 360 - (zmagovalec * kosStopinj + kosStopinj / 2);

  const trenutno = ((zasuk % 360) + 360) % 360;

  zasuk += 360 * 7 + ((cilj - trenutno + 360) % 360);

  kolo.style.transition = "transform 5.5s cubic-bezier(0.12, 0.72, 0.08, 1)";
  kolo.style.transform = "rotate(" + zasuk + "deg)";

  window.setTimeout(function () {
    seVrti = false;
    zeZavrteno = true;

    rezultat.innerHTML =
      "Vaša nagrada: " +
      nagrade[zmagovalec] +
      "<br><small>Rezultat pokažite osebju.</small>";

    gumb.textContent = "Kolo je bilo zavrteno";

    sessionStorage.removeItem("aktivniKod");
  }, 5700);
});
