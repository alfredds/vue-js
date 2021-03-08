//tag an array of posts
//create a new tag set(so no duplicate)
// add a tags of each post to the tag set
// return a single array of tags based on the set

import {ref} from 'vue'

//masukan fungsi posts untuk nilai setiap post
const useTags = (posts) => {

    //buat tags array untuk menampilkan setiap tag
    const tags = ref([])
    
    //buat set baru setiap tag, didalam set tidak ada item/tag yang duplicate ketika tag masuk didalamnya
    const tagSet = new Set()

    //buat foreach setiap post array item
    posts.forEach(item => {
        //kemudian buat foreach untuk setiap tag item dr tags
        item.tags.forEach(tag=> tagSet.add(tag))
    });

    //return value tags kedalam array seperti ini agar bukan ke db.json
    // fungsi (...)/spread syntax diawal tagSet seperti (mengopy paste nilai tag sebelumnya) + setiap tagSet
    tags.value = [...tagSet]

    return {tags}
}

export default useTags