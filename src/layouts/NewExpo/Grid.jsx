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
    const [price, setPrice] = useState('');
    const [sections, setSections] = useState([]);
    const [previousSelections, setPreviousSelections] = useState([]);

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

    const handlePriceSubmit = (e) => {
        e.preventDefault();

        // Only proceed if there are selected squares and a price is provided
        if (selected.length === 0 || !price) {
            return;
        }

        // Create a new section with selected positions and current price
        const newSection = {
            type: 'S',
            positions: [...selected],
            price: parseFloat(price)
        };

        // Add the new section to the list of sections
        setSections(prevSections => [...prevSections, newSection]);

        // Update previous selections and clear current selection
        setPreviousSelections(prevSelections => [...prevSelections, ...selected]);
        setSelected([]);
        setPrice('');
    };

    const handleSubmit = () => {
        const newData = { data: sections };
        console.log('Final newData:', JSON.stringify(newData));

        setFormData({
            ...formData,
            map: JSON.stringify(newData),
            investor_id: 10,
            width: columns,
            height: rows,
        });

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

                        <div
                            className="grid"
                            style={{
                                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                                gridTemplateRows: `repeat(${rows}, 1fr)`,
                                gap: '5px'
                            }}
                        >
                            {grid.map(position => (
                                <div
                                    key={position}
                                    className={`square ${selected.includes(position) || previousSelections.includes(position) ? 'selected' : ''}`}
                                    onClick={() => handleSquareClick(position)}
                                    style={{
                                        width: `${100 / columns}%`,
                                        height: `${100 / rows}%`,
                                        backgroundColor: selected.includes(position) || previousSelections.includes(position) ? 'lightblue' : 'white'
                                    }}
                                >
                                    {position}
                                </div>
                            ))}
                        </div>

                        <div className="inputSection">
                            <input
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <button className="submitPriceButton" onClick={handlePriceSubmit}>Submit Price</button>
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
