<template>
    <div class='container'>
        <div v-for='(book, index) in books' :key='"book"+index'>
            <a class='title' :href='book.uri' target="_blank">{{book.title}}</a>
            <span class='chapters'>{{book.current_position}} / {{book.total_chapters}}</span>
            <font-awesome-icon icon="trash-alt" class='selectable icon' @click='removeNovel(index)'/>
            <font-awesome-icon icon="sync-alt" class='selectable icon' @click='updateNovel(index)'/>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import parser from '@/scripts/websiteParser'

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
                self.$emit("add-message", response.data);
                self.$emit("refresh");
            }).catch(error => {
                self.$emit("add-message", error.data);
            });
        },
        updateNovel(index) {
            var self = this;
            this.retrieveNovel(index, function(page) {
                if(page) {
                    var uri = process.env.VUE_APP_SERVER + '/bookshelf/updateNovel';
                    var book = self.books[index];

                    //Sets total chapters to new chapter number retrieved from website
                    book.total_chapters = parser.parse(page).chapters;
                    axios.post(uri, book).then(response => {
                        self.$emit('add-message', response.data);
                    }).catch(error => {
                        self.$emit('add-message', error.data);
                    });
                } 
            })
        },
        /**
         * Retrieves novel from wuxiaworld.online
         */
        retrieveNovel(index, callback) {
            var self = this;
            axios.get(this.books[index].uri).then(response => {
                callback(response.data);
            }).catch(error => {
                self.$emit('add-message', 'Error: Novel could not be retrieved for update');
                callback(null);
            });
        }
    }
}
</script>

<style scoped>

</style>