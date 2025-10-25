import React, { useEffect, useState } from 'react';

const Dragon: React.FC = () => {
  const [dragon, setDragon] = useState<string[]>([]);

  const dragonAscii = [
    '                   ______________', 
    '                 /                        \\', 
    '                /          ______________  \\', 
    '               /          /              \\  \\', 
    '              /          /                \\  \\', 
    '             /          /                  \\  \\', 
    '            /          /                    \\  \\', 
    '           /          /                      \\  \\', 
    '          /          /                        \\  \\', 
    '         /          /                          \\  \\', 
    '        /          /                            \\  \\', 
    '       /          /                              \\  \\', 
    '      /          /                                \\  \\', 
    '     /          /                                  \\  \\', 
    '    /          /____________________________________\\  \\', 
    '   /_________________________________________________\\', 
    '   ', 
    '          /\\', 
    '         /  \\', 
    '        /    \\', 
    '       /      \\', 
    '      /        \\', 
    '     /          \\', 
    '    /            \\', 
    '   /              \\', 
    '  /________________\\', 
    '  ', 
    '        /\\', 
    '       /  \\', 
    '      /    \\', 
    '     /      \\', 
    '    /        \\', 
    '   /          \\', 
    '  /            \\', 
    ' /______________\\', 
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDragon(
        dragonAscii.map(line =>
          line
            .split('')
            .map(() => (Math.random() > 0.5 ? '1' : '0'))
            .join(''),
        ),
      );
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <pre style={{ color: '#0f0', textShadow: '0 0 5px #0f0' }}>
      {dragon.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </pre>
  );
};

export default Dragon;
