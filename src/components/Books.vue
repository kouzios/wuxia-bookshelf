<template>
    <div class='container'>
        <div v-for='(book, index) in books' :key='"book"+index'>
            <a class='title' :href='book.uri' target="_blank">{{book.title}}</a>
            <span class='chapters'>{{book.current_position}} / {{book.total_chapters}}</span>
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
                self.$emit("add-message", "Novel successfully removed");
                self.$emit("refresh");
            }).catch(error => {
                self.$emit("add-message", "Novel unable to be removed");
            });
        }
    }
}
</script>

<style scoped>

</style>