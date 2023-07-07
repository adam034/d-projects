export const WelcomeMessage = (username: string) => {
  const headerMessage =
    '\n\nJika kamu belum punya akun,daftar dulu yah dengan ketik /daftar. terimakasih';
  const generate = `\nketik /generate, kemudian masukkan nama sheet yang sudah di buat. setelah itu, file akan tergenerate`;
  const wrapMessages = `*HALO KAK ${username}, SELAMAT DATANG DI LAYANAN DibikinGampang.*${headerMessage}${generate}`;
  return wrapMessages;
};
