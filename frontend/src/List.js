import React, { Component } from 'react'
import { getList, addToList, deleteItem, updateItem } from './ListFunctions'

class List extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            term: '',
            editDisabled: false,
            items: []
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount () {
        this.getAll()
    }

    onChange = event => {
        this.setState({
            term: event.target.value,
            editDisabled: false
        })
    }

    getAll = () => {
        getList().then(data => {
            this.setState(
                {
                    term: '',
                    items: [...data]
                },
                () => {
                    console.log(this.state.term)
                }
            )
        })
    }

    onSubmit = e => {
        e.preventDefault()
        // Prevent empty submissions
        if (!this.state.term || this.state.term.trim() === '') {
            alert('Please enter a task name')
            return
        }
        // clear any edit id so submit always creates a new item
        this.setState({ editDisabled: false, id: '' })
        addToList(this.state.term).then(() => {
            this.getAll()
        })
    }

    onUpdate = e => {
        e.preventDefault()
        // Prevent empty updates
        if (!this.state.term || this.state.term.trim() === '') {
            alert('Please enter a task name')
            return
        }
        updateItem(this.state.term, this.state.id).then(() => {
            this.getAll()
            // clear edit state after successful update
            this.setState({ id: '', term: '', editDisabled: false })
        })
    }

    onEdit = (item, itemid, e) => {
        e.preventDefault()
        this.setState({
            id: itemid,
            term: item
        })
        console.log(itemid)
    }

    onCancelEdit = () => {
        this.setState({ id: '', term: '', editDisabled: false })
    }

    onDelete = (val, e) => {
        e.preventDefault()
        deleteItem(val)

        var data = [...this.state.items]
        data.filter((item, index) => {
            if (item[1] === val) {
                data.splice(index, 1)
            }
            return true
        })
        this.setState({ items: [...data] })
    }

    render () {
        return (
            <div className="col-md-12">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="input1">Task Name</label>
                        <div className="row">
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="input1"
                                    value={this.state.term || ''}
                                    onChange={this.onChange.bind(this)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault()
                                            if (this.state.id) {
                                                this.onUpdate(e)
                                            } else {
                                                this.onSubmit(e)
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <div className="col-md-2">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    disabled={!this.state.id}
                                    onClick={this.onUpdate.bind(this)}>
                                    {this.state.id ? 'Update' : 'Edit item'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <button 
                        type={this.state.id ? 'button' : 'submit'}
                        className="btn btn-success btn-block"
                        disabled={this.state.id !== ''}
                        onClick={this.state.id ? this.onCancelEdit : this.onSubmit.bind(this)}
                    >
                        {this.state.id ? 'Cancel edit' : 'Submit'}
                    </button>
                </form>

                <table className="table">
                    <tbody>
                        {this.state.items.map((item, index) => (
                            <tr key={index}>
                                <td className="text-left">{item[0]}</td>
                                <td className="text-right">
                                    <button
                                        className="btn btn-info mr-1"
                                        disabled={this.state.editDisabled}
                                        onClick={this.onEdit.bind(this, item[0], item[1])}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        disabled={this.state.editDisabled}
                                        onClick={this.onDelete.bind(this, item[1])}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List