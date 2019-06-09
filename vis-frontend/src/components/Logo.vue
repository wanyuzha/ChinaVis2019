<template>
  <div id="container">
    <h1 id="logo">
      VIV: 智能场馆可视化分析解决方案<Icon
        type="md-apps"
        class="logo-icon"
        @click="visible = true"
      />
    </h1>
    <Modal
      title="人员移动规律"
      v-model="visible"
      :mask-closable="false"
      width="1500"
      ><parallelMap></parallelMap
    ></Modal>
  </div>
</template>

<style scoped>
#logo {
  padding: 20px;
  position: relative;
}

#container {
  border-radius: 10px;
  background: linear-gradient(red, blue)
}

.logo-icon {
  position: absolute;
  bottom: 27px;
  right: 25px;
  cursor: pointer;
}
</style>

<script>
import parallelMap from './ParallelMap';

export default {
  name: 'logo',
  data() {
    return {
      visible: false,
    };
  },
  components: {
    parallelMap,
  },
};
</script>
