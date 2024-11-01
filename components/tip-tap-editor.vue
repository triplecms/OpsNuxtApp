<template>
    <Card class="max-w-full p-4" >
        <editor-content :editor="editor" />
    </Card>
  </template>
  
  <script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Dropcursor from '@tiptap/extension-dropcursor'
  
    export default {
      components: {
        EditorContent,
      },
  
      data() {
        return {
          editor: null,
        }
      },
  
      mounted() {
        this.editor = new Editor({
          content: '<p></p>',
          extensions: [Document, Paragraph, Text,Dropcursor],
          autofocus: false,
        })
      },
  
      beforeUnmount() {
        this.editor.destroy()
      },
    }
  </script>
  