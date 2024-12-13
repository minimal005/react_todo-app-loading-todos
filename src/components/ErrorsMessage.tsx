import React from 'react';
import cn from 'classnames';

type Props = {
  errorMessage: string;
  setErrorMessage: (error: string) => void;
};

export const ErrorMessages: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage,
      })}
    >
      <button
        onClick={() => setErrorMessage('')}
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />
      {/* show only one message at a time */}
      {errorMessage}
      {/*<br />
             Title should not be empty */}
      {/*<br />
             Unable to add a todo */}
      {/* <br />
            Unable to delete a todo */}
      {/* <br />
            Unable to update a todo */}
    </div>
  );
};
