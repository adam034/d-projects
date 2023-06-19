import { GoogleSpreadsheet } from 'google-spreadsheet';

export async function gSheet(
  sheetId: string,
  clientEmail: string,
  privateKey: string
) {
  const document = new GoogleSpreadsheet(sheetId);
  await document.useServiceAccountAuth({
    client_email: clientEmail,
    private_key: privateKey,
  });
  await document.loadInfo();
  return document;
}
