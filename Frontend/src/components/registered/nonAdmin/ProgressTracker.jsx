import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import { Flex, Progress } from 'antd';

const ProgressTracker = ({ materialsrc, username, materialTitle }) => {
  const materialRef = useRef(null);
  const [watchedPercentage, setWatchedPercentage] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);

  const twoColors = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

useEffect(() => {
  const material = materialRef.current;
  if (!material) return;

  let interval;

  const trackProgress = () => {
    interval = setInterval(() => {
      if (!material.duration) return;

      const percentage = (material.currentTime / material.duration) * 100;
      setWatchedPercentage(Math.floor(percentage));

      if (percentage >= 80 && !isCompleted) {
        setIsCompleted(true);
        axios.post("/api/user-progress", {
          username,
          materialTitle,
          watchedDuration: material.currentTime,
          materialLength: material.duration,
          completed: true,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }, 1000);
  };

  material.addEventListener('play', trackProgress);
  material.addEventListener('pause', () => clearInterval(interval));
  material.addEventListener('ended', () => clearInterval(interval));

  return () => {
    clearInterval(interval);
    material.removeEventListener('play', trackProgress);
    material.removeEventListener('pause', () => clearInterval(interval));
    material.removeEventListener('ended', () => clearInterval(interval));
  };
}, [materialTitle, username, isCompleted]);


  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <div className='flex gap-5'>
        <Progress type="circle" percent={watchedPercentage} strokeColor={twoColors} className=''/>
        <h4 className='text-[#003366]'>Learning Progress Tracker</h4>
      </div>
    </div>
  );
};

export default ProgressTracker;
