<template>
    <div class='container'>
        <div v-for='(book, index) in books' :key='"book"+index' class='row'>
            <span class='title'>{{book.title}}</span>
            <form @submit.prevent='updateNovel(index)'>
                <b-form-input class='position' type='text' v-model="book.current_position"/>
            </form>
            <font-awesome-icon icon="trash-alt" class='selectable icon' @click='removeNovel(index)'/>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: function() {
        return {
            books: []
        }
    },
    methods: {
        setBooks(passed_books) {
            this.books = passed_books.data;
        },
        removeNovel(index) {
            var book = this.books[index];
            var uri = process.env.VUE_APP_SERVER + '/bookshelf/remove';
            var self = this;
            axios.post(uri, book).then(response => {
                self.$emit('add-message', response.data);
                self.$emit('refresh');
            }).catch(error => {
                self.$emit('add-message', error.data);
            });
        },
        updateNovel(index) {
            var self = this;
            var book = this.books[index];
            var uri = process.env.VUE_APP_SERVER + '/bookshelf/updateNovel';

            axios.post(uri, book).then(response => {
                self.$emit('add-message', response.data);
            }).catch(error => {
                self.$emit('add-message', error.data);
            });
        }
    }
}
</script>

<style scoped>
.position {
    width: 50px;
}
</style>