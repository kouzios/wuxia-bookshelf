<template>
    <table id='books-container' class='table'>
        <thead>
            <tr>
                <th>Title</th>
                <th>Actions</th>
                <th>Chapters</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for='(book, index) in books' :key='"book"+index' class='row'>
                <td class='title'>
                    {{book.title}}
                </td>
                <td>
                    <font-awesome-icon icon="trash-alt" class='selectable icon' @click='removeNovel(index)'/>
                </td>
                <td>
                    <form @submit.prevent='updateNovel(index)'>
                        <b-form-input class='position' type='text' v-model="book.current_position"/>
                    </form>
                </td>
            </tr>
        </tbody>
    </table>
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
    width: auto;
}

.title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    color: #0080FF;
}

#books-headers {
    color: #0080FF;
}
</style>