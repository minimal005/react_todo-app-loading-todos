import React from 'react';

import { Field } from '../types/Field';

import cn from 'classnames';

type Props = {
  field: Field;
  setField: (field: Field) => void;
  activeTodos: number;
};

export const Footer: React.FC<Props> = ({ field, setField, activeTodos }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {[Field.ALL, Field.ACTIVE, Field.COMPLETED].map(link => (
          <a
            key={link}
            onClick={() => setField(link)}
            href="#/"
            className={cn('filter__link', { selected: field === link })}
            data-cy={`FilterLink${link}`}
          >
            {link}
          </a>
        ))}

        {/* <a
          onClick={() => setField(Field.ACTIVE)}
          href="#/active"
          className={cn('filter__link', { selected: field === Field.ACTIVE })}
          data-cy={`FilterLink${link}`}
        >
          Active
        </a>

        <a
          onClick={() => setField(Field.COMPLETED)}
          href="#/completed"
          className={cn('filter__link', {
            selected: field === Field.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a> */}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
