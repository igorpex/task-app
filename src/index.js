import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from '@hello-pangea/dnd';
import initialData from './initial-data';
import Column from './column';


const root = ReactDOM.createRoot(document.getElementById('root'));
const Container = styled.div`
  display: flex;
`;

function App() {
  const [state, setState] = useState(initialData);
  
  const onDragEnd = result => {//TODO: reoreder column
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
      return
    }
    // const column = state.columns[source.droppableId];
    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    // Moving inside of the same list
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }
  
      setState({
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        }
      })
      return
    }

    // Moving from one list to other
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish= {
      ...finish,
      taskIds: finishTaskIds,
    }
    setState({
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    })
  }

  return(
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        {state.columnOrder.map(columnId => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    </Container>
    )
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

