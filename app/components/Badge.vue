<template>
  <GridLayout v-if="badgeValue">
    <Label
      row="0"
      col="0"
      :color="badgeColor"
      class="fas badge"
      :text="'fa-circle' | fonticon"
      verticalAlignment="middle"
      horizontalAlignment="center"
    />
    <Label
      row="0"
      col="0"
      class="badge-text"
      :text="badgeValue"
      verticalAlignment="middle"
      horizontalAlignment="center"
    />
  </GridLayout>
</template>
<script>
export default {
  props: {
    badgeValue: {
      type: Number,
      default: 0
    },
    badgeColor: {
      type: String,
      default: "#D84039"
    }
  }
};
</script>

<style scoped>
.badge {
  font-size: 16px;
  margin-right: 15;
}

.badge-text {
  font-size: 8px;
  margin-right: 15;
  /* font-weight: bold; */
  color: white;
}
</style>


