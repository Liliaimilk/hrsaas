<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <h2>
        name: {{ name }}
      </h2>
    </div>
  </div>
</template>

<script>
// import excel from '@/components/UploadExcel'
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang='scss'>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
