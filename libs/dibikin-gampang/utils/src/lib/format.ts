export function formatTerbilang(n: number): string {
  let bilangan = [
    '',
    'satu',
    'dua',
    'tiga',
    'empat',
    'lima',
    'enam',
    'tujuh',
    'delapan',
    'sembilan',
    'sepuluh',
    'sebelas',
  ];
  if (n < 12) {
    return bilangan[n];
  } else if (n < 20) {
    return bilangan[n - 10] + ' belas';
  } else if (n < 100) {
    return bilangan[Math.floor(n / 10)] + ' puluh ' + bilangan[n % 10];
  } else if (n < 200) {
    return 'seratus ' + formatTerbilang(n - 100);
  } else if (n < 1000) {
    return bilangan[Math.floor(n / 100)] + ' ratus ' + formatTerbilang(n % 100);
  } else if (n < 2000) {
    return 'seribu ' + formatTerbilang(n - 1000);
  } else if (n < 1000000) {
    return (
      formatTerbilang(Math.floor(n / 1000)) +
      ' ribu ' +
      formatTerbilang(n % 1000)
    );
  } else if (n < 1000000000) {
    return (
      formatTerbilang(Math.floor(n / 1000000)) +
      ' juta ' +
      formatTerbilang(n % 1000000)
    );
  } else if (n < 1000000000000) {
    return (
      formatTerbilang(Math.floor(n / 1000000000)) +
      ' milyar ' +
      formatTerbilang(n % 1000000000)
    );
  } else if (n < 1000000000000000) {
    return (
      formatTerbilang(Math.floor(n / 1000000000000)) +
      ' trilyun ' +
      formatTerbilang(n % 1000000000000)
    );
  }
  return '';
}
export function formatTglBulanTahun(tanggal: string): {
  hari: string;
  tanggal: string;
  bulan: string;
  tahun: string;
} {
  let date = new Date(tanggal);
  let tahun = formatTerbilang(date.getFullYear());
  let bulan = date.toLocaleDateString('id-ID', { month: 'long' });
  let tgl = formatTerbilang(date.getDate());
  let hari = date.toLocaleDateString('id-ID', { weekday: 'long' });
  return {
    hari: hari,
    tanggal: tgl,
    bulan: bulan,
    tahun: tahun,
  };
}
export function formatRupiah(n: string, prefix?: string): string {
  let angkaString = n.replace(/[^,\d]/g, '').toString();
  let split = angkaString.split(',');
  let sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  let ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  if (ribuan) {
    let separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }
  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
}
