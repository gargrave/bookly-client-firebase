// @flow
import React from 'react';
import { any, array, func, bool, string} from 'prop-types';

import { buildClasses } from '../../../utils/cssHelpers';

import Alert from '../../common/Alert';
import Button from '../../common/Button';

import './styles.css';

type Props = {
  cancelBtnText?: string,
  children?: any,
  classes?: string[],
  disabled?: boolean,
  onCancel?: Function,
  onSubmit: Function,
  submitBtnText?: string,
  submitDisabled?: boolean,
  topLevelError?: string,
};

function Form({
  cancelBtnText,
  children,
  classes,
  disabled,
  onCancel,
  onSubmit,
  submitBtnText,
  submitDisabled = false,
  topLevelError,
}: Props) {
  return (
    <div>
      {topLevelError &&
        <Alert
          message={topLevelError}
          type="danger"
        />
      }
      <form
        className={buildClasses(['form', ...(classes || [])])}
        onSubmit={onSubmit}
        noValidate>

        {children}

        <div className="input-field">
          <Button
            canSubmit={true}
            disabled={submitDisabled || disabled || false}
            onClick={onSubmit}
            position="left"
            text={submitBtnText || "Submit"}
            type="success"
          />

          {onCancel &&
            <Button
              classes="float-right"
              onClick={onCancel}
              text={cancelBtnText || "Cancel"}
              type="light"
            />
          }
        </div>
      </form>
    </div>
  );
}

Form.propTypes = {
  cancelBtnText: string,
  children: any,
  classes: array,
  disabled: bool,
  onCancel: func,
  onSubmit: func.isRequired,
  submitBtnText: string,
  submitDisabled: bool,
  topLevelError: string,
};

export default Form;
