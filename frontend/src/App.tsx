import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Ticket from './pages/Ticket';
import ExploreContainer from './components/ExploreContainer';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/main.css';
import { home, person, storefront } from 'ionicons/icons';

const App: React.FC = () => (
  <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Virtual Queue</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tab1" component={ExploreContainer} exact={true} />
          <Route path="/tab2" component={ExploreContainer} exact={true} />
          <Route path="/tab3" component={ExploreContainer} />
          <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={person} />
            <IonLabel>Client</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={storefront} />
            <IonLabel>Manage</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  // <IonApp>
  //   <IonHeader>
  //     <IonToolbar>
  //       <IonTitle>Virtual Queue</IonTitle>
  //     </IonToolbar>
  //   </IonHeader>
  //   <IonReactRouter>
  //     <IonRouterOutlet>
  //       <Route path="/home" component={Home} />
  //       <Route path="/ticket/:queueId" component={Ticket} />
  //       <Redirect exact from="/" to="/home" />
  //     </IonRouterOutlet>
  //   </IonReactRouter>
  // </IonApp>
);

export default App;
