<template>
  <div>
      matches
  </div>
</template>

<script>
export default {
   data: () => ({
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "displayName",
      },
      {
        text: "Lefty",
        value: "lefty",
      }
    ],
  }),
}
</script>

<style>

</style>