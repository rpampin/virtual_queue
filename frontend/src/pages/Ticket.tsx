import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import {
    IonPage,
    IonContent,
    IonLoading
} from '@ionic/react';
import './Ticket.css';

interface VirtualTicket {
    id: string,
    number: number,
    queueName: string,
    creationDate: Date
}

const Ticket: React.FC = () => {
    const location: any = useLocation();

    const [ticket, setTicket] = useState<VirtualTicket>();
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const requestTicket = async () => {
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
            setShowLoading(false);
        }

        requestTicket();
    }, [location]);

    return (
        <IonPage>
            <IonContent className="ticket">
                <IonLoading isOpen={showLoading} message={'Requesting ticket...'} />
                <div className="container">
                    <div id="d-wrapper">
                        <div className="zig-zag-bottom zig-zag-top">
                            <h1>{ticket?.number}</h1>
                            <p>{ticket?.queueName}</p>
                            <p className="t-info">{ticket?.creationDate}</p>
                            <p className="t-info"><strong>Estimated waiting time: </strong>30 min</p>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default (Ticket);