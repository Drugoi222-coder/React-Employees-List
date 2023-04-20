import './employers-list.css'
import EmployersListItem from '../employers-list-item/employers-list-item'

const EmployersList = ({data,onDelete,onToggleProp,onSalaryChange}) => {
    const elements = data.map(item => {
        const {id, ...itemProps} = item;
        return (
            <EmployersListItem 
                key={id}
                {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
                onSalaryChange={(e) => onSalaryChange(id, e.target.value)}
            />
        )   
    });
    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployersList;