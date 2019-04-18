<template>
    <div>
    <b-modal ref='add_book' id="add_book" title="Add Novel" ok-only ok-variant="secondary" ok-title="Cancel">
        <b-form  @submit.prevent="retrieveInfo">
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

export default {
    data() {
        return {
            uri: '',
            message: ''
        }
    },
    methods: {
        submit() {
            /*
            this.$emit('add-book', {
                title: this.title,
                current_position: 0,
                total_chapters: this
            });
            */
        },
        retrieveInfo() {
            var self = this;
            if(this.validURI()) {
                self.message = '';
                axios.get(this.uri).then(response => {
                    self.$refs['add_book'].hide()
                    self.$emit('add-message', 'Novel successfully retrieved');
                    self.submit();
                }).catch(error => {
                    self.message = 'Error: Novel could not be retrieved';
                });
            } else {
                self.message = 'Error: Not a valid wuxiaworld.online URI';
            }
        },
        validURI() {
            return /^https:\/\/wuxiaworld\.online\/.*/.test(this.uri);
        }
    }
}
</script>

<style scoped>
.error { 
    color: red;
}
</style>