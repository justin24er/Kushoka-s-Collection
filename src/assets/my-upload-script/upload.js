import { supabase } from '../../services/supabaseClient';
import fs from 'fs';
import path from 'path';

const imagesFolder = './kushoka-images';
const csvRows = ['url,jina,tarehe,faili']; // kichwa cha database yetu (header)

async function uploadAll() {
    const files = fs.readdirSync(imagesFolder);

    for(const file of files) {
        const filePath = path.join(imagesFolder, file);
        const fileBuffer = fs.readFileSync(filePath);
        const fileName = `${Date.now()}-${file}`;

        // 1. upload to storage
        const { error: uploadError } = await supabase.storage
        .from('kush-gallery-imgs')
        .upload(fileName, fileBuffer, {
            contentType: 'image/jpeg/png/jpg'
        });

        // 2. Get public URL 
        const { data: urlData } = supabase.storage
        .from('kush-gallery-imgs')
        .getPublicUrl(fileName);

        // 3. Add a row to our CSV data
        const jina = file.split('.')[0]; // natumia jina la faili kama default title(jina)
        csvRows.push(`"${urlData.publicUrl}","${jina}","${}",""`)
    }
}
