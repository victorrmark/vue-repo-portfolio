<template>
    <div class="container" >
      <div class="image">
        <img src="../assets/error-image.png" alt="" />
      </div>

      <div> 
        <h2>Page not found</h2>
        <p>The Route/Component/Page you're looking for does not exist</p>
        <p>You should propably go back to the homepage</p>
      </div>
      
      <RouterLink :to="{ name: 'Home' }">Go Home</RouterLink>

    </div>
</template>

<style scoped>

    .container{
        width: 500px;
        max-width: 100%;
        margin: 50px auto 0;
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 20px;
    }

    .image + div{
        line-height: 2;
    }

    .image{
        width: 200px;
        margin: 0 auto 20px;
    }

    img{
        width: 100%;
    }

    h2{
        font-size: 1.8rem;
        font-weight: bold;
    }

    a{
        background: #3b82f6;
        color: #fff;
        font-weight: bold;
        padding: 8px 14px;
        border-radius: 6px;
        border: none;
        margin-top: 10px;
    }

    a:hover{
        background: #367ae6;
        cursor: pointer;
    }

</style>

<script setup>
import { RouterLink } from 'vue-router'
</script>