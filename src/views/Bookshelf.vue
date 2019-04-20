<template>
    <div class='container'>
        <div class='row'>
            <h1>Bookshelf</h1>
        </div>
        <div class='row'>
            <b-button id='add' variant='primary' v-b-modal.add-book>Add Book</b-button>
        </div>
        <messages ref='messages'/>
        <books ref='books' v-on:add-message="addMessage" v-on:refresh="refresh"/>
        <add-book v-on:add-message="addMessage" v-on:refresh="refresh"/>
    </div>
</template>

<script>
import axios from 'axios'
import messages from '@/components/Messages'
import books from '@/components/Books'
import AddBook from '@/modals/AddBook'

export default {
    components: {
        messages,
        books,
        AddBook
    },
    mounted() {
        this.refresh();
    },
    methods: {
        /**
         * Refreshes the bookshelf, pulling from the database
         */
        refresh() {
            var self = this;
            let uri = process.env.VUE_APP_SERVER + '/bookshelf/getAll';
            axios.get(uri).then((response) => {
                self.$refs.books.setBooks(response);
            });
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
#test {
    margin-left: 10px;
}
</style>