<script setup>
import { onMounted, ref , watch} from 'vue';
import Quill from 'quill';
import { UserStore } from '../stores/UserStore'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {CreateBlog} from '../Helpers/APIs/BlogAPIs'
import Alert from './Alert.vue'
import router from '../router';


const userStore = UserStore();
const BlogTitle = ref('');
const delta = ref(null);
const error = ref([]);
let quill;
onMounted(()=>{
    quill = new Quill(document.querySelector('#editor'), {
        modules: {
          toolbar: [
            // adding some basic Quill content features
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
          ],
          history: {
            // Local undo shouldn't undo changes
            // from remote users
            userOnly: true
          }
        },
        placeholder: 'WRITE YOUR BLOG!',
        theme: 'snow' // 'bubble' is also great
      }
      )
        delta.value = quill.getContents();
})
const wtv = ref('');
const PublishHandler=async ()=>{
    error.value = [];
    if (BlogTitle.value==""){
        error.value.push("Title shouldn't be empty!")
        return;
    }
    if (quill.getLength() ==1){
        error.value.push("Blog Content shoudn't be empty!")
        return;
    }
    const del = quill.getContents();
    // console.log (userStore.UserID);
    // CreatedBy, BlogTitle , BlogDetails , BlogDetailsHTML , CreatedAt
    const data ={
        CreatedBy: userStore.UserID,
        BlogTitle: BlogTitle.value,
        BlogDetails: JSON.parse(JSON.stringify(del)),
        BlogDetailsHTML: quill.root.innerHTML,
        CreatedAt: Date.now()
    }
    console.log (quill.root.innerHTML)
    wtv.value = quill.root.innerHTML
    const res = await CreateBlog(data);
    console.log (res.data.BlogId);
    router.push ({
        name: 'Blog',
        params: {
            BlogId: res.data.BlogId,
        }
    })
    
    console.log (res);
}

</script>

<template>
    <div class="card bg-Yellow w-10/12 rounded-none border border-2 border-black relative shadow-BoxDropBlack mx-auto my-10 click:shadow-none transition-all duration-150 ease-in-out">
        <div class="absolute left-0 top-0">
            <div class="avatar h-16 absolute">
                <div class="w-48 h-48 border-2 transition-all duration-150 ease-in-out border-black shadow-BoxBlackSm hover:translate-x-[0.45rem] hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none hover:border-t-0 hover:border-l-0">
                    <img :src='userStore.image' />
                </div>
            </div>
        </div>
        <div class="card-body items-start text-left ml-48">
            <div class="card w-fit rounded-none border-2 transition-all duration-150 ease-in-out border-black bg-main1 hover:shadow-BoxBlackSm">
                <h2 class="text-xl font-bold font-Inter text-black leading-10 px-3 "><span class="opacity-95">As </span>{{ userStore.Fname + " " + userStore.Lname +':'}}</h2>
            </div>
            <h2 class="text-4xl font-bold font-Inter leading-10	text-black">Please write your blog title:</h2>
            <h3 class="text-base font-semibold text-Alert"><spam class="font-extrabold">Tip:</spam> Make it nancy!</h3>
            <input type="text" placeholder="BlogTitle.." class="input w-full w-9/12 rounded-2 border border-2 border-black max-w-3xl" v-model="BlogTitle"/>
        </div>
        <div class="card-body items-start text-left self-center w-10/12 px-0">
            <h2 class="text-4xl font-bold font-Inter leading-10	text-black ">Write your blog content:</h2>
            <figure class="w-full pt-1 mx-auto">
                <div class="min-w-[30rem] w-full min-h-[24rem] max-h-[24rem] h-fit card bg-white rounded-2 border border-2 border-black" >
    
                    <div id="editor" class="rounded-2 h-full overflow-y-auto"></div>
                </div>
            </figure>
        </div>
        <!-- <div class="card-body items-start text-left w-10/12 self-center px-0 ">
            <div class="flex flex-row justify-between w-full">
                <div class="max-w-[50%]">
                    <h2 class="text-4xl font-bold font-Inter leading-10	text-black">Write your post hashtags:</h2>
                    <h3 class="text-base font-semibold text-Alert"><spam class="font-extrabold">Tip:</spam> Use accurate ones!</h3>
                    <input type="text" placeholder="Hashtags" class="input w-full rounded-2 border border-2 border-black mb-5 self-center max-w-sm" v-model="HashtagValue" @keyup.enter="Hashtags_Handler"/>
                    <div class="card bg-white rounded-[0.5rem] border-2 border-black p-2 flex flex-row flex-wrap mb-4 max-w-sm" v-if="HashtagsArr.length !=0">
                        <template v-for="(item, index) in HashtagsArr" :key="index">
                            <button class="btn btn-sm w-fit m-2 border-none font-light" :[key]="index" :class="[index%2? 'bg-main3' : 'bg-main1']" @click="RemoveHashtag(index)">{{ item }}</button>
                        </template>
                    </div>
                </div>
                <div class="max-w-[50%] w-4/12 mr-10">
                    <h2 class="text-4xl font-bold font-Inter leading-10	text-black mb-5">Any Attachments?</h2>
                    <input type="file" ref="Attachments" @change="UplodHandler" class="file-input file-input-bordered border-2 border-black self-center mb-5 " />
                    <div class="card bg-white rounded-[0.5rem] border-2 border-black p-2 flex flex-row flex-wrap mb-4 max-w-sm" v-if="AttachmentsArr.length !=0">
                        <template v-for="(item, index) in AttachmentsArr" :key="index">
                            <button class="btn btn-sm w-fit m-2 border-none font-light" :[key]="index" :class="[index%2? 'bg-main3' : 'bg-main1']" @click="RemoveAttachment(index)">{{ item[0].name}}</button>
                        </template>
                    </div>
                </div>
            </div>
        </div> -->
        <Alert class="w-1/2 mx-auto mb-10" classProp="alert-error"  v-if="error.length !=0"><template #Error_Message>{{ error[0] }}</template></Alert>
        <div class="form-control w-10/12 mb-10 self-center">
            <div class="self-center">
                <button class="btn mx-2 bg-Alert border-none btn-lg hover:shadow-BoxBlackSm" @click="router.go(-1)">Cancel</button>
                <button class="btn mx-2 bg-main3 border-2 border-black tracking-wider text-xl btn-lg hover:shadow-BoxBlackSm" @click="PublishHandler">Publish!</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Styling for Quill editor */
    .ql-editor {
        min-height: 700px;
        width: 100%;
    }
    .ql-container.ql-snow  { border: none !important;}
    .ql-toolbar .ql-snow {
        border: none !important;
    }
</style>