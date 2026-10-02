import { supabase } from './supabaseClient'

export async function getAllImages() {
    const {data, error} = await supabase
    .from('images')
    .select('*')
    
    if(error) throw error;
    return data
}

export async function deleteImage(id, fileName) {
    const {error: deleteError} = await supabase
    .from('images')
    .delete()
    .eq('id',id)
    if(deleteError) throw deleteError;

    const {error: storageError} = await supabase.storage
    .from('kush-gallery-imgs')
    .remove([fileName])
    if(storageError) throw storageError;
}

export async function addImage(img_object, img_file) {
    const {error: uploadError} = await supabase.storage
    .from('kush-gallery-imgs')
    .upload(img_object.fileName, img_file)
    if(uploadError) throw uploadError;

    const {data: urlData} = supabase.storage
    .from('kush-gallery-imgs')
    .getPublicUrl(img_object.fileName)

    img_object = {...img_object, url: urlData.publicUrl}
    const {data, error} = await supabase
    .from('images')
    .insert(img_object)
    .select()
    if(error) throw error

    return data
}

