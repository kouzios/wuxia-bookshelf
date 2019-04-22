<template>
    <b-modal ref='confirmation' id="confirmation" title="Confirmation" hide-footer>
        <span>{{message}}</span>
        <div id='confirmation-buttons' class='d-flex flex-row justify-content-between'>
            <b-button id="confirm" type="submit" variant="primary" @click='confirm'>Yes</b-button>
            <b-button id="cancel" type="submit" variant="danger" @click='cancel'>No</b-button>
        </div>
    </b-modal>
</template>

<script>
export default {
    props: [
        'message'
    ],
    methods: {
        /**
         * Confirms that the user wants to take the specified action
         */
        confirm() {
            this.$refs['confirmation'].hide();
            this.$emit('confirm', this.title);
        },
        /**
         * Closes the confirmation window
         */
        cancel() {
            this.$refs['confirmation'].hide();
        }
    }
}
</script>

<style scoped>
#confirmation-buttons {
    margin-top: 25px;
}
</style>