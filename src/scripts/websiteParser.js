export default {
    /**
     * Parses through wuxiaworld.online page information to get title and chapters
     * 
     * @param {} page 
     */
    parse: function(page) {
        var parser = new DOMParser();
        var el = parser.parseFromString(page,"text/html");
        var title = el.getElementsByClassName('entry-title')[0].innerText;
        var chapter = el.getElementsByClassName('chapter-list')[0].children[0].innerText;
        var chapter_num = chapter.match("^(?:\\s*)Chapter (\\d+)");
        
        var page = {
            title: title.replace("\'", ""),
            chapters: chapter_num[1]
        }
        return page;
    }
  }