<template>
    <div class='navigation_container'>
        <b-navbar toggleable="lg" type="dark">
            <router-link id='header_link' to='/'>Bookshelf</router-link>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template slot="button-content"><em>User</em></template>
                        <div class='dropdown_item'>
                            <router-link to='/profile'>Profile</router-link>
                        </div>
                        <div class='dropdown_item'>
                            <router-link to='/login'>Sign in</router-link>
                        </div>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navigation_container {
    background-color: rgba(31, 40, 51, 0.8);
    margin-bottom: 25px;
}

#header_link {
    color: #66fcf1;
}

.dropdown_item {
    text-align: center;
}

.dropdown_item a {
    margin-left: 10px;
    color: white;
}
</style>