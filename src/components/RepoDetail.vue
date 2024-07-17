<script setup>
    import router from '@/router';
    import dataFetch from '../assets/dataFetch'
    import 'css-skeletons'


    const props = defineProps(['id'])
    
    const {data, error, getData} = dataFetch("https://api.github.com/repos/victorrmark/" + props.id)
    
    const formatDate = (dateString) =>{
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    const goBack = () =>{
        router.go(-1)
    }
    
    getData()

</script>

<template>
    <div v-if="data" class="repo-container">
        <div class="head">
            <h2>{{data.name}}</h2>
            <a :href="data.html_url" target="_blank" class="button">
                View Repo
            </a>
        </div>

        <div class="body">
            <p>
                <b>Branch: </b>
                <span>{{data.default_branch}}</span>
            </p>
            <p>
                <b>Forks: </b>
                <span>{{data.forks}}</span>
            </p>
            <p>
                <b>Language: </b>
                <span>{{data.language}}</span>
            </p>
            <p>
                <b>Visibility: </b>
                <span>{{data.visibility}}</span>
            </p>
            <p>
                <b>Stars: </b>
                <span>{{data.stargazers_count}}</span>
            </p>
            <p>
                <b>Created: </b>
                <span>{{formatDate(data.created_at)}}</span>
            </p>

        </div>

        <div class="actn-btns">  
            <button @click="goBack">Go Back</button>
            <a v-if='data.homepage' :href="data.homepage" target="_blank" class="button">
                Live Site
            </a>

        </div>
    </div>
    <div v-else-if="error">{{error}}</div>
    <div v-else class="repo-container">
        <div 
            class="skeleton skeleton-line" 
            style="
                --lines: 4;
                --c-bg: #F8F7FC;
                --c-w: 100%;
                --l-h: 50px;
            "
        ></div>
    </div>
</template>

<style scoped>
    .repo-container{
        width: 100%;
        height: 100%;
    }

    .head{
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .head a,
    button{
        padding: 8px 10px;
        outline: 1px solid #ccc;
        background: #f9f9f9;
        text-align: center;
        border-radius: 5px;
        border: none;
    }

    .head a:hover,
    button:hover{
        background: #e9e8e8
    }

    .body{
        line-height: 2;
        margin-bottom: 20px;
    }

    .actn-btns{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .actn-btns a{
        background: #3b82f6;
        color: #fff;
        font-weight: bold;
        padding: 8px 14px;
        border-radius: 6px;
        border: none;
    }
    
    .actn-btns a:hover{
        background: #367ae6;
        cursor: pointer;
    }

    @media (min-width: 768px) {
        .repo-container{
            margin: 50px auto;
            padding: 40px;
            box-shadow: 0 0 5px #e4e3e3;
            width: 500px;
            border-radius: 15px;
        }
    }
</style>