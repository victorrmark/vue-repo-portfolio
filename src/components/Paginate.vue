<template>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button 
        v-for="number in totalPages" 
        :key="number" 
        @click="changePage(number)"
        :class="currentPage === number ? 'active' : '' "
      > 
          {{ number }} 
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
</template>
  
<script setup>
  import {defineEmits } from 'vue'

  const emits = defineEmits(['updatePage'])

  const props = defineProps(['currentPage', 'totalPages'])
 
  const nextPage = ()=> {
    emits('updatePage', props.currentPage + 1);
  }

  const prevPage = () => {
    emits('updatePage', props.currentPage - 1);
  }

  const changePage =(page)=>{
    emits('updatePage', page);
  }
</script>
  
<style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: center;
    align-content: center;
    align-items: center;
    max-width: 550px;
    margin: 50px auto 0;
    
  }
  
  button{
    background: #edf2f7;
    padding: 8px 14px;
    border-radius: 6px;
    border: none;
  }
  
  button:hover{
    background: #c4c5c7;
    cursor: pointer;
  }

  button:active {
  background-color: #3b82f6;
  font-weight: bold;
  }

  button:disabled {
    background-color: #e5e7eb;
    cursor: not-allowed;
    color: #9ca3af;
  }

  button.active:hover {
    background-color: #3b82f6;
  }

  button.active {
    background-color: #3b82f6;
    color: white;
  }
</style>
  