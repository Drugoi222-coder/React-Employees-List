import './app-info.css';
import { FC } from 'react';

interface IProps {
    genAmount: number;
    premAmount: number;
}

// Компонент с информацией о числе сотрудников
const AppInfo: FC<IProps> = (props) => {
    const { premAmount, genAmount } = props;
    return (
        <div className="app-info">
            <h1>Учёт сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {genAmount}</h2>
            <h2>Премию получат: {premAmount}</h2>
        </div>
    );
};

export default AppInfo;
