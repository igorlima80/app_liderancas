<template>
  <GridLayout rows="auto,auto,auto,auto" columns="*, auto">
    <Label row="0" col="0" color="black" class :text="title" />
    <Label row="0" col="1" :text="'fa-times' | fonticon" class="fas" />
    <Label row="1" col="0" class :text="description" />
    <Label row="2" col="0" :text="time" />
    <Label row="1" col="1" :text="'fa-exclamation-circle' | fonticon" class="fas" />
  </GridLayout>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    time: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.badge {
  font-size: 20px;
  margin-right: 15;
}

.badge-text {
  font-size: 12px;
  margin-right: 15;
  /* font-weight: bold; */
  color: white;
}
</style>


