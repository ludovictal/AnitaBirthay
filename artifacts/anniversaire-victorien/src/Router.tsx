import { Route, Switch, useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Vitraux from './pages/Vitraux';
import Grimoire from './pages/Grimoire';
import Lettre from './pages/Lettre';
import Voeu from './pages/Voeu';

function Router() {
  const [location] = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('enter');
  const [curtainClosed, setCurtainClosed] = useState(false);

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('exit');
      setCurtainClosed(true);
      let raf = 0;
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('enter');
        // Let the closed curtain sit a beat over the swapped content, then rise.
        raf = requestAnimationFrame(() => setCurtainClosed(false));
      }, 800); // match page-exit-active + curtain-close duration
      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(raf);
      };
    }
    return undefined;
  }, [location, displayLocation]);

  return (
    <div className="relative">
      {/* Royal velvet curtain, sweeping in on exit and rising on arrival */}
      <div className="pointer-events-none fixed inset-0 z-[60] flex" aria-hidden="true">
        <div className={`curtain-panel curtain-left ${curtainClosed ? 'curtain-closed' : 'curtain-open'}`} />
        <div className={`curtain-panel curtain-right ${curtainClosed ? 'curtain-closed' : 'curtain-open'}`} />
      </div>

      <div
        className={`min-h-full transition-all duration-1000 ${
          transitionStage === 'enter' ? 'page-enter-active' : 'page-exit-active'
        }`}
      >
          <Switch location={displayLocation}>
            <Route path="/" component={Home} />
            <Route path="/vitraux" component={Vitraux} />
            <Route path="/grimoire" component={Grimoire} />
            <Route path="/lettre" component={Lettre} />
            <Route path="/voeu" component={Voeu} />
            <Route>
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
                <h1 className="font-title text-4xl text-gold mb-4">Salle Introuvable</h1>
                <p className="italic text-lg text-pearl font-serif">Cette pièce du château semble scellée magiquement.</p>
              </div>
            </Route>
          </Switch>
      </div>
    </div>
  );
}

export default Router;
