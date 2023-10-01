<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" aria-label="Ninth navbar example">
        <div class="container-xl">
            <NavbarBrand Name="Plant Green"/>
            <div class="collapse navbar-collapse" id="navbarsExample07XL">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <NavigationItem>
                        <template #list>
                            <router-link to="/" class="nav-link">
                                Home
                            </router-link>
                        </template>
                    </NavigationItem>
                    <NavigationItem>
                        <template #list>
                            <router-link to="/" class="nav-link">
                                About
                            </router-link>
                        </template>
                    </NavigationItem>
                    <NavigationItem>
                        <template #list>
                            <router-link to="/" class="nav-link">
                                Services
                            </router-link>
                        </template>
                    </NavigationItem>
                    <NavigationItem>
                        <template #list>
                            <router-link to="/" class="nav-link">
                                Product
                            </router-link>
                        </template>
                    </NavigationItem>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup>
import NavbarBrand from '../partial-navbar-components/NavbarBrand.vue';
import NavigationItem from '../partial-navbar-components/NavigationItem.vue';
</script>