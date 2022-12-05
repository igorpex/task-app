import React from 'react';
import styled from 'styled-components';
import { Draggable } from '@hello-pangea/dnd';

// const Container = (props) => {
//   const ContainerWrapper = styled.div
//   `border: 1px solid lightgrey;
//   border-radius: 2px;
//   padding: 8px;
//   margin-bottom: 8px;
//   // background-color: white;
//   background-color: ${props.isDragging ? 'lightgreen': 'white'};
//   `
//   // return ContainerWrapper
//   return <ContainerWrapper {...props} ref={props.innerRef}>{props.children}</ContainerWrapper>
// };

  // return <ContainerWrapper>{props.children}</ContainerWrapper>
const Container = styled.div
`border: 1px solid lightgrey;
border-radius: 2px;
padding: 8px;
margin-bottom: 8px;
// background-color: white;
background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`

export default function Task(props) {
    return(
      <Draggable draggableId={props.task.id} index={props.index}>
        {(provided, snapshot) => (
          <Container 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // innerRef={provided.innerRef}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {props.task.content}
          </Container>)}
      </Draggable>
    )
}