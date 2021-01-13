import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import {
    IonPage,
    IonContent
} from '@ionic/react';

interface VirtualTicket {
    id: string,
    number: number
}

const Ticket: React.FC = () => {
    const location: any = useLocation();

    const [ticket, setTicket] = useState<VirtualTicket>();

    useEffect(() => {
        async function requestTicket() {
            const options = {
                method: 'POST',
                body: JSON.stringify(location?.state?.queueId),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }

            const res = await fetch('http://localhost:5000/Client/get-ticket', options);
            const tkt = await res.json();
            setTicket(tkt);
        }

        requestTicket();
    }, []);

    return (
        <IonPage>
            <IonContent>
                <div className="container">
                </div>
            </IonContent>
        </IonPage>
    )
}

export default (Ticket);