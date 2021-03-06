<template>
    <div>
        <b-table
            id='books-container' 
            class='title'
            :items="displayed_books" 
            :fields="fields"
            :sort-by.sync="sort.by"
            :sort-desc.sync="sort.descending"
        >
            <template slot='actions' slot-scope='row'>
                <span class='selectable' @click='setEditValues(row.item)' v-b-modal.edit>Edit</span>
                |
                <font-awesome-icon icon='trash-alt' class='selectable' @click='setConfirmationValues(row.item.title)' v-b-modal.confirmation/>
            </template>
        </b-table>
        <confirmation :message='confirmation.message' v-on:confirm="removeNovel(confirmation.title)"/>
        <edit :novel='edit' v-on:refresh='refresh' v-on:message='sendMessage'/>
    </div>
</template>

<script>
import axios from 'axios'
import confirmation from '@/modals/Confirmation';
import edit from '@/modals/Edit';

export default {
    components: {
        confirmation,
        edit
    },
    data: function() {
        return {
            books: [],
            displayed_books: [],
            edit: {},
            confirmation: {
                message: '',
                title: ''
            },
            sort: {
                by: 'title',
                descending: false
            },
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
        /**
         * Filters out books based on the search
         */
        filter(val) {
           this.displayed_books = this.books.filter(book => {
                return book.title.toLowerCase().indexOf(val.toLowerCase()) > -1
            });
        },
        /**
         * Fills the edit modal with the desired novel values
         */
        setEditValues(novel) {
            this.edit = novel;
        },
        /**
         * Fills the confirmation modal with the desired title
         */
        setConfirmationValues(title) {
            this.confirmation.title = title;
            this.confirmation.message = 'Are you sure you want to remove ' + title + '?';
        },
        /**
         * Sets the books in the bookcase via the passed object
         */
        setBooks(passed_books) {
            var self = this;
            this.books = [];
            passed_books.data.forEach(function(book) {
                self.books.push({
                    title: book.title,
                    actions: 'something',
                    chapters: book.current_position
                });
            });
            this.displayed_books = this.books;
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
         * Requests parent to send a message, used for component emissions
         */
        sendMessage(message) {
            self.$emit('add-message', message);
        },
        /**
         * Requests parent to refresh bookshelf, used for child component requests
         */
        refresh() {
            this.$emit('refresh');
        }
    }
}
</script>

<style scoped>
.position {
    width: auto;
}
</style>