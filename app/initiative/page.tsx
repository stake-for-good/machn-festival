'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type ListItem = {
  id: number;
  text: string;
};

const CheckboxList: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const router = useRouter();

  const listItems: ListItem[] = [
    { id: 1, text: 'WWF' },
    { id: 2, text: 'Amnesty International' },
    { id: 3, text: 'Unicef' },
    { id: 4, text: 'Human Right Watch' },
    { id: 5, text: 'Oxfam' },
  ];

  const handleItemClick = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSpeichernClick = () => {
    router.push('/');
  };

  return (
    <div
      style={{
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Initiativen</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          fontSize: '1rem',
        }}
      >
        {listItems.map((item) => (
          <label
            key={item.id}
            style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', transform:'scale(1.5)', marginLeft:"50px"}}
          >
            <input
              type="checkbox"
              name={`checkboxItem-${item.id}`}
              checked={selectedItems.includes(item.id)}
              onChange={() => handleItemClick(item.id)}
            />
            <span style={{ marginLeft: '5px' }}>{item.text}</span>
          </label>
        ))}
      </div>

      <button
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          background: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleSpeichernClick}
      >
        Speichern
      </button>
    </div>
  );
};

export default CheckboxList;
