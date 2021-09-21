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

import { Editor, SelectCreatable } from './components';
import { vacancyTypes, vacancyStatuses, vacancyLanguages } from './configs';

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

const VacancyEdit = (props) => {
  const classes = useStyles();

  return (
    <Edit {...props} title={<PostTitle />}>
      <SimpleForm toolbar={<EditToolbar />} submitOnEnter={false}>
        <TextInput
          source="title"
          validate={required()}
          className={classes.inputLength}
        />
        <TextInput
          source="subTitle"
          placeholder="Engineering - Ho Chi Minh"
          validate={required()}
          className={classes.inputLength}
        />
        <TextInput
          source="slug"
          placeholder="vacancy-path"
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
          label="Department"
          source="category"
          reference="vacancy-categories"
          validate={required()}
          className={classes.inputLength}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <SelectInput
          source="type"
          validate={required()}
          choices={vacancyTypes}
          optionValue="value"
          optionText="label"
          initialValue={vacancyTypes[0].value}
          className={classes.inputLength}
        />
        <SelectInput
          source="status"
          validate={required()}
          choices={vacancyStatuses}
          optionValue="value"
          optionText="label"
          initialValue={vacancyStatuses[0].value}
          className={classes.inputLength}
        />
        <SelectInput
          source="language"
          validate={required()}
          choices={vacancyLanguages}
          optionValue="value"
          optionText="label"
          initialValue={vacancyLanguages[0].value}
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
          placeholder="Eastwest, job, vacancy, fulltime,..."
          validate={required()}
          className={classes.inputLength}
        />
        <Editor
          label="Content"
          source="htmlContent"
          placeholder="Vacancy content"
          validate={required()}
          className={classes.inputLength}
        />
      </SimpleForm>
    </Edit>
  );
};

export default VacancyEdit;
