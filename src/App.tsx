import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as todosService from './api/todos';

import { ErrorMessages } from './components/ErrorsMessage';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

import { Todo } from './types/Todo';
import { Field } from './types/Field';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosCounter, setTodosCounter] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [field, setField] = useState<Field>(Field.ALL);

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

    setTodosCounter(todosActive.length);
  }, [todos]);

  const changeComplete = useCallback(
    (todoChanged?: Todo) => {
      const changedTodos = todos.map(todo => {
        if (!todoChanged) {
          return { ...todo, completed: !todo.completed };
        }

        if (todo.id !== todoChanged.id) {
          return todo;
        } else {
          return { ...todo, completed: !todo.completed };
        }
      });

      setTodos(changedTodos);
    },
    [todos],
  );

  const filteredTodos = useMemo(() => {
    const preparedTodos = [...todos];

    switch (field) {
      case Field.COMPLETED:
        return preparedTodos.filter(todo => todo.completed);
      case Field.ACTIVE:
        return preparedTodos.filter(todo => !todo.completed);
      default:
        return preparedTodos;
    }
  }, [todos, field]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          setTodos={setTodos}
          todosCounter={todosCounter}
          changeComplete={changeComplete}
        />

        {todos && (
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
            activeTodos={todosCounter}
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
