import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ReactComponent as SectionsMap } from '../../../assets/images/sectionsMap.svg';
import "./Sections.css";

const Sections = () => {
  const { expo } = useOutletContext();

  const [sectionColors, setSectionColors] = useState({
    section1: 'lightgray',
    section2: 'lightgray',
    section3: 'lightgray',
    // Initialize all 50 sections
    section4: 'lightgray',
    section5: 'lightgray',
    section6: 'lightgray',
    section7: 'lightgray',
    section8: 'lightgray',
    section9: 'lightgray',
    section10: 'lightgray',
    section11: 'lightgray',
    section12: 'lightgray',
    section13: 'lightgray',
    section14: 'lightgray',
    section15: 'lightgray',
    section16: 'lightgray',
    section17: 'lightgray',
    section18: 'lightgray',
    section19: 'lightgray',
    section20: 'lightgray',
    section21: 'lightgray',
    section22: 'lightgray',
    section23: 'lightgray',
    section24: 'lightgray',
    section25: 'lightgray',
    section26: 'lightgray',
    section27: 'lightgray',
    section28: 'lightgray',
    section29: 'lightgray',
    section30: 'lightgray',
    section31: 'lightgray',
    section32: 'lightgray',
    section33: 'lightgray',
    section34: 'lightgray',
    section35: 'lightgray',
    section36: 'lightgray',
    section37: 'lightgray',
    section38: 'lightgray',
    section39: 'lightgray',
    section40: 'lightgray',
    section41: 'lightgray',
    section42: 'lightgray',
    section43: 'lightgray',
    section44: 'lightgray',
    section45: 'lightgray',
    section46: 'lightgray',
    section47: 'lightgray',
    section48: 'lightgray',
    section49: 'lightgray',
    section50: 'lightgray',
  });

  const handleSectionClick = (sectionId) => {
    setSectionColors(prevColors => ({
      ...prevColors,
      [sectionId]: prevColors[sectionId] === 'lightgray' ? 'lightblue' : 'lightgray'
    }));
  };

  const totalSections = Object.keys(sectionColors).length;
  const usedSections = Object.values(sectionColors).filter(color => color === 'lightblue').length;
  const areaSize = "550 x 300 m";  

  return (
    <div className='expo-sections'>
      <h2>Sections for {expo.name}</h2>
     
      <div className='sections-map-container'>
        <SectionsMap
          className="interactive-map"
          style={{
            '--section1-fill': sectionColors.section1,
            '--section2-fill': sectionColors.section2,
            '--section3-fill': sectionColors.section3,
            '--section4-fill': sectionColors.section4,
            '--section5-fill': sectionColors.section5,
            '--section6-fill': sectionColors.section6,
            '--section7-fill': sectionColors.section7,
            '--section8-fill': sectionColors.section8,
            '--section9-fill': sectionColors.section9,
            '--section10-fill': sectionColors.section10,
            '--section11-fill': sectionColors.section11,
            '--section12-fill': sectionColors.section12,
            '--section13-fill': sectionColors.section13,
            '--section14-fill': sectionColors.section14,
            '--section15-fill': sectionColors.section15,
            '--section16-fill': sectionColors.section16,
            '--section17-fill': sectionColors.section17,
            '--section18-fill': sectionColors.section18,
            '--section19-fill': sectionColors.section19,
            '--section20-fill': sectionColors.section20,
            '--section21-fill': sectionColors.section21,
            '--section22-fill': sectionColors.section22,
            '--section23-fill': sectionColors.section23,
            '--section24-fill': sectionColors.section24,
            '--section25-fill': sectionColors.section25,
            '--section26-fill': sectionColors.section26,
            '--section27-fill': sectionColors.section27,
            '--section28-fill': sectionColors.section28,
            '--section29-fill': sectionColors.section29,
            '--section30-fill': sectionColors.section30,
            '--section31-fill': sectionColors.section31,
            '--section32-fill': sectionColors.section32,
            '--section33-fill': sectionColors.section33,
            '--section34-fill': sectionColors.section34,
            '--section35-fill': sectionColors.section35,
            '--section36-fill': sectionColors.section36,
            '--section37-fill': sectionColors.section37,
            '--section38-fill': sectionColors.section38,
            '--section39-fill': sectionColors.section39,
            '--section40-fill': sectionColors.section40,
            '--section41-fill': sectionColors.section41,
            '--section42-fill': sectionColors.section42,
            '--section43-fill': sectionColors.section43,
            '--section44-fill': sectionColors.section44,
            '--section45-fill': sectionColors.section45,
            '--section46-fill': sectionColors.section46,
            '--section47-fill': sectionColors.section47,
            '--section48-fill': sectionColors.section48,
            '--section49-fill': sectionColors.section49,
            '--section50-fill': sectionColors.section50,
          }}
          onClick={(e) => handleSectionClick(e.target.id)}
        />
      </div>
      <div className='sections-info'>
        <div className='sections-info-item'> Total Sections: {totalSections}</div>
        <div className='sections-info-item'>Used Sections: {usedSections}</div>
        <div className='sections-info-item'>Area Size: {areaSize}</div>
      </div>
    </div>
  );
}

export default Sections;
