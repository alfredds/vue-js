<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New Playlist</h4>
        <input type="text" required placeholder="Playlist title" v-model="title">
        <textarea required placeholder="Playlist description..." v-model="description"></textarea>
        
        <!-- upload playlist image -->
        <label>Upload playlist cover image</label>
        <input type="file" @change="handleChange">
        <div class="error">{{ fileError }}</div>
        <button v-if="!isPending">Create</button>
        <button v-else disabled>Loading..</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import getUser from '@/composables/getUser' //get current user ID
import useStorage from '@/composables/useStorage' //use storage(doc,img,video,song) firebase
import useCollection from '@/composables/useCollection' //create,write and read database method for firebase
import { timestamp } from '@/firebase/config' //order playlist by date and time
import { useRouter } from "vue-router"

export default {
    setup() {
        //useStorage composabeles
        const { url, filePath, uploadImage } = useStorage()
        const {error, addDoc } = useCollection('playlists') //create name 'playlists' in database collection firebase
        const { user } = getUser() 

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)
        const router = useRouter()

        const handleSubmit = async() => {
            if(file.value) {
                //pending state (jalankan saat asynchronus berjalan)
                isPending.value = true

                await uploadImage(file.value) //image storage
                //console.log('image uploaded, url : ' ,url.value)
                //add title, desc, user, cover, path, song, waktu(createdAt), upload to database collection
                const res = await addDoc({
                    title: title.value, 
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    songs: [],
                    createdAt: timestamp()
                    })

                    //ketika asynchronus selesai dijalankan
                    isPending.value = false
                    //check document upload
                    if(!error.value) {
                        console.log('playlist added')
                        //this push method berdasarkan respon document setiap id
                        router.push({name: 'PlaylistDetails', params: { id: res.id}})
                    }
            }
        }

        //allowed file type. choosen file upload(dlm array)
        const types = ['image/png', 'image/jpeg', 'image/svg+xml', "image/bmp"]

        //event listener untuk upload file gambar
        const handleChange = (e) => {
            const selected = e.target.files[0]
            console.log(selected)

            //reset value ketika di cancel menjadi null bukan undifined
            // ketika data (tipe nya tidak sesuai jgn di upload)
            if(selected && types.includes(selected.type)){
                file.value = selected
                fileError.value = null //ketika data yang dipilih sesuai
            } else {
                file.value = null
                fileError.value = 'Please select an image file(bmp, png, jpeg, or svg)'
            }
        }

        return { title, description, handleSubmit, handleChange, fileError,isPending }
    }
}
</script>

<style>
    input[type="file"] {
        border: 0;
        padding: 0;
    }
    label {
        font-size: 12px;
        display: block;
        margin-top: 30px;
    }
    button {
        margin-top: 20px;
    }
</style>