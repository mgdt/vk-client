<template>
  <div class="dialog__wrapper">
    <div class="dialog">
      <USkeleton
        :ui="{ rounded: 'rounded-full' }"
        class="dialog__image"
      ></USkeleton>

      <div class="dialog__info">
        <USkeleton class="dialog__title"></USkeleton>
        <USkeleton class="dialog__message"></USkeleton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dialog {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #202a37;

  &__info {
    width: 100%;
  }

  &__image {
    width: 50px;
    height: 50px;
  }

  &__title {
    width: 10%;
    height: 20px;
    margin-bottom: 5px;
  }

  &__message {
    width: 100%;
    height: 20px;
  }
}
</style>
