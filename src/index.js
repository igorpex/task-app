import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '@atlaskit/css-reset';
import initialData from './initial-data';
import Column from './column';


const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  const [state, setState] = useState(initialData);
    return state.columnOrder.map(columnId => {
      const column = state.columns[columnId];
      const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
      // return column.title;
      return <Column key={column.id} column={column} tasks={tasks} />;
    });
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

