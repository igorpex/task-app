import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import initialData from './initial-data';
import Column from './column';


const root = ReactDOM.createRoot(document.getElementById('root'));
const Container = styled.div`
  display: flex;
`;

class InnerList extends React.PureComponent {
  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return <Column column={column} tasks={tasks} index={index} />;
  }
}

function App() {
  const [state, setState] = useState(initialData);
  
  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
      return
    }

    if(type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId)
      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      }
      setState(newState);
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {provided => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId];
              
              return (
                <InnerList
                  key={column.id}
                  column={column}
                  index={index}
                  taskMap={state.tasks}
                />
              );
            }
            )}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>  
    </DragDropContext>

    )
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

