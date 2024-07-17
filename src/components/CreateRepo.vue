<template>
  <div class="modal-backdrop">

    <div class="modal">
        <div class="header">
            <h2>Create New Repo</h2>
            <button class="closeModal" @click="closeModal">x</button>
        </div>
        <form @submit.prevent="createNewRepo">
          <div className="form-group">
            <label>Repository Name:</label>
            <input type="text" v-model="repoName" required />
          </div>
    
          <div className="form-group">
            <label>Description:</label>
            <textarea type="text" v-model="description" rows="4"></textarea>
          </div>
    
          <div className="form-group">
            <label>Private:</label>
            <select v-model="isPrivate">
              <option :value="false">No</option>
              <option :value="true">Yes</option>
            </select>
          </div>
    
          <div className="form-group">
            <label>Initialize with README:</label>
            <select v-model="autoInit">
              <option :value="false">No</option>
              <option :value="true">Yes</option>
            </select>
          </div>
    
          <button v-if="loading" disabled class="submit">Creating Repo...</button>
          <button v-else class="submit">Create Repository</button>
        </form>
        <!-- <ToastContainer /> -->
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const repoName = ref('')
const description = ref('')
const isPrivate = ref(false)
const autoInit = ref(false)
const loading = ref(false)

const emits = defineEmits(['toggleModal', 'createRepo'])

const closeModal = () =>{
    emits('toggleModal')
    repoName.value = ''
    description.value = ''
    autoInit.value = false
    isPrivate.value = false
}

const token = import.meta.env.VITE_GITHUB_TOKEN

const createNewRepo = async () => {
    loading.value = true

  const response = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: repoName.value,
      description: description.value,
      private: isPrivate.value,
      auto_init: autoInit.value,
    }),
  });

  if (response.ok) {
    const newRepo = await response.json();
    emits('createRepo', newRepo);
    loading.value = false
    alert('New Repo Created Successfully')
    closeModal();
  } else {
    alert('Error creating repository');
    loading.value = false
  }
}


</script>

<style scoped>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    .modal {
        margin: 70px auto;
        border-radius: 10px;
        width: 100%;
        max-width: 400px;
        padding: 18px 20px;
        border: 1px solid #ddd;
        background-color: #fff;
    }

    .header{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .closeModal{
        cursor: pointer;
        width: auto;
        font-weight: bold;
        color: #000;
        background-color: #fff;
        padding: 3px 7px;
        border-radius: 3px;
        border: none;
    }

    .closeModal:hover{
        background: #dbdcdd;
        cursor: pointer;
        color: #fff;
    }

    form{
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 8px;  
        outline: 1px solid #ccc;  
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .form-group input,
    .form-group textarea,
    .form-group select {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
        outline-color: #2563eb;
    }

    button.submit {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #3b82f6;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }

    button.submit:hover {
        background-color: #2a7afa;
    }

    button.submit:disabled {
        background-color: #e5e7eb;
        cursor: not-allowed;
        color: #9ca3af;
    }
</style>
