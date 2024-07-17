<template>
  <div v-if="data" class="header">
    <div class="bio">
      <img v-if="data.avatar_url" alt="github avatar" class="avatar" :src="data.avatar_url" />
      <img v-else alt="github avatar" class="avatar" src="../assets/image.jpg" />
      <div>
        <p class="name">{{ data.name }}</p>
        <p>
          <span>{{ data.login }}</span> . <span>he/him</span>
        </p>
      </div>
    </div>
    <div class="bio-details">
      <a class="btn" :href="data.html_url">View Profile</a>
      <div class="bio-info">
        <p><a target="_blank" href="mailto:innovimark@gmail.com">innovimark@gmail.com</a></p>
        <p>
          <a target="_blank" href="https://twitter.com/victorrmark">@{{ data.twitter_username }}</a>
        </p>
        <p>
          <a
            ><b>{{ data.followers }}</b> followers</a
          >
          .
          <a
            ><b>{{ data.following }}</b> following</a
          >
        </p>
      </div>
    </div>
  </div>

  <div v-else class="header">
    <div class="skeleton skeleton-circle" style="--c-s: 80px"></div>
    <div class="skeleton skeleton-line" style="--lines: 4; --c-bg: #f8f7fc; --c-w: 100%"></div>
  </div>
</template>

<script setup>
import dataFetch from '../assets/dataFetch'
import 'css-skeletons'

const { data, getData } = dataFetch('https://api.github.com/users/victorrmark')
getData()
</script>

<style scoped>
.header {
  width: 100%;
  padding-bottom: 50px;
}

.bio {
  font-size: 1.6rem;
  flex-wrap: wrap;
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  align-items: center;
  width: 100%;
}

.avatar {
  border-radius: 100%;
  width: clamp(40px, 20%, 75px);
  /* max-width: 80px; */
  height: auto;
  outline: 1.5px solid #ccc;
}

.name {
  font-size: 2.5rem;
  font-weight: 500;
}

.name + p {
  font-size: 1.8rem;
}

.bio-details {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.bio-details > a {
  display: inline-block;
  width: 100%;
  margin-bottom: 15px;
  padding: 8px 10px;
  outline: 1px solid #ccc;
  background: #f9f9f9;
  text-align: center;
  border-radius: 5px;
}

.bio-details > a:hover {
  background: #e9e8e8;
}

.bio-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bio-info a:hover {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}

@media (min-width: 768px) {
  .bio {
    flex-direction: column;
    row-gap: 20px;
    align-items: flex-start;
    margin-bottom: 20px;
  }
  .avatar {
    border-radius: 100%;
    width: 100%;
    max-width: 300px;
    height: auto;
  }

  .bio-info p:last-child {
    margin-top: 30px;
  }

  .bio-details > a {
    border-radius: 5px;
    max-width: 300px;
  }

  header {
    padding-bottom: 0;
  }
}
</style>
