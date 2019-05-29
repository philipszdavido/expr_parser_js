import React, { Component, useReducer, useContext, useState } from 'react';
import { render } from 'react-dom';
import './style.css';

const MyContext = React.createContext()
const MyProvider = MyContext.Provider;
const log = console.log

function connect(mapStateToProps, mapDispatchToProps) {
    return function (Component) {
        return function () {
            const {state, dispatch} = useContext(MyContext)
            const stateToProps = mapStateToProps(state)
            const dispatchToProps = mapDispatchToProps(dispatch)
            const props = {...props, ...stateToProps, ...dispatchToProps}
            return (
                <Component {...props} />
            )
        }
    }
}

function FirstC(props) {
    return (
        <div>
            <h3>{props.books}</h3>
            <button onClick={()=>props.dispatchAddBook("Dan Brown: Origin")}>Dispatch</button>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        books: state.Books
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchAddBook: (payload)=> dispatch({type: 'ADD_BOOK', payload})
    }
}

const HFirstC = connect(mapStateToProps, mapDispatchToProps)(FirstC)

function App () {
    const initialState =  {
      Books: 'Dan Brown: Inferno'
    }
    const [state, dispatch] = useReducer((state, action) => {
      switch(action.type) {
        case 'ADD_BOOK':
          return {Books: action.payload}
        default: 
          return state
      }
    }, initialState);
    return (
        <div>
            <MyProvider value={{state, dispatch}}>
                <HFirstC />
            </MyProvider>
        </div>
    )
}

render(<App />, document.getElementById('root'));
