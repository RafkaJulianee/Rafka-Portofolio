document.addEventListener('DOMContentLoaded', function () {

    const chatContainer = document.getElementById('chat-container');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const quickOptions = document.getElementById('quick-options');
    const currentTime = document.getElementById('current-time');

    // update waktu
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        currentTime.textContent = `${hours}:${minutes}`;
    }

    updateTime();
    setInterval(updateTime, 60000); //menit
    const responses = {
        "nama kamu siapa?": "Nama saya Rafka Julian Pratama.",
        "drakor": "Ya, saya suka menonton drakor. Drakor favorit saya adalah Dutty After Scholl dan masih banyak lagi'.",
        "usia kamu berapa?": "Usia saya 16 tahun.",
        "anime": "Ya, saya suka menonton anime. Anime favorit saya adalah Bleach, Naruto,Demon Slayer, dan masih banyak lagi.",
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
        "apakah kamu main mobile legends?": "Ya, saya suka bermain Mobile Legends,Nickname Mobile Legends saya juliann.Nanti Mabar Ya!",
        "hai": "Hai! Ada yang perlu ditanyakan?",
        "warnafavoritkesukaan?": "Warna favorit saya adalah ungu.",
        "club bola kesukaan?": "Club bola favorit saya adalah Liverpool.",
        "pemain bola favorit?": "Pemain bola favorit saya adalah Son heung min.",
        "makanan favorit?": "Saya suka makan Sate.",
        "bagaimana cara menghubungi anda?": "Anda bisa menghubungi saya Melalui icon sosial media yang ada di portofolio",
        "assalamualaikum": "Waalaikumsalam! Ada yang bisa saya bantu?",
        "premium": "Versi premium saya memiliki fitur-fitur tambahan seperti tema ungu eksklusif dan kemampuan yang lebih canggih!",
        "fitur": "Saya bisa menjawab berbagai pertanyaan tentang Rafka. Tanyakan tentang hobi, pendidikan, atau kemampuan saya!",
        "default": "Maaf, saya belum mengerti pertanyaan Anda. Silakan tanyakan hal lain."
    };

    // Tambah pesan ke chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);

        // Hapus pesan selamat datang setelah interaksi pertama
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }

        // Scroll ke bawah
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Fungsi untuk mencari jawaban terbaik
    function findBestResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Coba cari kecocokan langsung
        for (const key in responses) {
            if (lowerMessage.includes(key.toLowerCase())) {
                return responses[key];
            }
        }

        // Jika tidak ditemukan, cari berdasarkan kata kunci
        const keywords = {
            "nama": "Nama saya Rafka Julian Pratama.",
            "malam": "Malam Juga!",
            "pagi": "Selamat Pagi!",
            "siang": "Siang Juga!",
            "sore": "Sore Juga!",
            "makanan": "Saya suka makan Sate.",
            "menghubungi": "Anda bisa menghubungi saya Melalui icon sosial media yang ada di portofolio.",
            "usia umur": "Usia saya 16 tahun.",
            "mobile legends": "Ya, saya suka bermain Mobile Legends,Nickname Mobile Legends saya juliann.Nanti Mabar Ya!",
            "umur": "Usia saya 16 tahun.",
            "lahir": "Saya lahir 6 Juli 2009.",
            "sekolah": "Saya sekolah di SMKN 1 Kawali.",
            "hobi": "Hobi saya bermain sepak bola.",
            "smp": "Saya pernah sekolah di SMPN 1 Kawali.",
            "sd": "Saya pernah sekolah di SDN 1 Dayeuhluhur.",
            "bahasa pemrograman yang di gunakan": "Saya menggunakan HTML, CSS, dan JavaScript Php untuk web development.Saya Juga bisa Python Untuk Data Science.",
            "kemampuan skil skills bisa": "Saya bisa desain grafis, UI/UX, dan web programming.",
            "tinggi": "Tinggi saya 163 cm.",
            "berat": "Berat badan saya 65kg.",
            "tinggal": "Saya tinggal di Ciamis, Kecamatan Jatinagara, Desa Dayeuhluhur.",
            "alamat": "Saya tinggal di Ciamis, Kecamatan Jatinagara, Desa Dayeuhluhur.",
            "halo": "Halo! Ada yang bisa saya bantu?",
            "hai": "Hai! Ada yang perlu ditanyakan?",
            "assalamualaikum": "Waalaikumsalam! Ada yang bisa saya bantu?"
        };

        for (const key in keywords) {
            if (lowerMessage.includes(key)) {
                return keywords[key];
            }
        }

        return responses.default;
    }

    // Proses pesan pengguna
    function processUserMessage(message) {
        if (!message.trim()) return;

        addMessage(message, true);

        // Beri jeda sebelum bot membalas
        setTimeout(() => {
            const response = findBestResponse(message);
            addMessage(response);
        }, 500);
    }

    // Kirim pesan saat tombol diklik
    sendBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            processUserMessage(message);
            messageInput.value = '';
            messageInput.focus();
        }
    });

    // Kirim pesan saat tekan Enter
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = messageInput.value.trim();
            if (message) {
                processUserMessage(message);
                messageInput.value = '';
            }
        }
    });

    // Opsi cepat
    quickOptions.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-option')) {
            const question = e.target.dataset.question;
            processUserMessage(question);
        }
    });

    // Fokus ke input saat halaman dimuat
    messageInput.focus();
});