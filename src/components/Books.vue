<template>
    <div>
        <b-table
            id='books-container' 
            class='title'
            :items="books" 
            :fields="fields"
            :sort-by.sync="sort.by"
            :sort-desc.sync="sort.descending"
        >
        <template slot='actions' slot-scope='row'>
            <font-awesome-icon icon='trash-alt' class='selectable' @click='removeNovel(row.item.title)'/>
        </template>
        </b-table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: function() {
        return {
            sort: {
                by: 'title',
                descending: false
            },
            books: [],
            fields: {
                title: {
                    label: "Title",
                    sortable: true
                },
                actions: {
                    label: "Actions"
                },
                chapters: {
                    label: "Chapters",
                    sortable: true
                }
            }
        }
    },
    methods: {
        setBooks(passed_books) {
            var self = this;
            self.books = [];
            passed_books.data.forEach(function(book) {
                self.books.push({
                    title: book.title,
                    actions: 'something',
                    chapters: book.current_position
                });
            });
        },
        removeNovel(title) {
            var self = this;
            var uri = process.env.VUE_APP_SERVER + '/bookshelf/remove';
            axios.post(uri, {title: title}).then(response => {
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
}
</style>