import * as path from 'node:path';
import * as fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
const ROOT_PATH = path.join(process.cwd());

export async function convertToDocx(data: any) {
  delete data['temp'];

  const tmpPath = path.join(ROOT_PATH, 'template');
  const content = fs.readFileSync(`${tmpPath}/gabung.docx`);
  const zip: PizZip = new PizZip(content);
  const doc: Docxtemplater<PizZip> = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  doc.render({
    ...data,
  });

  const buf = doc.getZip().generate({
    type: 'nodebuffer',

    compression: 'DEFLATE',
  });

  fs.writeFileSync(`${tmpPath}/result.docx`, buf);

  return {
    path: `${tmpPath}/result.docx`,
  };
}
