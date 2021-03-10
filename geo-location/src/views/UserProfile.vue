<template>
  <div class="profile container">
    <div class="card" v-if="profile">
      <h2 class="deep-purple-text center">{{profile.alias}}' wall</h2>
      <ul class="collection comments">
          <!-- output a comment from user -->
          <li v-for="(comment,index) in comments" :key="index">
            <div class="deep-purple-text from">{{ comment.from }}</div>
            <div class="grey-text text-darken-2 comment">{{ comment.content }}</div>
            <div class="grey-text text-darken-3 time">{{ comment.time }}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
          <div class="field">
              <label for="comment">Add a comment</label>
              <input type="text" name="comment" v-model="newComment">
              <p v-if="feedback" class='red-text center'>{{ feedback }}</p>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
import { projectFirestore, projectAuth } from "@/firebase/config";
import moment from 'moment'

export default {
  data() {
    return {
      profile: null,
      newComment: null,
      feedback: null,
      user: null,
      comments: []
    }
  },
  methods: {
      addComment() {
          //if no comment add check this
          if(this.newComment){
              this.feedback = null
           
           //create a collection('comment') to firestore(async)
           projectFirestore.collection('comments').add({
               to: this.$route.params.alias,
               from: this.user.alias,
               content: this.newComment,
               time: moment(Date.now()).format('lll')
           }).then(() => {
               //reset input field
               this.newComment = null
           })

          } else {
              this.feedback = 'u must enter a comment'
          }
      }
  },
  created() {
    //get params(id) document user (for route profile (:alias(id)))
    let ref = projectFirestore.collection('users')

    //get the current user
    ref.where('user_id', '==', projectAuth.currentUser.uid).get()
    .then(snapshot=> {
        snapshot.forEach(doc=> {
            this.user = doc.data()
            this.user.id = doc.id
        })
    })

    //profile user data(alias user)
    ref.doc(this.$route.params.alias).get()
    .then(user => {
        this.profile = user.data()
    })

    //comments (onSnapshot enter comment without refresh a page)
    projectFirestore.collection('comments').where('to', '==', this.$route.params.alias)
    .onSnapshot((snapshot)=>{
        snapshot.docChanges().forEach(change => {
            //check a user ketika user add a comment
            if(change.type == 'added') {
                //unshift add item in the beginning array(from methods addComments)
                this.comments.unshift({
                    from: change.doc.data().from,
                    content: change.doc.data().content,
                    time: change.doc.data().time
                })
            }
        })
    })
  }
};
</script>

<style>
.profile .card{
    padding: 20px;
    margin-top: 60px;
}
.profile h2 {
  margin-top: 0px;
  font-size: 2.4em;
}
.profile li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.profile .from {
  font-weight: bold; 
}
.profile .comment {
  margin-top: 4px; 
}
.profile .time {
  font-size: 0.6em;
  margin-top: 4px;
}
</style>