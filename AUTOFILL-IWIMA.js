const nilai = "4"; // Ubah kalau ingin isi nilai lain (misal "3")
const jedaClickAmbil = 800;
const jedaTungguForm = 1000;
const jedaKirim = 800;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const ambilLinks = Array.from(document.querySelectorAll('td[id^="polling"] a'));

async function isiFormPolling(index, el) {
  console.log(`▶️ ${index + 1}. Klik 'Ambil'`);
  el.click();
  await delay(jedaTungguForm);

  // Tunggu isi pertanyaan muncul di #content (dari AJAX)
  let maxTry = 30;
  while (document.querySelectorAll("#content input[type='radio']").length === 0 && maxTry > 0) {
    await delay(200);
    maxTry--;
  }

  const radios = Array.from(document.querySelectorAll("#content input[type='radio']"));
  if (radios.length === 0) {
    console.warn(`❌ Tidak ada form di polling ke-${index + 1}`);
    return;
  }

  // Check semua radio dengan value = nilai (default 4)
  radios.forEach((r) => {
    if (r.value === nilai) {
      r.checked = true;
    }
  });

  await delay(jedaKirim);

  const form = document.querySelector("#content form");
  if (form) {
    console.log(`✅ Mengirim polling ke-${index + 1}`);
    form.submit();
    await delay(jedaClickAmbil); // Tunggu reload ke daftar polling
  } else {
    console.warn(`❌ Form tidak ditemukan di polling ke-${index + 1}`);
  }
}

async function isiSemuaPolling() {
  console.log(`🚀 Mulai mengisi ${ambilLinks.length} polling`);
  for (let i = 0; i < ambilLinks.length; i++) {
    await isiFormPolling(i, ambilLinks[i]);
  }
  alert("🎉 Semua kuisioner sudah diisi otomatis!");
}

isiSemuaPolling();
