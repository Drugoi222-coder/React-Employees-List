import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name : 'Bogdan G.', salary : 800, increase: false, id: 1, rise: true},
                {name : 'Timothy D.', salary : 500, increase: true, id: 2, rise: false},
                {name : 'Alex A.', salary : 1200, increase: false, id: 3, rise: false}
            ],
            term: "",
            filter: "all"
        }
        this.maxId = this.state.data[this.state.data.length - 1].id
    }
    deleteItem = (id) => {
        this.setState(({data}) => ({
            data: data.filter(item => item.id !== id)
        }));
    }
    addItem = (obj) => {
        this.setState(({data}) => {
            obj.id = ++this.maxId;
            if (obj.name.length >= 3 && obj.salary.length > 0){
                return {
                    data: [...data, obj]
                }
            }
        });
    }
    onToggleProp = (id,prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id){
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        }))
    }
    searchEmp = (items,term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(i => {
            return i.name.indexOf(term) > -1
        })
    }
    onUpdateSearch = (term) => {
        this.setState({term});
    }
    onFilter = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'more':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }
    onFilterSelect = (filter) => {
        this.setState({filter});
    }
    onSalaryChange = (id,value) => {
        this.setState(({data}) => {
            return {data: data.map((item) => {
                if (item.id === id) {
                    item.salary = value.slice(0,-1); 
                    return {...item};
                }
                return item;
            })}
        })
    }   
    render() {
        const {data, term, filter} = this.state,
            visibleData = this.onFilter(this.searchEmp(data, term), filter);
        return (
            <div className="app">
                <AppInfo
                    genAmount={data.length}
                    premAmount={data.filter(i => i.increase).length}
                />
                <div className="search-panel">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <AppFilter onFilterSelect={this.onFilterSelect} filter={this.state.filter}/>
                </div>
                <EmployersList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onSalaryChange={this.onSalaryChange}
                />
                <EmployersAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;