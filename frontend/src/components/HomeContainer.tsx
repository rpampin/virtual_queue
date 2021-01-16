import React from 'react';
import { IonChip, IonContent, IonFab, IonFabButton, IonIcon, IonLabel } from '@ionic/react';
import { alertCircleOutline, ticket } from 'ionicons/icons';

import './HomeController.css';

const HomeContainer: React.FC = () => {
    return (
        <IonContent>
            <div className="container home">
                <IonChip outline style={{ boxSizing: "content-box" }}>
                    <IonIcon icon={ticket} color="primary" style={{ fontSize: "2em" }} />
                    <IonLabel color="primary" style={{ fontSize: "2em" }}>V-QUEUE</IonLabel>
                </IonChip>
                <a style={{ textAlign: "center" }} href='https://www.freepik.com/vectors/money'>Money vector created by macrovector - www.freepik.com</a>
                <IonFab horizontal="end" vertical="bottom" slot="fixed">
                    <IonFabButton size="small" color="light">
                        <IonIcon icon={alertCircleOutline}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </div>
        </IonContent>
    )
}

export default HomeContainer;