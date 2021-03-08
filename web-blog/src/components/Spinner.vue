<template>
  <!-- membuat preload page -->
  <div class="spin"></div>
</template>

<style>
    .spin {
        display: block;
        width: 40px;
        height: 40px;
        margin: 30px auto;
        border: 3px solid transparent;
        border-radius: 50%; /*membuat lingkaran penuh */
        border-top-color: #ff8800;
        animation: spin 0.8s ease infinite; /*membuat animasi berputar dlm 0.8dtk scr infiniti */
    }

    @keyframes spin{
        to {transform: rotateZ(360deg);} /* membuat animasi berputar 360derajat */
    }
</style>