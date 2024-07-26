import React from 'react'
import Profile from '../../../components/Profile/Profile.jsx'
import BarChart from '../../../components/Charts/BarChart/BarChart.jsx'

const ProfileSection = () => {
  return (
    <div className='ProfileSection'>
      <Profile/>
      <BarChart/>
    </div>
  )
}

export default ProfileSection
