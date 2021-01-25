import { IonAlert, IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel } from '@ionic/react';
import { qrCode, ticket } from 'ionicons/icons';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import './ClientContainer.css';

interface ClientProps extends RouteComponentProps { }

const ClientContainer: React.FC<ClientProps> = ({ match, history }) => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const openScanner = async () => {
        const data = await BarcodeScanner.scan();
        console.log(`Barcode data: ${data.text}`);
    };

    const requestTicket = async (e: React.FormEvent) => {
        const res = await fetch(`http://localhost:5000/Queue/valid-code/${code}`);
        const isValid = await res.json();

        if (isValid) {
            history.push(`${match.url}/ticket/` + code);
        } else {
            setError("Invalid queue code");
            setShowMessage(true);
        }
    }

    return (
        <IonContent>
            <IonAlert
                isOpen={showMessage}
                onDidDismiss={() => setShowMessage(false)}
                header={'Error'}
                message={error}
                buttons={['OK']}
            />
            <div className="container">
                <IonItem lines="none">
                    <IonLabel className="code-lbl">Q-CODE</IonLabel>
                    <IonInput className="code-input" value={code} maxlength={10} onIonChange={e => setCode(e.detail.value!.toUpperCase())}></IonInput>
                </IonItem>
                <IonItem lines="none">
                    <IonButton expand="block" size="default" disabled={code!.length !== 10} onClick={e => requestTicket(e)}>
                        <IonIcon slot="start" icon={ticket}></IonIcon>
                        Request ticket
                    </IonButton>
                </IonItem>
                <p>OR</p>
                <IonButton expand="block" onClick={openScanner}>
                    <IonIcon slot="start" icon={qrCode}></IonIcon>
                    Scan QR
                </IonButton>
            </div>
        </IonContent>
    )
}

export default ClientContainer;