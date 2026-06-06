import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Dashboard() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const response = await fetch(`${API_URL}/api/mood`);
      const data = await response.json();
      setMoods(data);
    } catch (error) {
      console.error('Error fetching moods:', error);
      alert('Failed to load moods. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEmotionEmoji = (emotion) => {
    const emojiMap = {
      'Happy': '😊',
      'Calm': '😌',
      'Anxious': '😰',
      'Sad': '😢',
      'Excited': '🤩',
      'Peaceful': '🕊️'
    };
    return emojiMap[emotion] || '💙';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container"
      style={{ 
        minHeight: '100vh', 
        paddingTop: '3rem',
        paddingBottom: '3rem',
        position: 'relative',
        zIndex: 1
      }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h2>Your Emotional Journey</h2>
          <motion.button
            className="btn btn-primary"
            onClick={() => navigate('/track')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Add Mood
          </motion.button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Loading your moods...</p>
          </div>
        ) : moods.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card"
            style={{ textAlign: 'center', padding: '3rem' }}
          >
            <h3>No moods tracked yet</h3>
            <p style={{ marginBottom: '2rem' }}>Start your emotional wellness journey by tracking your first mood!</p>
            <motion.button
              className="btn btn-primary"
              onClick={() => navigate('/track')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Track Your First Mood
            </motion.button>
          </motion.div>
        ) : (
          <div style={{ 
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
          }}>
            {moods.map((mood, index) => (
              <motion.div
                key={mood._id}
                className="glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  borderLeft: `4px solid ${mood.color}`,
                  position: 'relative'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '3rem' }}>
                    {getEmotionEmoji(mood.emotion)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      color: mood.color,
                      marginBottom: '0.25rem',
                      fontSize: '1.5rem'
                    }}>
                      {mood.emotion}
                    </h3>
                    <p style={{ 
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      margin: 0
                    }}>
                      {formatDate(mood.timestamp)}
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ 
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem'
                  }}>
                    Intensity:
                  </span>
                  <div style={{ 
                    display: 'flex',
                    gap: '0.25rem',
                    marginTop: '0.25rem'
                  }}>
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: level <= mood.intensity ? mood.color : 'var(--glass-bg)',
                          border: `2px solid ${mood.color}`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {mood.note && (
                  <p style={{ 
                    marginTop: '1rem',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    fontStyle: 'italic',
                    color: 'var(--text-primary)'
                  }}>
                    "{mood.note}"
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
