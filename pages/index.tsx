import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { LegacyRef, useRef } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

interface QuillJsProps {
  forwardedRef: any;
}

const ReactQuillJs = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    const QuillJS = ({ forwardedRef, ...props }: QuillJsProps) => (
      <RQ ref={forwardedRef} {...props} />
    );
    return QuillJS;
  },
  { ssr: false }
);

const Home: NextPage = () => {
  const quillRef = useRef<ReactQuill>(null);

  function addFruitToText(fruit: string) {
    const range = quillRef.current?.getEditorSelection();

    if (range) {
      if (range.length === 0) {
        //alert("User cursor is at index" + range.index);
        quillRef.current?.getEditor().insertText(range.index, ` ${fruit} `);

        //quillRef.current?.setEditorTabIndex(quillRef.current?.getEditor, 20);
      } else {
        const text = quillRef.current?.getEditorSelection();

        console.log("User has highlighted: " + text?.length);
      }
    } else {
      alert("User cursor is not in editor");
    }

    /*    const quill = quillRef.current?.getEditor();

    const index = quill?.getText(true);

    if (index) {
      console.log("INDEX > ", +index);

      quill?.setText(text);
    }

    /*    quill?.insertText(
      quill.getSelection()?.index,
      "Olá",
      "link",
      "hahahahahaha obrigado Deus"
    );*/
  }

  return (
    <>
      {["Banana", "Maça", "Laranja"].map((fruit) => (
        <button onClick={() => addFruitToText(fruit)} key={fruit}>
          {fruit}
        </button>
      ))}
      <ReactQuillJs forwardedRef={quillRef} />;
    </>
  );
};

export default Home;

/*
const formats = [
  'background',
  'font',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'indent',
  'bullet',
  'indent',
  'align',
];
*/

/*

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ],
  clipboard: {
    matchVisual: true,
  },
};*/

/*

<QuillEditor
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        modules={modules}
        formats={formats}
        theme='snow'
      />
      */
