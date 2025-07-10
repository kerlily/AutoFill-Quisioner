const nilaiRadio = "4"; // nilai 4 = Sangat Baik, ubah jika mau
const isiTextArea = " "; // spasi satu aja biar valid
const jedaSetelahSubmit = 1500;

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function isiPolling(index, linkElement) {
  console.log(`▶️ Klik polling ${index + 1}`);
  linkElement.click();

  // Tunggu konten form AJAX muncul
  let tries = 30;
  while (tries-- > 0 && !document.querySelector("#content form")) {
    await delay(300);
  }

  const form = document.querySelector("#content form");
  if (!form) {
    console.warn(`❌ Form polling ${index + 1} gagal dimuat.`);
    return false;
  }

  // Centang semua radio bernilai 4
  const radios = form.querySelectorAll("input[type='radio'][value='" + nilaiRadio + "']");
  radios.forEach(r => r.checked = true);

  // Isi semua textarea dengan spasi
  const textareas = form.querySelectorAll("textarea");
  textareas.forEach(t => t.value = isiTextArea);

  console.log(`✅ Submit polling ${index + 1}`);
  form.submit();

  return true;
}

async function mulaiIsiSemuaPolling() {
  const pollingLinks = Array.from(document.querySelectorAll("td[id^='polling'] a"));

  for (let i = 0; i < pollingLinks.length; i++) {
    const link = document.querySelectorAll("td[id^='polling'] a")[i];

    const success = await isiPolling(i, link);
    if (!success) break;

    // Tunggu redirect/load ulang ke halaman polling list
    await delay(jedaSetelahSubmit);

    // Tunggu sampai polling berikutnya muncul di DOM
    let tries = 20;
    while (tries-- > 0 && !document.querySelectorAll("td[id^='polling'] a")[i + 1]) {
      await delay(300);
    }
  }

  alert("🎉 Semua polling sudah diisi!");
}

mulaiIsiSemuaPolling();
