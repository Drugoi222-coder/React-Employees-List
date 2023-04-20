import './employers-add-form.css';
import { Component, ChangeEvent } from 'react';

interface Employee {
    name: string;
    salary: number;
    increase: boolean;
    id: number;
    rise: boolean;
}

interface IProps {
    onAdd: (obj: Employee) => void;
    maxId: number;
}

interface IState {
    [key: string]: string;
}

class EmployersAddForm extends Component<IProps,IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }
    onCreateEmployee = (id: number): Employee => {
        return {
            name: this.state.name,
            salary: Number(this.state.salary),
            increase: false,
            id: ++id,
            rise: false
        }
    }
    onValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const {name, salary} = this.state;
        const {onAdd,maxId} = this.props;
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
                            onClick={(e) => {e.preventDefault();onAdd(this.onCreateEmployee(maxId));this.setState(defValue)}}
                            className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
}

export default EmployersAddForm;