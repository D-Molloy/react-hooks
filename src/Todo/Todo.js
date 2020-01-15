import React, { useReducer, useContext, useEffect, useRef } from 'react';

const appReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: Date.now(),
          text: '',
          completed: false
        }
      ];
    case 'delete':
      return state.filter(item => item.id !== action.payload);
    case 'completed':
      return state.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            completed: !item.completed
          };
        }
        return item;
      });
    case 'reset':
      console.log('action.payload', action.payload);
      return action.payload;
    case 'updateText':
      return state.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            text: action.payload.value
          };
        }
        return item;
      });
    default:
      return state;
  }
};

const Context = React.createContext();

const useEffectOnce = cb => {
  // didRun is now an object with a property of `current`
  // current is designed to be immutable
  const didRun = useRef(false);
  useEffect(() => {
    if (!didRun.current) {
      cb();

      didRun.current = true;
    }
  });
};

export default function TodosApp() {
  // using use reducer because we indirect children that need the state
  // will pass state down via use context
  const [state, dispatch] = useReducer(appReducer, []);

  // We could just pass the empty array to get it to run once
  // useEffect(() => {
  //   const raw = localStorage.getItem('data');
  //   dispatch({ type: 'reset', payload: JSON.parse(raw) });
  // }, []);
  // instead use useRef && a custom hook
  useEffectOnce(() => {
    const raw = localStorage.getItem('data');
    dispatch({ type: 'reset', payload: JSON.parse(raw) });
  });

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(state));
  }, [state]);

  return (
    <Context.Provider value={dispatch}>
      <h1>Todos App</h1>
      <button onClick={() => dispatch({ type: 'add' })}>New Todo</button>
      <br></br>
      <br></br>
      <TodosList items={state} />
    </Context.Provider>
  );
}

function TodosList({ items }) {
  return items.map(item => {
    return <TodoItem key={item.id} {...item} />;
  });
}

function TodoItem({ id, completed, text }) {
  const dispatch = useContext(Context);

  return (
    <div>
      <input
        type='checkbox'
        checked={completed}
        onChange={() => dispatch({ type: 'completed', payload: id })}
      />
      <input
        type='text'
        value={text}
        onChange={e =>
          dispatch({
            type: 'updateText',
            payload: { id, value: e.target.value }
          })
        }
      />
      <button onClick={() => dispatch({ type: 'delete', payload: id })}>
        X
      </button>
    </div>
  );
}
