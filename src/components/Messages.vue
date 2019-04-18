<template>
    <div class='container'>
        <div v-for='(message, index) in messages' :key='"message"+index'>
            <span>{{ message }}</span>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            messages:  []
        }
    },
    methods: {
        addMessage(message) {
            this.messages.push(message);
        }
    }
}
</script>

<style scoped>

</style>