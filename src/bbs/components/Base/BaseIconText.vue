<template>
<div class="icon-text">
  <Icon :name="iconName" />
  <p>{{ text }}</p>
</div>
</template>

<script lang="ts">
export default {
  name: 'BaseIconText',
  props: ['iconName', 'text'],
}
</script>

<style scoped>
.icon-text {
  display: flex;
  align-items: center;
  column-gap: 1%;
}

.icon-text p {
  font-size: 12px;
  color: var(--dark-gray);
}
</style>