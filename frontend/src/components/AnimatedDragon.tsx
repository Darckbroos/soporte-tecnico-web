import React, { useEffect, useState } from 'react';
import './AnimatedDragon.css';

const AnimatedDragon: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000); // El dragón desaparece después de 10 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`dragon-container ${visible ? '' : 'hidden'}`}>
      <pre className="dragon-ascii">
        {`
           / \  / \ 
          /   \/   \ 
         /            \ 
        /              \ 
       /                \ 
      /                  \ 
     /                    \ 
    /                      \ 
   /                        \ 
  /                          \ 
 /                            \ 
/                              \ 
        `}
      </pre>
    </div>
  );
};

export default AnimatedDragon;
