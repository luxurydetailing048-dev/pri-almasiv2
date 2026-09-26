// Elementi sa stranice
const forma = document.getElementById("forma-koda");
const unosKoda = document.getElementById("unos-koda");
const poruka = document.getElementById("poruka");

// Polje dopušta samo velika slova, brojeve i crticu
unosKoda.addEventListener("input", function () {
  unosKoda.value = unosKoda.value
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "");

  poruka.textContent = "";
});

// Provjera kode pri kliku na Nadaljuj
forma.addEventListener("submit", function (dogadaj) {
  dogadaj.preventDefault();

  const kod = unosKoda.value.trim().toUpperCase();

  const uporabljene = JSON.parse(
    localStorage.getItem("almasaUporabljeneKode") || "[]"
  );

  // Koda ne obstaja
  if (!window.ALNASA_CODES.includes(kod)) {
    poruka.textContent =
      "Koda ni veljavna. Preverite jo in poskusite znova.";
    unosKoda.focus();
    return;
  }

  // Koda je že bila uporabljena v tem brskalniku
  if (uporabljene.includes(kod)) {
    poruka.textContent =
      "Ta koda je bila v tem brskalniku že uporabljena.";
    return;
  }

  // Koda je veljavna - shrani jo in odpri kolo
  sessionStorage.setItem("aktivniKod", kod);

  window.location.href = "wheel.html";
});
