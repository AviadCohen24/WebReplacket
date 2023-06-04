import NavigationBar from './routes/navigation-bar/navigation-bar.component';
import Home from './routes/home/home.component'
import SendPacketsGUI from './routes/send-packets-gui/send-packets-gui.component';

import { Routes, Route } from 'react-router-dom' 

const App = () => {
  return (
    <Routes>
      <Route path='' element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path='1553' element={<Home />} />
        <Route path='TCP' element={<Home />} />
        <Route path='UDP' element={<Home />} />
        <Route path='SendPackets' element={<SendPacketsGUI />} />
      </Route>
    </Routes>
  );
}

export default App;
