import { Component } from 'react';
import { Employee } from '../../TS/interfaces';
import { Filter } from '../../TS/enums';
import { togglingFilter } from '../../TS/types';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';
import './app.css';

interface IState {
    data: Employee[];
    term: string;
    filter: Filter;
}

type TStateData = IState['data']; // Данные состояния
type TStateFilter = IState['filter']; // Фильтры состояния

// Основной компонент
class App extends Component<{}, IState> {
    maxId: number;

    constructor(props: {}) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Bogdan G.',
                    salary: 800,
                    increase: false,
                    id: 1,
                    rise: true,
                },
                {
                    name: 'Timothy D.',
                    salary: 500,
                    increase: true,
                    id: 2,
                    rise: false,
                },
                {
                    name: 'Alex A.',
                    salary: 1200,
                    increase: false,
                    id: 3,
                    rise: false,
                },
            ],
            term: '',
            filter: Filter.ALL,
        };
        this.maxId = this.state.data[this.state.data.length - 1].id;
    }
    // Удаление работника из списка
    deleteItem = (id: typeof this.maxId): void => {
        this.setState(({ data }) => ({
            data: data.filter((item) => item.id !== id),
        }));
    };
    // Добавление работника в список
    addItem = (obj: Employee): void => {
        this.setState(({ data }) => {
            if (obj.name.length >= 3 && String(obj.salary).length > 0) {
                return {
                    data: [...data, obj],
                };
            }
        });
    };
    // Переключение свойств работников: премия/повышение.
    // В приложении премия - печенька, повышение - звёздочка.
    onToggleProp = (id: typeof this.maxId, prop: togglingFilter): void => {
        this.setState(({ data }) => ({
            data: data.map((item) => {
                if (item.id === id && prop in item) {
                    return { ...item, [prop]: !item[prop] };
                }
                return item;
            }),
        }));
    };
    // Поиск сотрудника в списке
    searchEmp = (items: TStateData, term: string): TStateData => {
        if (term.length === 0) {
            return items;
        } else {
            return items.filter((i) => {
                return i.name.indexOf(term) > -1;
            });
        }
    };
    // Обновление списка при вводе с клавиатуры
    onUpdateSearch = (term: string): void => {
        this.setState({ term });
    };
    // Фильтрация сотрудников в списке
    onFilter = (items: TStateData, filter: TStateFilter): TStateData => {
        switch (filter) {
            case Filter.RISE:
                return items.filter((item) => item.rise);
            case Filter.MORE:
                return items.filter((item) => item.salary > 1000);
            default:
                return items;
        }
    };
    // Выбор фильтра
    onFilterSelect = (filter: TStateFilter): void => {
        this.setState({ filter });
    };
    // Изменение зарплаты текущих работников
    onSalaryChange = (id: typeof this.maxId, value: number): void => {
        this.setState(({ data }) => {
            return {
                data: data.map((item) => {
                    if (item.id === id) {
                        item.salary = Number(String(value).slice(0, -1));
                        return { ...item };
                    }
                    return item;
                }),
            };
        });
    };
    render() {
        const { data, term, filter } = this.state;
        const visibleData = this.onFilter(this.searchEmp(data, term), filter); // Отфильтрованный список сотрудников
        const generalEmployees = data.length; // Количество всех сотрудников
        const premiumEmployees = data.filter((i) => i.increase).length; // Количество сотрудников с премией
        return (
            <main className="app">
                <AppInfo
                    genAmount={generalEmployees}
                    premAmount={premiumEmployees}
                />
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter
                        onFilterSelect={this.onFilterSelect}
                        filter={this.state.filter}
                    />
                </div>
                <EmployersList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onSalaryChange={this.onSalaryChange}
                />
                <EmployersAddForm maxId={this.maxId} onAdd={this.addItem} />
            </main>
        );
    }
}

export default App;
