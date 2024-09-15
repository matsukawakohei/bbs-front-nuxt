<template>
<div class="thread">
  <div class="title">
    <p>{{ title }}</p>
  </div>
  <div class="icon-text">
    <BaseIconText
      icon-name="ant-design:comment-outlined"
      :text="commentNum"
    />
    <BaseIconText
      icon-name="mdi:clock-outline"
      :text="lastUpdatedAt"
    />
  </div>
</div>
</template>

<script lang="ts">
export default {
  name: 'ModulesThread',
  props: {
    title: {
      type: String,
      required: true,
    },
    lastUpdatedAt: {
      type: String,
      required: true,
    },
    commentNum: {
      type: Number,
      required: true,
    }
  }
}
</script>

<style scoped>
.thread {
  padding: var(--min-padding);
  border: solid 1px var(--border-color);
  box-shadow: 2px 2px 2px var(--border-color);
  width: 49%;
  display: flex;
  flex-direction: column;
}

.title {
  margin-bottom: var(--content-margin);
  height: 2em;
}

.icon-text {
  margin-top: auto;
}

p {
  color: inherit;
  /* 文字数制限 */
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  -webkit-line-clamp: 2; /* 任意の行数を指定 */
}
</style>