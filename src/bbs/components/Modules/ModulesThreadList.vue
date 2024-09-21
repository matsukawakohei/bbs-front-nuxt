<template>
  <div>
    <h2>スレッド一覧</h2>
    <div class="thread-list">
      <ModulesThread
        v-for="thread in threads"
        :key="thread.id"
        :title="thread.title"
        :lastUpdatedAt="thread.lastUpdatedAt"
        :commentNum="thread.commentNum"
      />
    </div>
    <BasePagination
      :page="currentPage"
      baseURL="/"
      :maxNum="maxThreadNum"
      :limit="2"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

// TODO: 型定義は別ファイルへ移動させる
interface ThreadListResponse {
  data: {
    total: number;
    threads: {
      id: number;
      userId: number;
      CreatedAt: Date;
      UpdatedAt: Date;
      body: string;
      title: string;
      comments: {
        userId: number;
        body: number;
      }[];
    }[];
  };
}

// TODO: 型定義は別ファイルへ移動させる
interface Thread {
  id: number,
  title: string,
  lastUpdatedAt: string,
  commentNum: number,
};

export default {
  name: "ModulesThreadList",
  setup() {
    const config = useRuntimeConfig();
    const route = useRoute();

    const threads = ref<Thread[]>([]);
    const maxThreadNum = ref(0);
    const getCurrentPage = (): number => route.query.page ? Number(route.query.page) : 1;

    const currentPage = ref(getCurrentPage());


    // TODO: これは最終的にはUtil関数としてまとめる
    const getFormatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const setThreads = async(page: number = 0, limit: number = 2) => {
      const res: ThreadListResponse  = await $fetch(`${config.public.apiUrl}/threads`, {
        method: 'GET',
        credentials: 'include', // 認証情報を送信する場合
        mode: 'cors',
        query: {
          page,
          limit,
        }
      });

      threads.value = res.data.threads.map((thread) => {
        return {
          id: thread.id,
          title: thread.title,
          lastUpdatedAt: getFormatDate(new Date(thread.UpdatedAt)),
          commentNum: thread.comments.length,
        };
      })

      maxThreadNum.value = res.data.total;
    };

    watch(() => route.query.page, () => {
      currentPage.value = getCurrentPage();
      setThreads(currentPage.value);
    });
    onMounted(() => {
      currentPage.value = getCurrentPage();
      setThreads(currentPage.value)
    });
    return {
      threads,
      currentPage,
      maxThreadNum,
    }
  }
}
</script>

<style scoped>
.thread-list {
  display: flex;
  flex-wrap: wrap;
  column-gap:  2%;
  row-gap: var(--content-margin);
}
</style>