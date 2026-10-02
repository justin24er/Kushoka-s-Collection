import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cgyaunzbdgkleistagbd.supabase.co';
const supabaseKey = 'sb_publishable_NQ2mUm6AM6dqS_B91Uq_dQ_UOragN6x';

const supabase = createClient(supabaseUrl, supabaseKey);

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
            contentType: 'image/jpeg'
        });

        if(uploadError) {
            console.log(` Failed: ${file}`, uploadError.message);
            continue;
        }

        // 2. Get public URL 
        const { data: urlData } = supabase.storage
        .from('kush-gallery-imgs')
        .getPublicUrl(fileName);

        // 3. Add a row to our CSV data
        const jina = file.split('.')[0]; // natumia jina la faili kama default title(jina)
        const tarehe = file.split(/[_.]/)[1]; // nachukua tarehe ilioko kwenye filename ya picha
        csvRows.push(`"${urlData.publicUrl}","${jina}","${tarehe}","${fileName}"`)
        
        console.log(`Uploaded: ${file}`);
    }

    // 4 write everything to a CSV file
    fs.writeFileSync('images-data.csv', csvRows.join('\n'))
    console.log(' Done! check images-data.csv');
}
