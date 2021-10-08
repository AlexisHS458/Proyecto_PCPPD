<template>
  <div class="discord-messages">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "DiscordMessages",
};
</script>

<style>
.discord-messages {
  color: #fff;
  background-color: #0c2a52;
  font-size: 16px;
  font-family: sans-serif;
  line-height: 170%;
  border: 0px;
}

/* .discord-messages.discord-light-theme {
  color: #0c2a52;
  background-color: #f7f7f7;
  border-color: #dedede;
} */
</style>
