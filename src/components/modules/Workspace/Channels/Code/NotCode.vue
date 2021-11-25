<template>
  <div class="card-center">
    <img src="@/assets/notCode.svg" class="img" />
    <h1 class="h">Selecciona un archivo</h1>
  </div>
</template>

<style scoped>
.card-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  height: 100%;
}

.img {
  border-radius: 1rem;
  width: 25rem !important;
  height: 25rem !important;
}

.h {
  text-align: center;
  color: white;
}
</style>
