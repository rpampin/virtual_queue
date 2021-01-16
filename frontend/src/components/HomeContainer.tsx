import React from 'react';
import { IonButton, IonChip, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonLabel } from '@ionic/react';
import { alertCircle, ticket } from 'ionicons/icons';

import './HomeController.css';

const HomeContainer: React.FC = () => {
    return (
        <IonContent>
            <div className="container home">
                <IonChip outline style={{ boxSizing: "content-box" }}>
                    <IonIcon icon={ticket} color="primary" style={{ fontSize: "2em" }} />
                    <IonLabel color="primary" style={{ fontSize: "2em" }}>V-QUEUE</IonLabel>
                </IonChip>
                <IonFab horizontal="end" vertical="bottom" slot="fixed">
                    <IonFabButton size="small" color="light">
                        <IonIcon icon={alertCircle}></IonIcon>
                    </IonFabButton>
                    <IonFabList side="start">
                        <div className="custom-fab">
                            <IonButton size="small" href="https://www.freepik.com/vectors/money" target="_blank">
                                Vector created by macrovector
                            </IonButton>
                        </div>
                    </IonFabList>
                </IonFab>
            </div>
        </IonContent>
    )
}

export default HomeContainer;