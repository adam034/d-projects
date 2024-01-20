import { Data, Response } from './types';
import { gSheetConnector } from '@d-projects/dibikin-gampang/connectors';
import { formatTerbilang, formatRupiah, formatTglBulanTahun } from './format';

export async function loadDocument(
  sheet: string,
  sheetId: string,
  clientEmail: string,
  privateKey: string
): Promise<Response> {
  const rows: Data = {
    items: [],
    temp: [],
  };
  const load = await gSheetConnector(sheetId, clientEmail, privateKey);
  const workspace = load.sheetsByTitle[`${sheet}`];
  if (workspace === undefined) {
    return {
      message: 'sheet not found',
      status: 404,
      data: null,
    };
  }
  const test = await workspace.getRows();
  const rowChat = (await workspace.getRows()).filter(
    (r) => r.kode_berkas === 'spj'
  );
  for (let i: number = 0; i < rowChat.length; i++) {
    if (i === 0) {
      rows['kode_sub_kegiatan'] = rowChat[i].kode_sub_kegiatan;
      rows['nama_sub_kegiatan'] = rowChat[i].nama_sub_kegiatan;
      rows['kode_belanja'] = rowChat[i].kode_belanja;
      rows['nama_belanja'] = rowChat[i].nama_belanja;
      rows['nama_penyedia'] = rowChat[i].nama_penyedia;
      rows['nama_toko'] = rowChat[i].nama_toko;
      rows['alamat'] = rowChat[i].alamat;
      rows['tanggal_pesanan'] = `${
        formatTglBulanTahun(rowChat[i].tanggal_pesanan).tanggal
      } ${formatTglBulanTahun(rowChat[i].tanggal_pesanan).bulan} ${
        formatTglBulanTahun(rowChat[i].tanggal_pesanan).tahun
      }`;
      rows['tanggal_Kontrak'] = rowChat[i].tanggal_Kontrak;
      rows['tanggal_tersedia'] = `${
        formatTglBulanTahun(rowChat[i].tanggal_tersedia).tanggal
      } ${formatTglBulanTahun(rowChat[i].tanggal_tersedia).bulan} ${
        formatTglBulanTahun(rowChat[i].tanggal_tersedia).tahun
      }`;
      rows['no_pptk_ppkm'] = rowChat[i].no_pptk_ppkm;
      rows['no_ppkm_ppbj'] = rowChat[i].no_ppkm_ppbj;
      rows['no_kontrak'] = rowChat[i].no_kontrak;
      rows['no_bast_ppkm'] = rowChat[i].no_bast_ppkm;
      rows['no_bast_ppkm2'] = rowChat[i].no_bast_ppkm2;
      rows['no_bast_pb'] = rowChat[i].no_bast_pb;
      rows['kode_rup'] = rowChat[i].kode_rup;
      rows['kode_rup'] = rowChat[i].kode_rup;
      rows['terbilang_tanggal_pesanan'] = formatTglBulanTahun(
        rowChat[i].tanggal_pesanan
      ).tanggal;
      rows['terbilang_hari_pesanan'] = formatTglBulanTahun(
        rowChat[i].tanggal_pesanan
      ).hari;
      rows['terbilang_bulan_pesanan'] = formatTglBulanTahun(
        rowChat[i].tanggal_pesanan
      ).bulan;
      rows['terbilang_tahun_pesanan'] = formatTglBulanTahun(
        rowChat[i].tanggal_pesanan
      ).tahun;
      rows['terbilang_tanggal_tersedia'] = formatTglBulanTahun(
        rowChat[i].tanggal_tersedia
      ).tanggal;
      rows['terbilang_hari_tersedia'] = formatTglBulanTahun(
        rowChat[i].tanggal_tersedia
      ).hari;
      rows['terbilang_bulang_tersedia'] = formatTglBulanTahun(
        rowChat[i].tanggal_tersedia
      ).bulan;
      rows['terbilang_tahun_tersedia'] = formatTglBulanTahun(
        rowChat[i].tanggal_tersedia
      ).tahun;
      rows['nama_bank'] = rowChat[i].nama_bank;
      rows['no_rekening'] = rowChat[i].no_rekening;
      rows['nama_pemilik_rekening'] = rowChat[i].nama_pemilik_rekening;
      rows['no_dpp'] = rowChat[i].no_dpp;
    }
    rows.items.push({
      no: i + 1,
      daftar_belanja: rowChat[i].daftar_belanja,
      quantity: rowChat[i].quantity,
      satuan: rowChat[i].satuan,
      harga: formatRupiah(rowChat[i].harga),
      jumlah: formatRupiah(rowChat[i].jumlah),
      pagu: formatRupiah(rowChat[i].pagu),
      ket: '',
    });
    rows.temp.push({
      harga: Number(rowChat[i].harga),
      jumlah: Number(rowChat[i].jumlah),
    });
  }
  if (rows.items.length) {
    let total = rows.temp.reduce((acc, rows) => {
      return acc + rows.jumlah;
    }, 0);
    rows['total_jumlah'] = formatRupiah(total.toString());
    rows['terbilang_total_jumlah'] = `${formatTerbilang(total)}rupiah`;
  }
  return {
    message: 'success get data from sheet',
    status: 200,
    data: rows,
  };
}
