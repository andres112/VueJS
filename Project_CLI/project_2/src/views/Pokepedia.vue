<template>
    <div class="pokepedia">
        <Tittle :msg="$t('pokepedia.txt-title')" />
        <Pokepedia></Pokepedia>
    </div>
</template>
<script>
import Tittle from "@/components/Tittle.vue";
import Pokepedia from "@/components/Pokepedia.vue";
export default {
    name: "PokepediaView",
    components:{
        Tittle,
        Pokepedia
    }
}
</script>