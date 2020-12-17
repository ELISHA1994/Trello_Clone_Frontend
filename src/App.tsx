import React from 'react'
import { Column } from "./Column"
import { Card } from "./Card"
import { AppContainer } from "./styles"
import { AddNewItem } from "./AddNewItem"

function App() {
  return (
      <AppContainer>
        <Column text="To Do">
            <Card text="Generate app scaffold" />
        </Column>
          <Column text="In Progress">
              <Card text="Learn Typescript" />
          </Column>
          <Column text="Done">
              <Card text="Begin to use static typing" />
          </Column>
          <AddNewItem onAdd={console.log} toggleButtonText=" + Add another list" />
      </AppContainer>
  );
}

export default App;
