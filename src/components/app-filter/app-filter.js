import './app-filter.css'

function AppFilter (props) {
    const {onFilterSelect} = props;
    const buttonsData = [
        {name: "all", label: "Все сотрудники"},
        {name: "rise", label: "На повышение"},
        {name: "more", label: "З/П больше 1000$"}
    ]
    const buttons = buttonsData.map(({name,label}) => {
        const active = props.filter === name,
            clazz = active ? 'btn-light' : 'btn-outline-light';
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