import { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Content } from '../../components';
import { StaticHTML, Button } from '../../../components';

import useStyles from './jobDescription.styles';

const JobDescription = ({ htmlContent, onApply }) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Content className={classes.content}>
      <div className="ck-content" data-test="job-description-preview">
        <StaticHTML stringHtml={htmlContent} />
      </div>
      <Button
        color="primary"
        className={classes.button}
        dataTest="job-description-button"
        onClick={onApply}
      >
        {intl.formatMessage({ id: 'VACANCY.APPLY_NOW' })}
      </Button>
    </Content>
  );
};
JobDescription.propTypes = {
  htmlContent: PropTypes.string.isRequired,
  onApply: PropTypes.func.isRequired,
};

export default memo(JobDescription);
