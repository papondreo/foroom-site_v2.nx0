<template>
    <div class="container">
        <div class="sk-three-bounce">
            <div class="sk-bounce-1 sk-child"></div>
            <div class="sk-bounce-2 sk-child"></div>
            <div class="sk-bounce-3 sk-child"></div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'Loader'
    }
</script>


<style lang="sass" scoped>
    $spinkit-size: 15px
    $spinkit-spinner-color: #aaa

    .container
        height: 100%
        padding: 0
        display: flex
        justify-content: flex-end
        align-items: center
    .sk-three-bounce
        $animationDuration: 1.4s
        $delayRange: 0.32s

        .sk-child
            margin-left: 3px
            width: $spinkit-size / 2
            height: $spinkit-size / 2
            background-color: $spinkit-spinner-color
            border-radius: 100%
            display: inline-block
            animation: sk-three-bounce $animationDuration ease-in-out 0s infinite both

        .sk-bounce-1
            animation-delay: -$delayRange

        .sk-bounce-2
            animation-delay: -$delayRange / 2

    @keyframes sk-three-bounce
        0%, 80%, 100%
            transform: scale(0)

        40%
            transform: scale(1)
</style>
