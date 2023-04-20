import './search-panel.css';
import { Component, ChangeEvent } from 'react';

interface IProperties {
    onUpdateSearch: (term: string) => void;
}

interface IState {
    term: string;
}

// Компонент с панелью поиска
class SearchPanel extends Component<IProperties, IState> {
    constructor(props: IProperties) {
        super(props);
        this.state = {
            term: '',
        };
    }
    // Обновление списка сотрудников при вводе
    onUpdateSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        const { onUpdateSearch } = this.props;
        this.setState({ term });
        onUpdateSearch(term);
    };
    render() {
        return (
            <input
                type="text"
                value={this.state.term}
                onChange={this.onUpdateSearch}
                className="form-control search-input"
                placeholder="Найти сотрудника"
            />
        );
    }
}

export default SearchPanel;
