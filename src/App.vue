<template>
  <div id="app">
    <h1>welcome! {{ name }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
  name = 'shiluo34';
}
</script>