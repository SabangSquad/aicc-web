'use client';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import { Bold, Italic, Strikethrough, Heading1, Heading2, List, ListOrdered } from 'lucide-react';

declare module '@tiptap/core' {
  interface Storage {
    markdown: {
      getMarkdown: () => string;
    };
  }
}

interface MenuBarProps {
  editor: Editor | null;
}
const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) return null;

  const btnClass = (isActive: boolean) =>
    `flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
      isActive ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50/50 p-2">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="굵게">
        <Bold className="h-4 w-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="기울임체">
        <Italic className="h-4 w-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btnClass(editor.isActive('strike'))} title="취소선">
        <Strikethrough className="h-4 w-4" />
      </button>

      <div className="mx-1 h-5 w-px bg-slate-300" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={btnClass(editor.isActive('heading', { level: 1 }))}
        title="제목 1"
      >
        <Heading1 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnClass(editor.isActive('heading', { level: 2 }))}
        title="제목 2"
      >
        <Heading2 className="h-4 w-4" />
      </button>

      <div className="mx-1 h-5 w-px bg-slate-300" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass(editor.isActive('bulletList'))}
        title="글머리 기호"
      >
        <List className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnClass(editor.isActive('orderedList'))}
        title="번호 매기기"
      >
        <ListOrdered className="h-4 w-4" />
      </button>
    </div>
  );
};

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit, // 필수 마크다운 요소(볼드, 리스트 등) 제공
      Markdown, // 실제 마크다운 텍스트 ↔ Tiptap 객체 변환 플러그인
    ],
    content: value,
    editorProps: {
      attributes: {
        // prose 클래스를 통해 에디터 내부 컨텐츠를 자동으로 예쁘게 스타일링합니다.
        class: 'prose prose-sm sm:prose-base prose-blue max-w-none min-h-[240px] p-6 focus:outline-none text-slate-800',
      },
    },
    onUpdate: ({ editor }: { editor: Editor }) => {
      onChange(editor.storage.markdown.getMarkdown());
    },
  });

  return (
    <div className="flex h-full w-full flex-col">
      <MenuBar editor={editor} />
      {/* 이 영역을 클릭하면 에디터가 활성화됩니다 */}
      <div className="flex-1 cursor-text bg-white" onClick={() => editor?.commands.focus()}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
