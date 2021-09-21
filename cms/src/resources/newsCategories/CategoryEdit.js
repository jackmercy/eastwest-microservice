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
  SelectInput,
  maxLength,
  DeleteWithConfirmButton,
} from 'react-admin';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';

import { SelectCreatable } from '../news/components';
import { newsLanguages } from '../news/configs';

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

const CategoryEdit = (props) => {
  const classes = useStyles();

  return (
    <Edit {...props} title={<PostTitle />}>
      <SimpleForm toolbar={<EditToolbar />} submitOnEnter={false}>
        <TextInput
          source="name"
          validate={required()}
          className={classes.inputLength}
        />
        <TextInput
          source="slug"
          placeholder="category-path"
          validate={[
            required(),
            regex(
              /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/i,
              'Slug only contains string, number and hyphen',
            ),
          ]}
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
      </SimpleForm>
    </Edit>
  );
};

export default CategoryEdit;
