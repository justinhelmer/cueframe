import React from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { fromEvent } from 'file-selector';

export default ({ onDrop }) => {
  return (
    <Dropzone
      onDrop={onDrop}
      getDataTransferItems={e => fromEvent(e)}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div {...getRootProps()} className={classNames('dropzone', { 'active': isDragActive })}>
          <input {...getInputProps()} />
          <div className="d-flex flex-column justify-content-center h-100 align-items-center">
            {isDragActive ? (
              <div className="fa fa-upload fa-5x grey-text"></div>
            ) : (
                <>
                  <h2 className="h2-responsive grey-text">
                    Drop files here
                      </h2>
                  <h3 className="h3-responsive grey-text">
                    (or click to select files to upload)
                      </h3>
                </>
              )}
          </div>
        </div>
      )}
    </Dropzone>
  );
}