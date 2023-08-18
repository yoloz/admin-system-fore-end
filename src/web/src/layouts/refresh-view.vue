<script lang="ts">
import { useRoute, useRouter } from 'vue-router'

export default {
    created: () => {
        const { params, query } = useRoute()
        const { path } = params
        let fullPath = path
        if (path instanceof Array) {
            fullPath = path.join('/')
        }
        useRouter().replace({ path: '/' + fullPath, query })
    }
}
</script>
