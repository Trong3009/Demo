<template>
    <nav>
      <div v-for="(item, index) in navItems" :key=index class="nav-main">
          <router-link class="nav-item" :to="item.link" >{{ item.title }}</router-link>
      </div>
        <!-- <router-link class="nav-item" to="/">Home</router-link> 
        <router-link class="nav-item" to="/about">About</router-link> -->
    </nav>
</template>

<script>
export default {
    name: 'TheSidebar',
    setup(){
        const navItems =[
          {
            title: "home",
            link: "/",
          },
          {
            title: "about",
            link: "/about"
          }
        ];
        return {
          navItems
        };
    }
}
</script>

<style>
  nav{
    width: 100%;
    height: 64px;
    display: flex;
    flex-direction: row;
    column-gap: 8px;
  }
  nav a {
    margin: 8px;
    width: 40px;
    height: 48px;
    font-weight: bold;
    color: #2c3e50;
  }
  
  nav a.nav-item.router-link-exact-active {
    color: #42b983;
    background-color: aliceblue;
  }
  .nav-main{
    width: 86px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>