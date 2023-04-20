import './employers-add-form.css';
import { Component, MouseEvent, ChangeEvent } from 'react';
import { Employee } from '../../TS/interfaces';

interface IProps {
    onAdd: (obj: Employee) => void;
    maxId: number;
}

// Компонент с формой добавления сотрудника
class EmployersAddForm extends Component<IProps, Partial<Employee>> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: '',
            salary: 0,
        };
    }
    // Создание объекта с информацие о сотруднике
    onCreateEmployee = (id: number): Employee => {
        return {
            name: this.state.name,
            salary: Number(this.state.salary),
            increase: false,
            id: ++id,
            rise: false,
        };
    };
    // Отслеживание изменения имени в поле ввода имени
    onValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    // Добавление сотрудника из формы в список
    pushEmployee = (e: MouseEvent<HTMLButtonElement>): void => {
        const { onAdd, maxId } = this.props;
        const defValue = {
            name: '',
            salary: 0,
        };
        e.preventDefault();
        onAdd(this.onCreateEmployee(maxId));
        this.setState(defValue);
    };
    render() {
        const { name, salary } = this.state;
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form className="add-form d-flex">
                    <input
                        type="text"
                        onChange={this.onValueChange}
                        className="form-control new-post-label"
                        name="name"
                        value={name}
                        placeholder="Как его зовут?"
                    />
                    <input
                        type="number"
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange}
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                    />
                    <button
                        type="submit"
                        onClick={this.pushEmployee}
                        className="btn btn-outline-light"
                    >
                        Добавить
                    </button>
                </form>
            </div>
        );
    }
}

export default EmployersAddForm;
