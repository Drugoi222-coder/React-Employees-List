import './app-filter.css'
import { FC } from 'react'

enum Filter {
    ALL = "all",
    RISE = "rise",
    MORE = "more"
}

interface IProps {
    onFilterSelect: (filter: Filter) => void;
    filter: Filter;
}

const AppFilter: FC<IProps> = (props) => {
    const {onFilterSelect, filter} = props;
    const buttonsData = [
        {name: Filter.ALL, label: "Все сотрудники"},
        {name: Filter.RISE, label: "На повышение"},
        {name: Filter.MORE, label: "З/П больше 1000$"}
    ]
    const buttons = buttonsData.map(({name,label}) => {
        const active = filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light';
        return (
            <button className={"btn " + clazz} onClick={() => onFilterSelect(name)} key={name} type="button">
                {label}
            </button>
        )
    });
    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;