import { ref } from 'vue'

const dataFetch = (url) =>{
    const data = ref(null)
    const error = ref(null)

    const getData = async ()=>{
        try{
            const res = await fetch(url)
            data.value = await res.json()
        }catch(err){
            error.value = err.message
        }
    }

    return { data, error, getData }
}

export default dataFetch