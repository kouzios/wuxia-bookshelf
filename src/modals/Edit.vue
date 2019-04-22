<template>
    <b-modal ref='edit' id="edit" title="Edit Novel" @show="assignBook" @hidden='resetValues' hide-footer>
        <b-form  @submit.prevent="updateNovel">
            <messages ref='messages'/>
            <span>Title</span>
            <b-input v-model='book.title' autocomplete="off"/>
            <span>Chapters</span>
            <b-input v-model='book.current_position' autocomplete="off"/>
            <div id='footer' class='d-flex flex-row justify-content-between'>
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button variant="secondary" @click='hide'>Cancel</b-button>
            </div>
        </b-form>
    </b-modal>
</template>

<script>
import axios from 'axios'
import messages from '@/components/Messages'

export default {
    props:[
        'novel'
    ],
    components: {
        messages
    },
    data() {
        return {
            book: {
                title: '',
                current_position: ''
            }
        }
    },
    methods: {
        /**
         * Updates the novel based on the inputs
         */
        updateNovel() {
            var self = this;
            var uri = process.env.VUE_APP_SERVER + '/bookshelf/updateNovel';

            axios.post(uri, this.book).then(response => {
                self.hide();
                self.$emit('add-message', response.data);
                self.$emit("refresh");
            }).catch(error => {
                self.addMessage(error.data);
            });
        },
        /**
         * Assigns values from prop to data object, used to prevent changes to prop
         * changing the parent unintentionally
         */
        assignBook() {
            this.book.title = this.novel.title;
            this.book.current_position = this.novel.chapters;
        },
        /**
         * Resets values from novel to empty
         */
        resetValues() {
            this.book = {
                title: '',
                current_position: ''
            };
        },
        /**
         * Adds a message to the child message element
         */
        addMessage(message) {
            this.$refs.messages.addMessage(message);
        },
        /**
         * Hides this modal
         */
        hide() {
            this.$refs['edit'].hide();
        }
    }
}
</script>

<style scoped>
#book_update {
    margin-top: 10px;
}

#footer {
    margin-top: 10px;
}
</style>