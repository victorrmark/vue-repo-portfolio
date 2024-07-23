<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue'
import Paginate from './Paginate.vue'
import CreateRepo from './CreateRepo.vue'
import 'css-skeletons'

const props = defineProps(['data'])

const currentPage = ref(1)
const reposPerPage = ref(4)
const searchTerm = ref('')
const showModal = ref(false)

const searchResult = computed(() => {
  if (props.data) {
    return props.data.filter((val) =>
      val.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }
})

const paginatedRepos = computed(() => {
  const start = (currentPage.value - 1) * reposPerPage.value
  const end = start + reposPerPage.value
  return searchResult.value.slice(start, end)
})

const totalPages = computed(() => {
  if (props.data) {
    return Math.ceil(props.data.length / reposPerPage.value)
  }
})

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString()
}

function updatePage(page) {
  currentPage.value = page
}

function toggleModal() {
  showModal.value = !showModal.value
}

watch(currentPage, (newValue) => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="container" v-if="data">
    <div class="head">
      <input type="text" v-model="searchTerm" placeholder="Find a repository..." />
      <button @click="toggleModal">New Repo</button>

      <CreateRepo v-if="showModal" @toggleModal="toggleModal" />
    </div>

    <p v-if="searchResult.length === 0" class="search">
      0 result for repositories matching <b>{{ searchTerm }}</b>
    </p>

    <div class="main">
      <div v-for="repo in paginatedRepos" :key="repo.id" class="box">
        <div class="repo-name">
          <RouterLink :to="{ name: 'Details', params: { id: repo.name } }">
            {{ repo.name.toUpperCase() }}
          </RouterLink>
          <span>{{ repo.visibility }}</span>
        </div>

        <p>{{ repo.description }}</p>

        <div class="info">
          <p class="language" v-if="repo.language">
            <span v-if="repo.language === 'HTML'" :style="{ background: 'red' }"></span>
            <span v-else-if="repo.language === 'CSS'" :style="{ background: 'purple' }"></span>
            <span
              v-else-if="repo.language === 'JavaScript'"
              :style="{ background: 'yellow' }"
            ></span>
            <span v-else :style="{ background: 'green' }"></span>
            {{ repo.language }}
          </p>
          <span>Updated on {{ formatDate(repo.updated_at) }}</span>
        </div>
      </div>
    </div>
    <Paginate :currentPage="currentPage" :totalPages="totalPages" @updatePage="updatePage" />
  </div>

  <div v-else>
    <div
      class="skeleton skeleton-line"
      style="--lines: 4; --c-w: 100%; --l-gap: 30px; --l-h: 90px"
    ></div>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  flex-direction: column-reverse;
  row-gap: 20px;
  align-content: center;
}

input {
  /* outline: 1px solid #ccc; */
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 8px;
}

input:focus {
  outline-color: #2563eb;
}

.head button {
  background: #1c8139;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 500;
  color: #fff;
  padding: 8px 10px;
  font-size: 1.5rem;
}

.head button:hover {
  background: #197433;
}

.main {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  color: #636c76;
  font-size: 1.6rem;
}

.search {
  border-top: 2px solid #ccc;
  margin-top: 20px;
  padding-top: 20px;
}

.box {
  padding: 40px 0;
  border-top: 1px solid #ccc;
}

.box:first-of-type {
  border-top: none;
}

.repo-name {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.repo-name + p{
  margin-top: 10px;
}

.repo-name a {
  color: #0969da;
  font-weight: 700;
  font-size: 1.6rem;
  margin-right: 10px;
}

.repo-name a:hover{
  text-decoration: underline;
}

.repo-name span {
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 3px 7px;
  font-weight: 500;
}

.language span {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  display: inline-block;
  margin-right: 5px;
}

.info {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

@media (min-width: 768px) {
  .head {
    flex-direction: row;
    column-gap: 20px;
    align-items: center;
  }
}
</style>
