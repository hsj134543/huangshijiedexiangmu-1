<template>
  <div class="dashboard-modifybtn">
    修改
  </div>
</template>

<script>
export default {
  name: 'DashboardTable',
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-modifybtn {
    width: 100px;
    height: 50px;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 0;
    top: 300px;
    cursor: pointer;
  }
}
</style>
