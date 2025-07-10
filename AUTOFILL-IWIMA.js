const nilaiRadio = "4"; // Nilai tertinggi
const isiTextArea = " "; // Isi agar form valid
const jedaSetelahSubmit = 2000; // 2 detik setelah submit

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function isiPolling(index, linkElement) {
  console.log(`▶️ Ambil polling ke-${index + 1}`);
  linkElement.click();

  // Tunggu form kuisioner muncul
  let tries = 30;
  while (tries-- > 0 && !document.forms["frmPolling"]) {
    await delay(300);
  }

  const form = document.forms["frmPolling"];
  if (!form) {
    console.warn(`❌ Form polling ${index + 1} gagal dimuat.`);
    return false;
  }

  // Centang semua pilihan jawaban dengan nilai 4
  for (let i = 1; i <= 7; i++) {
    const radio = form.querySelector(`input[name="${i}"][value="${nilaiRadio}"]`);
    if (radio) radio.checked = true;
  }

  // Isi kolom saran
  const textarea = form.querySelector('textarea[name="8"]');
  if (textarea) textarea.value = isiTextArea;

  // Submit form
  const submitBtn = form.querySelector('input[type="submit"]');
  if (submitBtn) {
    console.log(`✅ Submit polling ${index + 1}`);
    submitBtn.click();
    return true;
  } else {
    console.error("❌ Tombol submit tidak ditemukan.");
    return false;
  }
}

async function mulaiIsiSemuaPolling() {
  const pollingLinks = Array.from(document.querySelectorAll("td[id^='polling'] a"));

  for (let i = 0; i < pollingLinks.length; i++) {
    const link = document.querySelectorAll("td[id^='polling'] a")[i];

    const success = await isiPolling(i, link);
    if (!success) break;

    // Tunggu halaman polling kembali
    await delay(jedaSetelahSubmit);

    // Tunggu polling selanjutnya muncul
    let tries = 30;
    while (tries-- > 0 && !document.querySelectorAll("td[id^='polling'] a")[i + 1]) {
      await delay(300);
    }
  }

  alert("✅ Semua kuisioner berhasil diisi!");
}

mulaiIsiSemuaPolling();
