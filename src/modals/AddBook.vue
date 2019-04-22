<template>
    <b-modal ref='add-book' id="add-book" title="Add Novel" ok-only ok-variant="secondary" ok-title="Cancel" @hidden='reset'>
        <b-form  @submit.prevent="addBook">
            <messages class='error' ref='messages'/>
            <label for="text-title">Title</label>
            <b-input type="text" id="text-title" v-model='title' autocomplete='off'/>
            <label for="text-chapters">Chapters</label>
            <b-input type="text" id="text-chapters" v-model='current_position' autocomplete='off'/>
            <b-button id="book_submission" type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-modal>
</template>

<script>
import axios from 'axios'
import messages from '@/components/Messages'

export default {
    components: {
        messages
    },
    data() {
        return {
            message: '',
            title: '',
            current_position: 0
        }
    },
    methods: {
        /**
         * Adds the passed book data into the database via a post request to the server
         */
        addBook() {
            var self = this;
            let uri = process.env.VUE_APP_SERVER + '/bookshelf/add';

            axios.post(uri, {title: this.title, current_position: this.current_position}).then(response => {
                self.$refs['add-book'].hide();
                self.reset();
                self.$emit("add-message", response.data);
                self.$emit("refresh");
            }).catch(error => {
                self.$emit("add-message", error);
            });
        },
        /**
         * Clears the displayed content, this action occurs on modal close
         */
        reset() {
            this.message = '';
            this.title = '';
            this.current_position = 0;
        },
        /**
         * Adds a message to the child message element
         */
        addMessage(message) {
            this.$refs.messages.addMessage(message);
        }
    }
}
</script>

<style scoped>
.error { 
    color: red;
}

#book_submission {
    margin-top: 10px;
}
</style>