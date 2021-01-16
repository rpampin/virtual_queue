import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel } from '@ionic/react';
import { qrCode, ticket } from 'ionicons/icons';
import React, { useState } from 'react';

import './ClientContainer.css';

const ClientContainer: React.FC = () => {
    const [code, setCode] = useState("");

    return (
        <IonContent>
            <div className="container">
                <IonItem lines="none">
                    <IonLabel className="code-lbl">Q-CODE</IonLabel>
                    <IonInput className="code-input" value={code} maxlength={10} onIonChange={e => setCode(e.detail.value!.toUpperCase())}></IonInput>
                </IonItem>
                <IonItem lines="none">
                    <IonButton expand="block" size="default" disabled={code!.length !== 10}>
                        <IonIcon slot="start" icon={ticket}></IonIcon>
                        Request ticket
                    </IonButton>
                </IonItem>
                <p>OR</p>
                <IonButton expand="block">
                    <IonIcon slot="start" icon={qrCode}></IonIcon>
                Scan QR
            </IonButton>
            </div>
        </IonContent>
    )
}

export default ClientContainer;