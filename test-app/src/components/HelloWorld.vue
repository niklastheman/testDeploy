<template>
  <div>
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "HelloWorld",

  props: {
    msg: {
      type: String,
    },
  },
};
</script>
