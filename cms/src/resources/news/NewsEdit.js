import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  regex,
  Toolbar,
  SaveButton,
  Button,
  ReferenceInput,
  SelectInput,
  maxLength,
  DeleteWithConfirmButton,
} from 'react-admin';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';

import { Editor, SelectCreatable, Thumbnail } from './components';
import { newsStatuses, newsLanguages } from './configs';

const useStyles = makeStyles({
  inputLength: { width: '100%', maxWidth: '500px' },
});

const EditToolbar = (props) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(push(props.basePath));
  };

  return (
    <Toolbar {...props}>
      <SaveButton />
      <Button onClick={handleCancel}>
        <>Cancel</>
      </Button>
      <DeleteWithConfirmButton />
    </Toolbar>
  );
};

const PostTitle = ({ record }) => (
  <span>{record ? `${record.title}` : ''}</span>
);

const NewsEdit = (props) => {
  const classes = useStyles();

  return (
    <Edit {...props} title={<PostTitle />}>
      <SimpleForm toolbar={<EditToolbar />} submitOnEnter={false}>
        <Thumbnail source="thumbnail" validate={required()} />
        <TextInput
          source="title"
          validate={required()}
          className={classes.inputLength}
        />
        <TextInput
          source="slug"
          placeholder="news-path"
          validate={[
            required(),
            regex(
              /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/i,
              'Slug only contains string, number and hyphen',
            ),
          ]}
          className={classes.inputLength}
        />
        <ReferenceInput
          label="Category"
          source="category"
          reference="news-categories"
          validate={required()}
          className={classes.inputLength}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput
          label="Author"
          source="author"
          reference="news-authors"
          validate={required()}
          className={classes.inputLength}
        >
          <SelectInput
            optionText={({ firstName, lastName }) => `${firstName} ${lastName}`}
          />
        </ReferenceInput>
        <SelectInput
          source="status"
          validate={required()}
          choices={newsStatuses}
          optionValue="value"
          optionText="label"
          initialValue={newsStatuses[0].value}
          className={classes.inputLength}
        />
        <SelectInput
          source="language"
          validate={required()}
          choices={newsLanguages}
          optionValue="value"
          optionText="label"
          initialValue={newsLanguages[0].value}
          className={classes.inputLength}
          disabled
        />
        <TextInput
          component="textarea"
          label="Short description"
          source="shortDescription"
          placeholder="Short description for meta data"
          multiline
          validate={[required(), maxLength(250)]}
          className={classes.inputLength}
        />
        <SelectCreatable
          label="SEO keywords"
          source="tags"
          placeholder="Eastwest, job, news, fulltime,..."
          validate={required()}
          className={classes.inputLength}
        />
        <Editor
          label="Content"
          source="htmlContent"
          placeholder="News content"
          validate={required()}
          className={classes.inputLength}
        />
      </SimpleForm>
    </Edit>
  );
};

export default NewsEdit;
