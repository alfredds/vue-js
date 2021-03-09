// penggunaan storage untuk membuat playlist (createPlaylist.vue)
import { projectStorage } from "../firebase/config";
import { ref } from "vue";
import getUser from "./getUser";

//ketika user log in dapat mengupload image
const { user } = getUser();

const useStorage = () => {
  const error = ref(null);

  //untuk membuat url di firebase
  const url = ref(null);
  const filePath = ref(null);

  //untuk upload file image(fungsi const ref file ada di playlist)
  const uploadImage = async (file) => {
    //karena user bentuk nya ref(cek const user di getUser.js) maka menggunakan value
    filePath.value = `covers/${user.value.uid}/${file.name}`; //mebuat file path bedasarkan unique user id
    const storageRef = projectStorage.ref(filePath.value); //reference storage

    try {
      //upload image method
      const res = await storageRef.put(file);
      //access publicUrl(for download url )
      url.value = await res.ref.getDownloadURL();
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  //delete image UserId folder
  const deleteImage = async (path) => {
    const storageRef = projectStorage.ref(path);

    try {
      await storageRef.delete();
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return { error, url, filePath, uploadImage, deleteImage };
};

export default useStorage;
