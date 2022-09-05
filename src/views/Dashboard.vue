<template>
  <div class="home">
    <Hello msg="Контроль навигационного поля ГЛОНАСС" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Hello from "@/components/Hello.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    Hello,
  },
});
</script>
