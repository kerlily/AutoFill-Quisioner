(() => {
  const links = Array.from(document.querySelectorAll('#dataPolling a[href^="javascript:isiPolling"]'));
  let i = 0;

  function klikPollingBerikutnya() {
    if (i >= links.length) {
      alert("✅ Semua polling sudah dibuka.");
      return;
    }
    links[i++].click();

    // Tunggu form muncul dulu sebelum klik berikutnya
    setTimeout(() => {
      isiFormPolling();
      setTimeout(klikPollingBerikutnya, 1000); // Delay antar polling
    }, 1000);
  }

  function isiFormPolling() {
    // Centang semua radio dengan value=5
    document.querySelectorAll('#isiPertanyaan input[type="radio"]').forEach(radio => {
      if (radio.value === "4") {
        radio.checked = true;
      }
    });

    // Isi textarea jika ada
    document.querySelectorAll('#isiPertanyaan textarea').forEach(textarea => {
      textarea.value = "Terima kasih atas pembelajarannya.";
    });

    // Pilih opsi terakhir di dropdown jika ada
    document.querySelectorAll('#isiPertanyaan select').forEach(select => {
      select.selectedIndex = select.options.length - 1;
    });

    // Klik tombol submit jika ada
    const submit = document.querySelector('#isiPertanyaan input[type="submit"], #isiPertanyaan button[type="submit"]');
    if (submit) submit.click();
  }

  klikPollingBerikutnya();
})();
