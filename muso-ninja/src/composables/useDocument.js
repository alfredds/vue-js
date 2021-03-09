import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const useDocument = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);

  let docRef = projectFirestore.collection(collection).doc(id);

  //delete document collection
  const deleteDoc = async () => {
    isPending.value = true;
    error.value = null;
    try {
      //delete method
      const res = await docRef.delete();
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false; //ketika error tombol ga bisa diklik
      error.value = "could not delete the document";
    }
  };

  //update document collection(AddSong)
  const updateDoc = async (updates) => {
    isPending.value = true;
    error.value = null;
    try {
      //update method
      const res = await docRef.update(updates);
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false; //ketika error tombol ga bisa diklik
      error.value = "could not update the document";
    }
  };

  return { error, isPending, deleteDoc,updateDoc };
};

export default useDocument;
