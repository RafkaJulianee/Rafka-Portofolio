const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const buttons = document.querySelectorAll('.ask-btn');
const timeNow = document.getElementById('time');

function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  timeNow.textContent = `${hours}:${minutes}`;
}
updateTime();

const answers = {
  nama: "Nama saya Rafka Julian Pratama.",
  usia: "Usia saya 16 tahun.",
  umur: "Usia saya 16 tahun.",
  lahir: "Saya lahir 6 Juli 2009.",
  tanggal: "Saya lahir 6 Juli 2009.",
  sekolah: "Saya sekolah di SMKN 1 Kawali.",
  smp: "Saya pernah sekolah di SMPN 1 Kawali.",
  sd: "Saya pernah sekolah di SDN 1 Dayeuhluhur.",
  hobby: "Hobi saya bermain sepak bola.",
  hobi: "Hobi saya bermain sepak bola.",
  kemampuan: "Saya bisa desain grafis, UI/UX, dan web programming.",
  tinggi: "Tinggi saya 163 cm.",
  berat: "Berat badan saya 65 kg.",
  tinggal: "Saya tinggal di Ciamis, Kecamatan Jatinagara, Desa Dayeuhluhur.",
  alamat: "Saya tinggal di Ciamis, Kecamatan Jatinagara, Desa Dayeuhluhur."
};

function addMessage(message, from = 'bot') {
  const msg = document.createElement('div');
  msg.className = from === 'bot' ? 'bot-msg' : 'user-msg';
  msg.textContent = message;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(text) {
  text = text.toLowerCase();
  for (let key in answers) {
    if (text.includes(key)) return answers[key];
  }
  return "Maaf, saya belum mengerti pertanyaan itu. Coba yang lain ya!";
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;
  addMessage(input, 'user');
  const response = getBotResponse(input);
  setTimeout(() => addMessage(response, 'bot'), 500);
  userInput.value = '';
});

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.textContent;
    addMessage(input, 'user');
    const response = getBotResponse(input);
    setTimeout(() => addMessage(response, 'bot'), 500);
  });
});
