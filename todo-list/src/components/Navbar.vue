<template>
  <div class="navbar">
    <nav class="nav-extended blue darken-1">
      <div class="nav-content">
        <router-link :to="{ name: 'Index' }">
          <span class="nav-title">To-do List</span>
        </router-link>
        <a
          href=""
          class="btn-floating btn-large halfway-fab waves-effect waves-light orange accent-3"
        >
          <router-link :to="{name: 'AddTodoList' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>
<style>
.navbar span {
  font-size: 1.4em;
  margin-left: 12px;
}
</style>