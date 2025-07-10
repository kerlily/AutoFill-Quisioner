// =============== KONFIGURASI ================
const jawabanDefault = "4"; // bisa diubah ke 1, 2, 3, 5 sesuai keinginan
const waktuTungguSetelahAmbil = 2000; // ms (2 detik)
const waktuTungguSetelahIsi = 1500; // ms (1.5 detik)
// ===========================================

let currentIndex = 0;
const totalPolling = 4; // Ganti sesuai jumlah matkul yang muncul

async function isiSemuaPolling() {
  for (let i = 0; i < totalPolling; i++) {
    const pollingCell = document.querySelector(`#polling${i}`);
    if (!pollingCell) continue;

    const linkAmbil = pollingCell.querySelector("a");
    if (linkAmbil) {
      console.log(`Mengambil polling ke-${i + 1}...`);
      linkAmbil.click();
      await new Promise(r => setTimeout(r, waktuTungguSetelahAmbil));

      // Jawab semua pertanyaan yang muncul
      const radios = document.querySelectorAll('#isiPertanyaan input[type=radio]');
      radios.forEach(radio => {
        if (radio.value === jawabanDefault) {
          radio.checked = true;
        }
      });

      // Klik tombol Kirim jika ada
      const kirimBtn = Array.from(document.querySelectorAll('#isiPertanyaan input[type=submit], #isiPertanyaan button'))
        .find(btn => btn.value?.toLowerCase().includes('kirim') || btn.innerText.toLowerCase().includes('kirim'));

      if (kirimBtn) {
        console.log(`Mengirim polling ke-${i + 1}...`);
        kirimBtn.click();
        await new Promise(r => setTimeout(r, waktuTungguSetelahIsi));
      } else {
        console.warn("Tombol kirim tidak ditemukan");
      }
    } else {
      console.log(`Polling ke-${i + 1} sudah diisi, lanjut`);
    }
  }

  alert("Semua kuisioner sudah diisi otomatis ✅");
}

isiSemuaPolling();
