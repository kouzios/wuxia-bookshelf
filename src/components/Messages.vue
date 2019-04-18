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
            this.messages = []; //Remove this for more than one message at a time
            this.messages.push(message);
        }
    }
}
</script>

<style scoped>

</style>