import './employers-add-form.css';
import { Component } from 'react';
class EmployersAddForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }
    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const {name, salary} = this.state;
        const {onAdd} = this.props;
        const defValue = {
            name: '',
            salary: ''
        };
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex">
                    <input type="text"
                        onChange={this.onValueChange}
                        className="form-control new-post-label"
                        name="name"
                        value={name}
                        placeholder="Как его зовут?" />
                    <input type="number"
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange}
                        className="form-control new-post-label"
                        placeholder="З/П в $?" />
                    <button type="submit"
                            onClick={(e) => {e.preventDefault();onAdd({...this.state});this.setState(defValue)}}
                            className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
}

export default EmployersAddForm;