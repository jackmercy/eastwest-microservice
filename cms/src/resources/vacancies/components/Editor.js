import React, { useCallback } from 'react';
import { Labeled, useInput, useTranslate } from 'react-admin';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@e2w/ckeditor5-build-classic';

const RichEditor = (props) => {
  const translate = useTranslate();
  const {
    input: { name, onChange, value },
    meta: { touched, error },
    isRequired,
  } = useInput(props);

  const handleBlur = useCallback((event, editor) => {
    // We only save data after user lose focus not listent onChange event
    // to prevent risk performance, slow and crash
    onChange({
      target: {
        name,
        value: editor.getData(),
      },
    });
  }, []);

  return (
    <>
      <Labeled {...props} isRequired={isRequired}>
        <CKEditor
          {...props}
          editor={ClassicEditor}
          data={value}
          // onReady={(editor) => {
          //   editor.focus();
          // }}
          onBlur={handleBlur}
          config={{
            fontColor: {
              colors: [
                { label: 'Primary', color: '#C80030' },
                { label: 'Red', color: '#FF0000' },
                { label: 'Maroon', color: '#800000' },
                { label: 'Yellow', color: '#FFFF00' },
                { label: 'Olive', color: '#808000' },
                { label: 'Lime', color: '#00FF00' },
                { label: 'Green', color: '#008000' },
                { label: 'Aqua', color: '#00FFFF' },
                { label: 'Teal', color: '#008080' },
              ],
              columns: 3, // so, you can display them in 3 columns.
            },
            toolbar: {
              items: [
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                '|',
                'bulletedList',
                'numberedList',
                '|',
                'alignment',
                'fontColor',
                'link',
                '|',
                'blockQuote',
                'mediaEmbed',
              ],
            },
            language: 'en',
            image: {
              toolbar: [
                'imageTextAlternative',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
                'toggleImageCaption',
                'linkImage',
              ],
            },
          }}
        />
      </Labeled>
      {!!(touched && error) && (
        // eslint-disable-next-line max-len
        <p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-marginDense">
          {translate(error)}
        </p>
      )}
    </>
  );
};

export default RichEditor;
