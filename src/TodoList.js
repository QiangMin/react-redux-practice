import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import store from './store';
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from "./store/actionCreators";

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        store.subscribe(this.handleStoreChange);

    }
    render() {
        return (
            <div style={{ margin: '10px' }}>
                <div>
                    <Input value={this.state.inputValue}
                        placehold='todo info'
                        style={{ width: '300px', marginRight: '10px' }}
                        onChange={this.handleInputChange}>

                    </Input>
                    <Button type='primary'
                        onClick={this.handleBtnClick}
                    >提交</Button>
                </div>
                <List
                    style={{ marginTop: '10px', width: '300px' }}
                    bordered
                    dataSource={this.state.list}
                    renderItem={(item, index) => (
                        <List.Item onClick={this.handleItemDelete.bind(this, index)}>
                            {item}
                        </List.Item>
                    )}
                />
            </div>
        )
    }

    handleInputChange(e) {
        /*  const action = {
             type: CHANGE_INPvT_VALUE,
             value: e.target.value,
         } */
        const action = getInputChangeAction(e.target.value);
        console.log('action', action);
        store.dispatch(action);
    }
    handleStoreChange() {
        this.setState(store.getState());
        console.log('store change');
    }
    handleBtnClick() {
        /*  const action = {
             type: ADD_TOTO_ITEM,
         }; */
        const action = getAddItemAction();
        store.dispatch(action);
    }
    handleItemDelete(index) {
        /* const action = {
            type: DELETE_TODO_ITEM,
            index
        } */
        const action = getDeleteItemAction(index);
        store.dispatch(action);
    }
}

export default TodoList;