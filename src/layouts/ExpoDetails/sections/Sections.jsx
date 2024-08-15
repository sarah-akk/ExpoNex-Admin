import React from 'react';
import { useOutletContext } from 'react-router-dom';
import "./Sections.css";

const Sections = () => {
  const { expo } = useOutletContext();

  const { width, height, sections } = expo.data;

  const generateGrid = () => {
    const grid = [];
    for (let r = 1; r <= height; r++) {
      for (let c = 1; c <= width; c++) {
        grid.push({ row: r, col: c });
      }
    }
    return grid;
  };

  const grid = generateGrid();

  const sectionPositions = {};
  sections.forEach(section => {
    section.positions.forEach(pos => {
      sectionPositions[pos] = section.type;
    });
  });

  return (
    <div className='sections-container'>
      <h2>Sections :</h2>
      <div className='main-content'>
        <div className='grid-wrapper'>
          <div className='grid-container'>
            {grid.map((cell, index) => {
              const pos = (cell.row - 1) * width + cell.col;
              const sectionType = sectionPositions[pos];
              return (
                <div
                  key={index}
                  className={`grid-cell ${sectionType ? `section-${sectionType}` : ''}`}
                  style={{
                    gridRow: cell.row,
                    gridColumn: cell.col,
                  }}
                >
                  {pos}
                </div>
              );
            })}
          </div>
        </div>
        <div className='details-sidebar'>
          <h3>Grid Details</h3>
          <p className='details-sidebarInfo'><strong>Width:</strong> {width}</p>
          <p className='details-sidebarInfo'><strong>Height:</strong> {height}</p>
        </div>
      </div>
    </div>
  );
}

export default Sections;
