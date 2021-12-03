import Tagify from '@yaireo/tagify';
import Editor from '@toast-ui/editor';

document.addEventListener('DOMContentLoaded', function() {
  var authorsEl = document.getElementById("post_authors");

  if (authorsEl != null) { 
    var tagify = new Tagify(authorsEl)

    var button = authorsEl.nextElementSibling;  // "add new tag" action-button

    button.addEventListener("click", onAddButtonClick)

    function onAddButtonClick(){
        tagify.addEmptyTag()
    }

    document.querySelector('tags').classList.add("h-100")
  }

  var tagsEl = document.getElementById("post_tags");

  if (tagsEl != null) {
    var whitelist = JSON.parse(document.getElementById("blog_categories").innerText)

    var tagify = new Tagify(tagsEl, {
      whitelist: whitelist,
      dropdown: {
        fuzzysearch: false,
        maxItems: 5,
        position: "text",
        enabled: 0
      }
    })

    document.querySelector('tags').classList.add("h-100")
  }

  var editorEl = document.getElementById("body-editor");

  if (editorEl != null) {

    var post_body = document.getElementById('post_body');

    const editor = new Editor({
      el: editorEl,
      previewStyle: 'vertical',
      height: '500px',
      initialValue: post_body.value,
      initialEditType: 'markdown',
      previewHighlight: false,
      usageStatistics: false,
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'link'],
        ['code', 'codeblock']
      ],
      events: {
        change: function() {
         post_body.value = editor.getMarkdown();
         save(post_body);
        }
      }
    });

    document.getElementById('img-popup-close-select').addEventListener('click', () => {editor.eventEmitter.emit('closePopup');})
    document.getElementById('img-popup-close-upload').addEventListener('click', () => {editor.eventEmitter.emit('closePopup');})

    document.getElementById('img-popup-select').addEventListener('click', () => {
      var altText = null
      editor.eventEmitter.emit(
        'command',
        'addImage',
        {
          imageUrl: "",
          altText: altText || 'image',
        });
      editor.eventEmitter.emit('closePopup');
    })

    document.getElementById('img-popup-upload').addEventListener('click', () => {editor.eventEmitter.emit('closePopup');})

    editor.insertToolbarItem({ groupIndex: 3, itemIndex: 1 }, {
      name: 'mediaItem',
      tooltip: 'Insert image',
      className: 'toastui-editor-toolbar-icons image',
      popup: {
        body: document.getElementById('editor-image-popup')
      }
    });
    
  }
});