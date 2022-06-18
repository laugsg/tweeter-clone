# Key points

Most complete commit : https://github.com/udacity/reactnd-chirper-app/commit/512ddca69dd99d67acf4b9795b1000c2e728e899

## Receiving the data

1. Create Actions that transport the data
   ```
   const VAL = 'VAL'
   valAction(val) => ({type:VAL, val})
   ```
2. Create an Asynchronous 'Shared' Action that:
      1. the Asynchronous Pattern exposes 'dispatch' method
        ```
        function asyncExposeDispatch(){
            return (dispatch) => {
                return x
            }
        }
        ```
      2. request for the data : getInitialData returns a Promise with data
      3. import the Action Creators that receive data
      4. dispatch the actionCreators(data) to the Reducers
3. Create Reducers to modify the State based on the Actions
      ```
        /** How-to create a Reducer
        * From their most simple form, a Reducers is a function that filter.
        * Inside of their body, It filters Types of Actions to achive
        * specific task that targets the Store state through their return.
        */
        function reducerF(state = {}, action){
          switch(action.type){
            case ACTION_ONE:
              return { ...previousState, ...newState }
          }
        }
      ```
4. Combine them within combineReducers({})
5. Create the Store
      1. import { createStore } from 'redux'
      2. import { Provider } from 'react-redux'
      3. import reducers from './reducers' (reducers folder exports as default combineReducers({}) inside index.js)
      4. store = createStore(reducers)
      5. Provider as App wrapper passing the store as prop
      ```
      <Provider store={store}>
           <App />
      </Provider>
      ```
6. Create middlewares
      1. Middlewares use the Curring Pattern: `(store) => (next) => (action) => {}`
      2. they finish when next is invoked pass in action: 
         1. `next(action)`
         2. return the variable that holds next(action)
            ```
            const returnValue = next(action)
            ...
            return returnValue
            ```
      3. import middlewares to applyMiddleware() within `middlewares/index.js`
      4. export as default applyMiddleware() from index.js
      5. import middlewares from './middlewares' into app root index.js
      6. grab middlewares into createStore as createStore(reducers,middlewares)
7. Connect the App
      1. import { connect } from 'react-redux'
      2. import { handleInitialData } from '../actions/shared' : Async Action
      3. export default connect()(App) : connect pass in dispatch by default
      4. within componentDidMoun dispatch handleInitialData : `componentDidMoun(){this.props.dispatch(handleInitialData())}`
8. react-redux-loading : implements a loading bar
      1. reducer: import { loadingBarReducer } from 'react-redux-loading' and pass it as `loadingBar:loadingBarReducer`
      2. actions: import { showLoading, hideLoading } from 'react-redux-loading'
            1. before request for data dispatch showLoading()
            2. after dispatch all data needed, dispatch hideLoading()
      3. component: import LoadingBar from 'react-redux-loading' into App.js and place it at the top
9. Toggle Like Tweet : Asynchronous Action
      1. action: optimistic update - update the store first, then make the request, then catch the error, 
            1. if no errors: nothing happens
            2. if errors: alert the error, dispatch the oposite action needed to resotre the item into their initial state
      2. reducer: include the case into correspondent reducer (tweet)

