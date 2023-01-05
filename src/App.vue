<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link :to='{name:"HomePage"}' class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link :to='{name:"CustomerList"}' class="nav-link">Customer List</router-link>
        </li>
        <li class="nav-item">
          <router-link :to='{name:"InstallmentList"}' class="nav-link">Installment List</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}


</style>
