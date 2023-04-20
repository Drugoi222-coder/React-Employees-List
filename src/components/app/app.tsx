import { Component } from "react";
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";
import "./app.css";

enum Filter {
    ALL = "all",
    RISE = "rise",
    MORE = "more"
}

interface Employee {
    name: string;
    salary: number;
    increase: boolean;
    id: number;
    rise: boolean;
}

interface IState {
    data: Employee[];
    term: string;
    filter: Filter;
}

type TStateData = IState['data'];
type TStateFilter = IState['filter'];

class App extends Component<{}, IState> {
    maxId: number;

    constructor(props: {}) {
        super(props);
        this.state = {
            data: [
                {
                    name: "Bogdan G.",
                    salary: 800,
                    increase: false,
                    id: 1,
                    rise: true,
                },
                {
                    name: "Timothy D.",
                    salary: 500,
                    increase: true,
                    id: 2,
                    rise: false,
                },
                {
                    name: "Alex A.",
                    salary: 1200,
                    increase: false,
                    id: 3,
                    rise: false,
                },
            ],
            term: "",
            filter: Filter.ALL,
        };
        this.maxId = this.state.data[this.state.data.length - 1].id;
    }
    deleteItem = (id: typeof this.maxId): void => {
        this.setState(({ data }) => ({
            data: data.filter((item) => item.id !== id),
        }));
    };
    addItem = (obj: TStateData[0]): void => {
        this.setState(({ data }) => {
            if (obj.name.length >= 3 && String(obj.salary).length > 0) {
                return {
                    data: [...data, obj],
                };
            }
        });
    };
    onToggleProp = (
        id: typeof this.maxId,
        prop: keyof TStateData[0]
    ): void => {
        this.setState(({ data }) => ({
            data: data.map((item) => {
                if (item.id === id && prop in item) {
                    return { ...item, [prop]: !item[prop] };
                }
                return item;
            }),
        }));
    };
    searchEmp = (items: TStateData, term: string): TStateData => {
        if (term.length === 0) {
            return items;
        } else {
            return items.filter((i) => {
                return i.name.indexOf(term) > -1;
            });
        }
    };
    onUpdateSearch = (term: string): void => {
        this.setState({ term });
    };
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
    onFilterSelect = (filter: TStateFilter): void => {
        this.setState({ filter });
    };
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
        const visibleData = this.onFilter(this.searchEmp(data, term), filter);
        return (
            <div className="app">
                <AppInfo
                    genAmount={data.length}
                    premAmount={data.filter((i) => i.increase).length}
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
            </div>
        );
    }
}

export default App;
