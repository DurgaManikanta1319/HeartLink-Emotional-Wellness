import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const emotions = [
  { name: 'Happy', color: '#ffd93d', emoji: '😊' },
  { name: 'Calm', color: '#a8dadc', emoji: '😌' },
  { name: 'Anxious', color: '#f4a261', emoji: '😰' },
  { name: 'Sad', color: '#457b9d', emoji: '😢' },
  { name: 'Excited', color: '#ff6b9d', emoji: '🤩' },
  { name: 'Peaceful', color: '#b8d4e3', emoji: '🕊️' }
];

function MoodSelector() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [intensity, setIntensity] = useState(3);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!selectedEmotion) {
      alert('Please select an emotion');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/mood`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emotion: selectedEmotion.name,
          intensity,
          note,
          color: selectedEmotion.color
        })
      });

      if (response.ok) {
        alert('Mood saved successfully! 💙');
        navigate('/dashboard');
      } else {
        alert('Failed to save mood. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to server. Make sure the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
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
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>How are you feeling?</h2>
        
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Emotion Selector */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {emotions.map((emotion) => (
              <motion.button
                key={emotion.name}
                className={`mood-btn ${selectedEmotion?.name === emotion.name ? 'active' : ''}`}
                onClick={() => setSelectedEmotion(emotion)}
                style={{
                  color: emotion.color,
                  borderColor: selectedEmotion?.name === emotion.name ? emotion.color : 'transparent'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{emotion.emoji}</div>
                <div style={{ fontWeight: 600 }}>{emotion.name}</div>
              </motion.button>
            ))}
          </div>

          {/* Intensity Slider */}
          {selectedEmotion && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{ marginBottom: '2rem' }}
            >
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                fontWeight: 600,
                color: 'var(--text-primary)'
              }}>
                Intensity: {intensity}/5
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
              />
            </motion.div>
          )}

          {/* Note */}
          {selectedEmotion && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{ marginBottom: '2rem' }}
            >
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                fontWeight: 600,
                color: 'var(--text-primary)'
              }}>
                Add a note (optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind?"
              />
            </motion.div>
          )}

          {/* Submit Button */}
          {selectedEmotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
            >
              <motion.button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? 'Saving...' : 'Save Mood'}
              </motion.button>
              
              <motion.button
                className="btn"
                onClick={() => navigate('/dashboard')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  background: 'var(--glass-bg)',
                  color: 'var(--text-primary)'
                }}
              >
                View History
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default MoodSelector;
