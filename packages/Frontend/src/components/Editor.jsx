import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import 'quill-cursors/dist/quill-cursors.css';
import 'react-quill/dist/quill.snow.css';

export default function Editor({
  modules, onChangeSelection, readOnly, setRef, value,
}) {
  return (
    <ReactQuill
      modules={modules}
      onChangeSelection={onChangeSelection}
      readOnly={readOnly}
      ref={setRef}
      value={value}
    />
  );
}

Editor.propTypes = {
  modules: PropTypes.shape({
    toolbar: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  }),
  onChangeSelection: PropTypes.func,
  readOnly: PropTypes.bool,
  setRef: PropTypes.func,
  value: PropTypes.string.isRequired,
};

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

Editor.defaultProps = {
  modules,
  onChangeSelection: Function.prototype,
  readOnly: false,
  setRef: Function.prototype,
};
