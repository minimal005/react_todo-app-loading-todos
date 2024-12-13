import React from 'react';
import { Form } from './Form';
import { Todo } from '../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[] | ((prevTodos: Todo[]) => Todo[])) => void;
  todosCounter: number;
  changeComplete: (todo?: Todo) => void;
};

export const Header: React.FC<Props> = ({
  todos,
  setTodos,
  todosCounter,
  changeComplete,
}) => {
  const handlChangeAllCompleted = () => {
    changeComplete();
  };

  return (
    <header className="todoapp__header">
      {todos && (
        <button
          onClick={() => handlChangeAllCompleted}
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todosCounter === todos.length,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      <Form setTodos={setTodos} />
    </header>
  );
};
