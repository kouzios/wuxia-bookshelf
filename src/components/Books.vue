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
                <font-awesome-icon icon='trash-alt' class='selectable' @click='setConfirmationValues(row.item.title)' v-b-modal.confirmation/>
            </template>
        </b-table>
        <confirmation :message='confirmation.message' v-on:confirm="removeNovel(confirmation.title)"/>
    </div>
</template>

<script>
import axios from 'axios'
import confirmation from '@/modals/Confirmation';

export default {
    components: {
        confirmation
    },
    data: function() {
        return {
            confirmation : {
                message: '',
                title: ''
            },
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
        setConfirmationValues(title) {
            this.confirmation.title = title;
            this.confirmation.message = 'Are you sure you want to remove ' + title + '?';
        },
        /**
         * Sets the books in the bookcase via the passed object
         */
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
        /**
         * Removes the specified novel based on the title
         */
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
        /**
         * Updates the novel based on the index
         * [depricated]
         */
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