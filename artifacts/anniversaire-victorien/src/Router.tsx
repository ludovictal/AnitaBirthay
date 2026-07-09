import { Route, Switch, useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Diary from './pages/Diary';
import Gallery from './pages/Gallery';
import Anecdotes from './pages/Anecdotes';
import Letter from './pages/Letter';
import Wishes from './pages/Wishes';

function Router() {
  const [location] = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('enter');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('exit');
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('enter');
      }, 600); // match page-exit-active duration
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [location, displayLocation]);

  return (
    <div
      className={`min-h-full transition-all duration-700 ${
        transitionStage === 'enter' ? 'page-enter-active' : 'page-exit-active'
      }`}
    >
      <Switch location={displayLocation}>
        <Route path="/" component={Home} />
        <Route path="/journal" component={Diary} />
        <Route path="/galerie" component={Gallery} />
        <Route path="/anecdotes" component={Anecdotes} />
        <Route path="/lettre" component={Letter} />
        <Route path="/voeux" component={Wishes} />
        <Route>
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="font-title text-4xl text-burgundy mb-4">Page Introuvable</h1>
            <p className="italic text-lg">Cette page semble s'être perdue dans les méandres du temps.</p>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Router;
