import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-container animate-fade-in">
      <Loader2 size={48} className="spinner" />
      <p className="loading-text">{message}</p>
    </div>
  );
};

export default Loading;
