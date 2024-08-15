import React, { useState } from 'react';
import './Grid.css';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useFormData } from '../../context/FormContext';

const GridComponent = () => {
    const navigate = useNavigate();
    const { formData, setFormData } = useFormData();
    const [rows, setRows] = useState(0);
    const [columns, setColumns] = useState(0);
    const [grid, setGrid] = useState([]);
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState([]);

    const generateGrid = () => {
        const newGrid = [];
        let position = 1;
        for (let r = 1; r <= rows; r++) {
            for (let c = 1; c <= columns; c++) {
                newGrid.push(position);
                position++;
            }
        }
        setGrid(newGrid);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const sections = [];
        let currentSection = [];
        grid.forEach(position => {
            if (selected.includes(position)) {
                currentSection.push(position);
            } else if (currentSection.length > 0) {
                sections.push({ type: 'S', positions: currentSection });
                currentSection = [];
            }
        });
        if (currentSection.length > 0) {
            sections.push({ type: 'S', positions: currentSection });
        }
        const newData = { data: sections };
        setData(newData);

        // Update formData with new data
        setFormData({
            ...formData,
            map: JSON.stringify(newData),
            investor_id: 10,
            width: rows,
            height: columns
        });

        console.log('Form Data after update:', formData);
        navigate('/dashboard/NewExpo/ticket-design');
    };

    const handlePrevious = () => {
        navigate(-1);
    };

    const handleSquareClick = (position) => {
        if (selected.includes(position)) {
            setSelected(selected.filter(item => item !== position));
        } else {
            setSelected([...selected, position]);
        }
    };

    return (
        <>
            <SearchBar />
            <div className="NewExpos">
                <div className="expoForm2">
                    <div className="gridContainer">
                        <div className="inputSection">
                            <input
                                type="number"
                                placeholder="Rows"
                                value={rows}
                                onChange={(e) => setRows(parseInt(e.target.value, 10))}
                            />
                            <input
                                type="number"
                                placeholder="Columns"
                                value={columns}
                                onChange={(e) => setColumns(parseInt(e.target.value, 10))}
                            />
                            <button className="NextButton" onClick={generateGrid}>Generate Grid</button>
                        </div>

                        <div className="grid">
                            {grid.map(position => (
                                <div
                                    key={position}
                                    className={`square ${selected.includes(position) ? 'selected' : ''}`}
                                    onClick={() => handleSquareClick(position)}
                                >
                                    {position}
                                </div>
                            ))}
                        </div>

                        <div className="button-group">
                            <button type="button" className="previousButton" onClick={handlePrevious}>
                                Previous
                            </button>
                            <button type="button" className="NextButton" onClick={handleSubmit}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GridComponent;
