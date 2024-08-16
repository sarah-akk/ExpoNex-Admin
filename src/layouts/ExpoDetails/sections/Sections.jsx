import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './Sections.css';

// Utility function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Sections = () => {
  const { expo } = useOutletContext();
  const { width, height, sections } = expo.data;

  // Generate grid layout
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

  // Map to hold position to section data
  const sectionPositions = {};
  const sectionColors = {}; // Object to store colors for each section

  sections.forEach(section => {
    section.positions.forEach(pos => {
      sectionPositions[pos] = section;
    });
    // Assign a random color to each section
    sectionColors[section.id] = getRandomColor();
  });

  return (
    <div className='sections-container'>
      <h2>Sections:</h2>
      <div className='main-content'>
        <div className='grid-wrapper'>
          <div className='grid-container'>
            {grid.map((cell, index) => {
              const pos = (cell.row - 1) * width + cell.col;
              const section = sectionPositions[pos];
              const tooltipContent = section
                ? `ID: ${section.id}\nPrice: ${section.price}\nSize: ${section.size}`
                : '';

              return (
                <div
                  key={index}
                  className={`grid-cell ${section ? `section-${section.type}` : ''}`}
                  style={{
                    gridRow: cell.row,
                    gridColumn: cell.col,
                    backgroundColor: section ? sectionColors[section.id] : 'white', // Apply color
                  }}
                  title={tooltipContent}
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
