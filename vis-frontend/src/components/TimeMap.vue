<template>
  <div class="time">
    <h1>第{{ day }}天 {{ time }}</h1>
  </div>
</template>
<style scoped>
.time {
  text-align: center;
  padding: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      day: 1,
      time: '07:01:00',
    };
  },
  mounted() {
    this.$bus.$on('timechange', ({ time, day }) => {
      this.time = time;
      this.day = day;
    });
  },
};
</script>
