<template>
<div class="pagination">
  <NuxtLink v-for="p in pageNums" :key="String(p.text)" :to="{ path: baseURL, query: { page: Number(p.query) } }" :class="p.text === String(page) ? 'active' : ''">
    {{ p.text }}
  </NuxtLink>
</div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';

export default {
  name: 'BasePagination',
  props: {
    page: {
      type: Number,
      required: true
    },
    baseURL: {
      type: String,
      required: true
    },
    maxNum: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    }
  },
  setup(props) {
    const maxPageNumCount = 5;
    const pageNums = ref<{text: String, query: Number}[]>([]);

    const setPageNums = () => {
      const mod = Boolean(props.maxNum % props.limit);
      const maxPageNum = Math.floor(props.maxNum / props.limit) + Number(mod);
      const startNum = props.page - 2 >= 1 ? props.page - 2 : 1 ;
      pageNums.value = [];
      /** 先頭ページ以外は前のページに移動する記号を表示する */
      if (props.page > 1) {
        pageNums.value.push({
          text: '<<',
          query: 1,
        });
        pageNums.value.push({
          text: '<',
          query: Number(props.page) - 1,
        });
      }
      for (let i = 0; i < maxPageNumCount; i++) {
        if (startNum + i <= maxPageNum) {
          pageNums.value.push({
            text: String(startNum + i),
            query: startNum + i,
          });
        }
      }
      /** 最終ページ以外は次のページに移動する記号を表示する */
      if (props.page < maxPageNum) {
        pageNums.value.push({
          text: '>',
          query: Number(props.page) + 1,
        });
        pageNums.value.push({
          text: '>>',
          query: maxPageNum,
        });
      }
    }
    onMounted(setPageNums);
    watch(() => props, () => {
      console.log('watch!!');
      console.log(props);
      setPageNums();
    }, {deep: true})

    return {
      pageNums,
    }
  }
}
</script>

<style scoped>
.pagination {
  margin-top: var(--box-margin);
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: var(--min-gap);
}

.pagination a {
  display: block;
  padding: var(--min-padding);
  border: solid 1px var(--border-color);
  color: inherit;
  text-decoration: none;
}

.pagination .active {
  background-color: var(--main-color);
  color: var(--white);
}
</style>