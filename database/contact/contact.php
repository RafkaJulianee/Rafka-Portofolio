<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dataBaru = [
        "nama" => $_POST['nama'],
        "email" => $_POST['email'],
        "telepon" => $_POST['telepon'],
        "subject" => $_POST['subject'],
        "pesan" => $_POST['pesan'],
        "waktu" => date("Y-m-d H:i:s")
    ];

    $file = 'data.json';

    // Jika file belum ada, buat array kosong
    if (!file_exists($file)) {
        file_put_contents($file, json_encode([], JSON_PRETTY_PRINT));
    }

    // Baca data lama
    $dataLama = json_decode(file_get_contents($file), true);
    $dataLama[] = $dataBaru;

    // Simpan ke file lagi
    file_put_contents($file, json_encode($dataLama, JSON_PRETTY_PRINT));

    // Redirect kembali ke halaman utama atau tampilkan pesan singkat
    header("Location: ../../index.html?status=success");
    exit();
} else {
    echo "Akses tidak diizinkan.";
}
?>
