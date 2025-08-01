document.addEventListener('DOMContentLoaded', function () {
    const kontainerChat = document.getElementById('kontainerChat');
    const pesanChat = document.getElementById('pesanChat');
    const inputPesan = document.getElementById('inputPesan');
    const tombolKirim = document.getElementById('tombolKirim');
    const opsiCepat = document.getElementById('opsiCepat')
    const waktuSekarang = document.getElementById('waktuSekarang');

    // Perbarui waktu
    function perbaruiWaktu() {
        const sekarang = new Date();
        const jam = sekarang.getHours().toString().padStart(2, '0');
        const menit = sekarang.getMinutes().toString().padStart(2, '0');
        waktuSekarang.textContent = `${jam}:${menit}`;
    }

    perbaruiWaktu();
    setInterval(perbaruiWaktu, 60000); // update tiap menit

    const jawaban = {
        "nama kamu siapa?": "Nama saya Rafka Julian Pratama.",
        "drakor": "Ya, saya suka menonton drakor. Drakor favorit saya adalah Duty After School dan masih banyak lagi.",
        "usia kamu berapa?": "Usia saya 16 tahun.",
        "anime": "Ya, saya suka menonton anime. Anime favorit saya adalah Bleach, Naruto, Demon Slayer, dan lainnya.",
        "panggi": "Kamu bisa memanggil saya Rafka.",
        "tahun tanggal lahir?": "Saya lahir 6 Juli 2009.",
        "sekolah dimana?": "Saya sekolah di SMKN 1 Kawali.",
        "hobby?": "Hobi saya bermain sepak bola.",
        "kamu smp dimana?": "Saya pernah sekolah di SMPN 1 Kawali.",
        "sd kamu dimana?": "Saya pernah sekolah di SDN 1 Dayeuhluhur.",
        "kemampuan kamu apa?": "Saya bisa desain grafis, UI/UX, dan web programming.",
        "tinggi kamu berapa?": "Tinggi saya 163 cm.",
        "berat badan kamu berapa?": "Berat badan saya 65kg.",
        "kamu tinggal dimana": "Saya tinggal di Ciamis, Kecamatan Jatinagara, Desa Dayeuhluhur.",
        "halo": "Halo! Ada yang bisa saya bantu?",
        "apakah kamu main mobile legends?": "Ya, saya suka bermain Mobile Legends. Nickname saya juliann. Nanti mabar ya!",
        "hai": "Hai! Ada yang perlu ditanyakan?",
        "warnafavoritkesukaan?": "Warna favorit saya adalah ungu.",
        "club bola kesukaan?": "Club bola favorit saya adalah Liverpool.",
        "pemain bola favorit?": "Pemain bola favorit saya adalah Son Heung Min.",
        "makanan favorit?": "Saya suka makan sate.",
        "bagaimana cara menghubungi anda?": "Anda bisa menghubungi saya melalui ikon sosial media di portofolio saya.",
        "assalamualaikum": "Waalaikumsalam! Ada yang bisa saya bantu?",
        "premium": "Versi premium saya memiliki fitur tambahan seperti tema ungu eksklusif dan kemampuan lebih canggih!",
        "fitur": "Saya bisa menjawab berbagai pertanyaan tentang Rafka. Tanyakan tentang hobi, pendidikan, atau kemampuan saya!",
        "default": "Maaf, saya belum mengerti pertanyaan Anda. Silakan tanyakan hal lain."
    };

    function tambahPesan(teks, dariPengguna = false) {
        const elemenPesan = document.createElement('div');
        elemenPesan.classList.add('message');
        elemenPesan.classList.add(dariPengguna ? 'user-message' : 'bot-message');
        elemenPesan.textContent = teks;
        pesanChat.appendChild(elemenPesan);

        const pesanSelamatDatang = document.querySelector('.welcome-message');
        if (pesanSelamatDatang) {
            pesanSelamatDatang.remove();
        }

        pesanChat.scrollTop = pesanChat.scrollHeight;
    }

    function cariJawabanTerbaik(pesan) {
        const pesanKecil = pesan.toLowerCase();

        for (const kunci in jawaban) {
            if (pesanKecil.includes(kunci.toLowerCase())) {
                return jawaban[kunci];
            }
        }

        const kataKunci = {
            "nama": "Nama saya Rafka Julian Pratama.",
            "malam": "Malam juga!",
            "pagi": "Selamat pagi!",
            "siang": "Siang juga!",
            "sore": "Sore juga!",
            "kenapa masuk rpl": "Saya ingin mengembangkan bakat saya di bidang pengembangan aplikasi dan web.",
            "makanan": "Saya suka makan sate.",
            "menghubungi": "Anda bisa menghubungi saya melalui ikon sosial media di portofolio saya.",
            "usia umur": "Usia saya 16 tahun.",
            "mobile legends": "Ya, saya suka bermain Mobile Legends. Nickname saya juliann. Nanti mabar ya!",
            "umur": "Usia saya 16 tahun.",
            "lahir": "Saya lahir 6 Juli 2009.",
            "sekolah": "Saya sekolah di SMKN 1 Kawali.",
            "hobi": "Hobi saya bermain sepak bola.",
            "smp": "Saya pernah sekolah di SMPN 1 Kawali.",
            "sd": "Saya pernah sekolah di SDN 1 Dayeuhluhur.",
            "bahasa pemrograman yang digunakan": "Saya menggunakan HTML, CSS, JavaScript, dan PHP untuk web development. Saya juga bisa Python untuk data science.",
            "kemampuan skil skills bisa": "Saya bisa desain grafis, UI/UX, dan web programming.",
            "tinggi": "Tinggi saya 163 cm.",
            "berat": "Berat badan saya 65kg.",
            "tinggal": "Saya tinggal di Ciamis, Kecamatan Jatinagara, Desa Dayeuhluhur.",
            "alamat": "Saya tinggal di Ciamis, Kecamatan Jatinagara, Desa Dayeuhluhur.",
            "halo": "Halo! Ada yang bisa saya bantu?",
            "hai": "Hai! Ada yang perlu ditanyakan?",
            "assalamualaikum": "Waalaikumsalam! Ada yang bisa saya bantu?"
        };

        for (const kunci in kataKunci) {
            if (pesanKecil.includes(kunci)) {
                return kataKunci[kunci];
            }
        }

        return jawaban.default;
    }

    function prosesPesanPengguna(pesan) {
        if (!pesan.trim()) return;

        tambahPesan(pesan, true);

        setTimeout(() => {
            const balasan = cariJawabanTerbaik(pesan);
            tambahPesan(balasan);
        }, 500);
    }

    tombolKirim.addEventListener('click', () => {
        const pesan = inputPesan.value.trim();
        if (pesan) {
            prosesPesanPengguna(pesan);
            inputPesan.value = '';
            inputPesan.focus();
        }
    });

    inputPesan.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const pesan = inputPesan.value.trim();
            if (pesan) {
                prosesPesanPengguna(pesan);
                inputPesan.value = '';
            }
        }
    });

    opsiCepat.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-option')) {
            const pertanyaan = e.target.dataset.question;
            prosesPesanPengguna(pertanyaan);
        }
    });

    inputPesan.focus();
});
