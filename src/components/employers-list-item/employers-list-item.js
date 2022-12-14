import './employers-list-item.css'

function EmployersListItem (props) {
    const {name , salary, onDelete, onToggleProp, increase, rise, onSalaryChange} = props;
    return (
        <li className={"list-group-item d-flex justify-content-between" + (increase ? " increase" : '') + (rise ? " like" : '')}>
            <span onClick={onToggleProp} className="list-group-item-label" data-toggle="rise" >{name}</span>
            <input type="text" onChange={onSalaryChange} className="list-group-item-input" defaultValue={salary + '$'}/>
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                    onClick={onToggleProp}
                    className="btn-cookie btn-sm"
                    data-toggle="increase"
                >
                    <i className="fas fa-cookie"></i>
                </button>
                <button type="button"
                        onClick={onDelete}
                        className="btn-trash btn-sm ">
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    )
}

export default EmployersListItem;