import React, { useEffect, useState } from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  EmailField,
  TopToolbar,
  DeleteWithConfirmButton,
  ListButton,
  ReferenceField,
  useRecordContext,
  showNotification,
  Labeled,
  UrlField,
} from 'react-admin';
import { ArrowBack } from '@material-ui/icons';
import { Button } from '@material-ui/core';

import { apiUtil, storageUtil } from '../../utils';

const Actions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <ListButton
      label="Back to List Applications"
      basePath={basePath}
      icon={<ArrowBack />}
    />
    <DeleteWithConfirmButton
      basePath={basePath}
      record={data}
      resource={resource}
      confirmTitle="Confirm delete"
      confirmContent="Are you sure when delete this record?"
    />
  </TopToolbar>
);

const DownloadAvatar = (props) => {
  const { record } = useRecordContext(props);
  const [avatar, setAvatar] = useState({ src: '', name: '' });
  const [loading, setLoading] = useState(true);

  const handleFetchingAvatar = () => {
    const auth = storageUtil.getAuth();
    const request = new Request(`${apiUtil.files.private}/${record.avatar}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: auth.token ? `Bearer ${auth.token}` : '',
      }),
    });

    return fetch(request)
      .then((response) => Promise.all([response, response.blob()]))
      .then(([response, blob]) => {
        const filename = response.headers
          .get('content-disposition')
          .split('filename=')[1];
        const url = window.URL.createObjectURL(blob);
        setAvatar({ ...avatar, src: url, name: filename.replace(/"/g, '') });
      })
      .catch(() => {
        showNotification('Cannot download the file');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDownloadAvatar = () => {
    const link = document.createElement('a');
    link.href = avatar.src;
    link.download = avatar.name;
    link.click();
  };

  useEffect(() => {
    handleFetchingAvatar();
  }, []);

  return (
    <>
      <a
        title="View full"
        rel="noreferrer"
        href={avatar.src}
        target="_blank"
        style={{ display: 'block' }}
      >
        <img
          alt="avatar"
          style={{
            display: 'block',
            width: '120px',
            height: '120px',
            marginBottom: '16px',
            borderRadius: '50%',
          }}
          src={avatar.src || 'https://forum.waka.vn/assets/avatars/default.svg'}
        />
      </a>
      {!loading ? (
        <Button color="primary" onClick={handleDownloadAvatar}>
          Download avatar
        </Button>
      ) : null}
    </>
  );
};

const DownloadResumes = (props) => {
  const { record } = useRecordContext(props);

  const handleDownloadFile = (fileId) => {
    const auth = storageUtil.getAuth();
    const request = new Request(`${apiUtil.files.private}/${fileId}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: auth.token ? `Bearer ${auth.token}` : '',
      }),
    });

    return fetch(request)
      .then((response) => Promise.all([response, response.blob()]))
      .then(([response, blob]) => {
        const filename = response.headers
          .get('content-disposition')
          .split('filename=')[1];
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename.replace(/"/g, '');
        link.click();
      })
      .catch(() => {
        showNotification('Cannot download the file');
      });
  };

  return record.resumes && record.resumes.length > 0 ? (
    <Labeled label="Attachments">
      <>
        {record.resumes.map((resume) => (
          <Button
            color="primary"
            key={resume}
            style={{ display: 'block' }}
            onClick={() => handleDownloadFile(resume)}
          >
            {resume}
          </Button>
        ))}
      </>
    </Labeled>
  ) : null;
};

const LinkedInField = (props) => {
  const { record } = useRecordContext(props);

  const isValidUrl = () => {
    const result = record.linkedinProfile.match(
      // eslint-disable-next-line max-len, no-useless-escape
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    return result !== null;
  };

  return (
    <Labeled label="Linkedin Profile">
      {!isValidUrl() ? (
        <TextField {...props} source="linkedinProfile" />
      ) : (
        <UrlField {...props} source="linkedinProfile" target="_blank" />
      )}
    </Labeled>
  );
};

const ApplicationEdit = (props) => (
  <Show {...props} actions={<Actions />}>
    <SimpleShowLayout>
      <DownloadAvatar source="avatar" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="emailAddress" />
      <TextField source="phoneNumber" />
      <TextField source="address" />
      <LinkedInField source="linkedinProfile" />
      <TextField source="knownFrom" />
      <ReferenceField label="Apply job" source="vacancy" reference="vacancies">
        <TextField source="title" />
      </ReferenceField>
      <DateField source="createdAt" showTime />
      <DownloadResumes source="resumes" />
    </SimpleShowLayout>
  </Show>
);
export default ApplicationEdit;
