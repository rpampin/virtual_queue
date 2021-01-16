import React, { useState } from 'react';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList } from '@ionic/react';

import './ManageContainer.css';

const ManageContainer: React.FC = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        console.log(user);
        console.log(password);
    }

    return (
        <IonContent fullscreen>
            <IonList>
                <IonItem lines="none">
                    <h2 className="main-title">Manage your queues!</h2>
                </IonItem>
                <IonItem>
                    <IonLabel>Username</IonLabel>
                    <IonInput onIonChange={e => setUser(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Password</IonLabel>
                    <IonInput type="password" onIonChange={e => setPassword(e.detail.value!)} />
                </IonItem>
                <IonButton expand="full" onClick={e => login()}>Login</IonButton>
                <IonButton expand="full" color="secondary">Register</IonButton>
                <IonButton expand="full" fill="clear">Forgot your password?</IonButton>
            </IonList>
        </IonContent >
    )
}

export default ManageContainer;