import React, { useState } from 'react';
import SkyCanvas from './components/SkyCanvas';
import WeatherSlider from './components/WeatherSlider';
import EnterScreen from './components/EnterScreen';

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <>
      <EnterScreen onEnter={() => setHasEntered(true)} />

      <SkyCanvas>
        {/* Phase 2: Clouds will go here */}
      </SkyCanvas>

      {hasEntered && <WeatherSlider />}
    </>
  );
}

export default App;
