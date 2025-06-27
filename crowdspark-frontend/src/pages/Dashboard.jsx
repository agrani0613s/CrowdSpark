// src/pages/Dashboard.jsx
import React from 'react';

const statsData = [
  { id: 1, title: 'Events Created', value: 12 },
  { id: 2, title: 'Donations Made', value: 54 },
  { id: 3, title: 'Volunteers Joined', value: 30 },
  { id: 4, title: 'Active Campaigns', value: 5 },
];

const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#333',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '40px',
};

const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: '700',
  color: '#008080',
  marginBottom: '10px',
};

const subtitleStyle = {
  fontSize: '1.1rem',
  color: '#555',
};

const statsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '20px',
  marginBottom: '40px',
};

const statCardStyle = {
  flex: '1 1 180px',
  backgroundColor: '#b2d8d8',
  borderRadius: '8px',
  padding: '20px',
  textAlign: 'center',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  cursor: 'default',
  transition: 'background-color 0.3s ease',
};

const statValueStyle = {
  fontSize: '2.5rem',
  fontWeight: '800',
  color: '#006666',
  marginBottom: '5px',
};

const statTitleStyle = {
  fontWeight: '600',
  color: '#004d4d',
};

const sectionTitleStyle = {
  fontSize: '1.8rem',
  fontWeight: '600',
  marginBottom: '15px',
  color: '#222',
};

const listStyle = {
  listStyleType: 'disc',
  paddingLeft: '20px',
  color: '#444',
  fontSize: '1.1rem',
  lineHeight: '1.6',
};

const Dashboard = () => {
  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Welcome to CrowdSpark!</h1>
        <p style={subtitleStyle}>
          CrowdSpark connects communities through impactful events and donations.
          Explore, contribute, and make a difference.
        </p>
      </header>

      <section style={statsContainerStyle}>
        {statsData.map(({ id, title, value }) => (
          <div
            key={id}
            style={statCardStyle}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#99cccc')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#b2d8d8')}
          >
            <h3 style={statValueStyle}>{value}</h3>
            <p style={statTitleStyle}>{title}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 style={sectionTitleStyle}>What You Can Do Here:</h2>
        <ul style={listStyle}>
          <li>Discover local events and initiatives</li>
          <li>Track your donations and contributions</li>
          <li>Connect with organizers and volunteers</li>
          <li>Stay updated with community news</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
