import React from 'react';
import styled from 'styled-components';
import { Droppable } from '@hello-pangea/dnd';
import Task from './task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

export default function Column(props) {
      return (
        <Container>
          <Title>{props.column.title}</Title>
          <Droppable droppableId={props.column.id}>
            {(provided, snapshot) => (
              <TaskList
                {...provided.droppableProps}
                // innerRef={provided.innerRef}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
              {props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
              {provided.placeholder}
            </TaskList>
            )}
          </Droppable>
        </Container>
      );
  }
