import { Context, Scenes } from 'telegraf';

export type Data = {
  kode_sub_kegiatan?: string;
  nama_sub_kegiatan?: string;
  kode_belanja?: string;
  nama_belanja?: string;
  nama_penyedia?: string;
  nama_toko?: string;
  alamat?: string;
  tanggal_pesanan?: string;
  tanggal_kontrak?: string;
  tanggal_tersedia?: string;
  no_pptk_ppkm?: string;
  no_ppkm_ppbj?: string;
  no_kontrak?: string;
  no_bast_ppkm?: string;
  no_bast_ppkm2?: string;
  no_bast_pb?: string;
  terbilang_hari?: string;
  terbilang_tanggal?: string;
  terbilang_bulan?: string;
  terbilang_tahun?: string;
  total_jumlah?: string;
  terbilang_total_jumlah?: string;
  items: Items[];
  temp?: TempData[];
};

export type Response = {
  message: string;
  status: number;
  data: Data[] | any;
};

type Items = {
  no: number;
  daftar_belanja: string;
  quantity: string;
  satuan: string;
  harga: string;
  jumlah: string;
  ket: string;
};

type TempData = {
  harga: number;
  jumlah: number;
};

type Update = any;

type NarrowedContext<TBase extends Context, TType> = TBase & TType;

export type CusContextCommand = NarrowedContext<
  Context<Update>,
  {
    update_id: number;
    scene: Scenes.SceneContextScene<any, Scenes.WizardSessionData>;
  }
>;

export type CusWizardScene = NarrowedContext<
  Context<Update>,
  {
    scene: Scenes.SceneContextScene<any, Scenes.WizardSessionData>;
    wizard: Scenes.WizardContextWizard<any>;
  }
>;
