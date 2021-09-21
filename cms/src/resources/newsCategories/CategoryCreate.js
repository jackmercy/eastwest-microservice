import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  regex,
  Toolbar,
  SaveButton,
  Button,
  SelectInput,
  maxLength,
} from 'react-admin';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';

import { SelectCreatable } from '../news/components';
import { newsLanguages } from '../news/configs';

const useStyles = makeStyles({
  inputLength: { width: '100%', maxWidth: '500px' },
});

const CreateToolbar = (props) => {
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
    </Toolbar>
  );
};

const CategoryCreate = (props) => {
  const classes = useStyles();

  return (
    <Create {...props}>
      <SimpleForm
        toolbar={<CreateToolbar />}
        submitOnEnter={false}
        redirect={(basePath) => basePath}
      >
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
    </Create>
  );
};

export default CategoryCreate;
