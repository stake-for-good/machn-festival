'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [divisions, setDivisions] = useState([]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  useEffect(() => {
    // Define the divisions with their labels and percentages
    const divisionsData = [
      { label: 'Unicef', percentage: 20 },
      { label: 'Oxfam', percentage: 25 },
      { label: 'Human Right Watch', percentage: 15 },
      { label: 'WWF', percentage: 30 },
      { label: 'Amnesty International', percentage: 10 },
    ];

    setDivisions(divisionsData);
  }, []);

  // Calculate the total percentage
  const totalPercentage = divisions.reduce((sum, division) => sum + division.percentage, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Your website content here */}

      <div style={{ transform:'scale(1.1)',width: '200px', margin: 'auto', marginTop: '20px',display: 'flex', flexDirection: 'column' }}>

      <button
        style={{ margin: '16px 0', padding: '8px 16px', fontSize: '16px', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#333', color: '#fff', border: 'none' }}
        onClick={signOut}
      >
        Logout
      </button>
      <button
        style={{ margin: '8px 0',marginBottom:'30px', padding: '8px 16px', fontSize: '16px', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#333', color: '#fff', border: 'none' }}
        onClick={() => router.push('/initiative')}
      >
        Initiative
      </button>
        {divisions.map((division, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px',padding:'1px' }}>
            <div
              style={{
                backgroundColor: `hsl(${(index * 60) % 360}, 70%, 50%)`,
                width: `${division.percentage}%`,
                height: '20px',
                marginRight: '8px',
                borderRadius: '4px',
              }}
            ></div>
            <div>{division.label}</div>
          </div>
        ))}
        <div style={{ textAlign: 'left', fontSize: '16px', marginTop: '16px' }}>Total: {totalPercentage}%</div>
      </div>
    </div>
  );
}
