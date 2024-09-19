// components/ActionButtons.tsx
import React from 'react';

interface ActionButtonsProps {
  status: string;
  onAccept: () => void;
  onReject: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ status, onAccept, onReject }) => {
  return (
    <>
      {status === 'pending' && (
        <div className="button-group">
          <button className="btn-accept" onClick={onAccept}>Accept</button>
          <button className="btn-reject" onClick={onReject}>Reject</button>
        </div>
      )}
      {status === 'accepted' && <span className="status-accepted">Accepted</span>}
      {status === 'rejected' && <span className="status-rejected">Rejected</span>}
    </>
  );
};

export default ActionButtons;
