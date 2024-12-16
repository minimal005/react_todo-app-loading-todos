import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as todosService from './api/todos';

import { ErrorMessages } from './components/ErrorsMessage';
import TodoList from './components/TodoList';
import { Footer } from './components/Footer';
import Header from './components/Header';

import { Todo } from './types/Todo';
import { Field } from './types/Field';
import { preparedTodos } from './service/service';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [field, setField] = useState<Field>(Field.ALL);

  const todosCounter = useRef(0);

  useEffect(() => {
    todosService
      .getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => setErrorMessage(''), 4000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  useEffect(() => {
    const todosActive = todos.filter(todo => !todo.completed);

    todosCounter.current = todosActive.length;
  }, [todos]);

  const changeComplete = useCallback(
    (todoChanged?: Todo) => {
      const changedTodos = todos.map(todo => {
        if (todo.id !== todoChanged?.id) {
          return todo;
        } else {
          return { ...todo, completed: !todo.completed };
        }
      });

      setTodos(changedTodos);
    },
    [todos],
  );

  const filteredTodos = preparedTodos(todos, field);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          setTodos={setTodos}
          todosCounter={todosCounter.current}
          changeComplete={changeComplete}
        />

        {!!todos.length && (
          <TodoList
            filteredTodos={filteredTodos}
            changeComplete={changeComplete}
            setTodos={setTodos}
          />
        )}

        {!!todos.length && (
          <Footer
            field={field}
            setField={setField}
            activeTodos={todosCounter.current}
          />
        )}
      </div>

      <ErrorMessages
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
