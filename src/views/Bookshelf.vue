<template>
    <b-container id='shelf'>
        <div class='d-flex flex-row justify-content-between' id='title-container'>
            <div class='d-flex flex-row'>
                <h3 class='header'>Bookshelf</h3>
                <div class='d-flex flex-row header'>
                    <font-awesome-icon id='toggle' icon='search' class='selectable header' @click='toggle'/>
                    <b-form-input v-if="show" size="sm h-100" v-model='search' placeholder="Search" autocomplete="off"/>
                </div>
            </div>
            <b-button id='add' variant='secondary' v-b-modal.add-book>Add Book</b-button>
        </div>
        <messages class='title' ref='messages'/>
        <books ref='books' v-on:add-message="addMessage" v-on:refresh="refresh"/>
        <add-book v-on:add-message="addMessage" v-on:refresh="refresh"/>
    </b-container>
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
    data() {
        return {
            show: false,
            search: ''
        }
    },
    mounted() {
        this.refresh();
    },
    watch: {
        /**
         * When trying to search, sort
         */
        search(val) {
            this.$refs.books.filter(val);
        }
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
         * Toggles the search option for the search bar
         */
        toggle() {
            this.show = !this.show;
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

#shelf {
    background-color: rgba(31, 40, 51, 0.8);
    border-bottom: #444444 1px solid;
    box-shadow: 1px inset;
}

.header {
    color: #66fcf1;
    font-weight: bold;
    text-align: center;
}

#title-container  {
    background-color: #1f2833;
    padding: 5px;
}

#toggle {
    margin: 10px 10px 0px 10px;
}
</style>