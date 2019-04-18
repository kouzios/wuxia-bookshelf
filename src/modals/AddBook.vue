<template>
    <div>
    <b-modal ref='add_book' id="add_book" title="Add Novel" ok-only ok-variant="secondary" ok-title="Cancel" @hidden='reset'>
        <b-form  @submit.prevent="requestBook">
            <label for="text-uri">Novel URI</label>
            <div class='error'>{{message}}</div>
            <b-input type="text" id="text-uri" aria-describedby="uri-help-block" v-model='uri' autocomplete='off'/>
            <b-form-text id="uri-help-block">
                This website uses https://wuxiaworld.online, so use only use links following that pattern
            </b-form-text>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import parser from '@/scripts/websiteParser'

export default {
    data() {
        return {
            uri: '',
            message: ''
        }
    },
    methods: {
        /**
         * Parses through page information, and sends the information to the parent
         */
        parseInformation(page) {
            var page_data = parser.parse(page);

            this.$emit('add-book', {
                title: page_data.title,
                uri: this.uri,
                current_position: 0,
                total_chapters: page_data.chapters
            });
        },
        /**
         * Requests book information from wuxiaworld.online, 
         * then calls a method to parse through the information
         */
        requestBook() {
            var self = this;
            if(this.validURI()) {
                self.message = '';
                axios.get(this.uri).then(response => {
                    self.$refs['add_book'].hide();
                    self.$emit('add-message', 'Novel successfully retrieved');
                    self.parseInformation(response.data);
                }).catch(error => {
                    self.message = 'Error: Novel could not be retrieved';
                });
            } else {
                self.message = 'Error: Not a valid wuxiaworld.online URI';
            }
        },
        /**
         * Checks if the currently stored URI is from https://wuxiaworld.online/
         * 
         * Note: Doesn't guarantee the request will go through, 
         *       just that it's from the right website.
         */
        validURI() {
            return /^https:\/\/wuxiaworld\.online\/.*/.test(this.uri);
        },
        /**
         * Clears the displayed content, this action occurs on modal close
         */
        reset() {
            this.message = '';
            this.uri = '';
        }
    }
}
</script>

<style scoped>
.error { 
    color: red;
}
</style>