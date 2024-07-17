<script setup>
  import { computed, onMounted, ref } from 'vue'
  import dataFetch from '../assets/dataFetch'
  import RepoList from '../components/RepoList.vue';
  import Bio from '../components/Bio.vue'

  const {data, error, getData} = dataFetch("https://api.github.com/users/victorrmark/repos")


  onMounted(()=>{
    getData()
  })

  const reloadPage = () => {
    location.reload()
  }
  
</script>

<template>
  <main>
    <Bio/>

    <div>
      <div v-if="error" class="error">
        {{ error }}. Check your internet and <a href="javascript:void()" @click="reloadPage">reload</a> the page
      </div>
      <RepoList  :data="data" />
    </div>

  </main>
</template>

<style scoped>

.error{
  font-size: 1.8rem;
  text-align: center;
}

.error a{
  color: blue;
  font-style: italic;
}

.error a:hover{
  text-decoration: underline;
}

@media (min-width: 768px) {
  main{
    display: grid;
    grid-template-columns: 35% 60%;
    column-gap: 20px;
  }
}
  
</style>
