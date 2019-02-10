import React, { useContext, useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBProgress, MDBBtn } from 'mdbreact';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';
import Dropzone from './Dropzone';
import Loadable from '../../shared/Loadable';
import './dashboard.scss';

export default () => {
  const { userDataReady } = useContext(AuthContext);

  // wait for the user data to be ready before rendering
  const LoadableDashboard = Loadable(async () => {
    await userDataReady;
    return Dashboard;
  });

  return <LoadableDashboard />
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [fileMeta, setFileMeta] = useState([]);

  const onDrop = (acceptedFiles, rejectedFiles) => {
    // console.log('rejected', rejectedFiles);

    // @TODO use memoization to prevent effect from running every time file meta changes, instead of cloning
    setFiles(acceptedFiles);
    setFileMeta([...acceptedFiles]);
  };

  useEffect(() => {
    files.forEach((file, idx) => {
      const reader = new FileReader();

      reader.onload = async () => {
        await axios.request({
          url: `/api/file/${file.name}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          data: reader.result,
          onUploadProgress: (progress) => {
            if (progress.lengthComputable) {
              setMetaForFile(idx, { progress: (progress.loaded / progress.total) * 100 });
            }
          }
        });
      };

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.readAsArrayBuffer(file);
    });
  }, [files]);

  const setMetaForFile = (idx, meta) => {
    // important to use callback form here, else state hooks queue and will always merge with original empty array
    setFileMeta((prevFileMeta) => [
      ...prevFileMeta.slice(0, idx),
      {...prevFileMeta[idx], ...meta },
      ...prevFileMeta.slice(idx + 1)
    ]);
  };

  // @TODO memoize the cards against the individual properties for each item in the fileMeta array so they dont all get re-rendered when fileMeta changes
  // const child1 = useMemo(() => <Child1 a={a} />, [a]);

  return (
    <MDBContainer className="mt-3">
      <MDBRow>
        <MDBCol>
          <h1 className="h1-responsive">Welcome, {user.name}</h1>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        {files.length > 0 ? (
          <>
            {files.map((file, idx) => (
              <MDBCol key={file.name} md="4" className="my-3">
                <MDBCard className="file-card">
                  <MDBCardBody>
                    <MDBCardTitle>Edit Details</MDBCardTitle>
                    <form>
                      <label htmlFor="filename">Name</label>
                      <input id="filename" type="text" className="form-control" value={file.name} onChange={e => fileMeta(idx, { name: e.target.value })} />
                      {/* <label htmlFor="tags">Name</label> */}
                      {/* <input id="tags" type="text" className="form-control" value={(fileMeta.tags || '').join(',')} onChange={e => setMetaForFile(idx, { tags: e.target.value.split(',') })} /> */}
                    </form>
                    {fileMeta[idx].progress === 100
                      ? (
                        <MDBBtn className="my-3">Save</MDBBtn>
                      ) : (
                        <MDBProgress value={fileMeta[idx].progress} className="my-2" />
                      )
                    }
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </>
        ) : (
            <MDBCol>
              <Dropzone onDrop={onDrop} />
            </MDBCol>
          )
        }
      </MDBRow>
    </MDBContainer>
  );
};