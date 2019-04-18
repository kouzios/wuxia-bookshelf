<template>
    <div class='container'>
        <div v-for='(book, index) in books' :key='"book"+index'>
            <span class='title'>{{book.title}}</span>
            <span class='chapters'>{{book.current_position}} / {{book.total_chapters}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            books: []
        }
    },
    methods: {
        setBooks(passed_books) {
            this.books = passed_books.data;
        }
    }
}
</script>

<style scoped>

</style>