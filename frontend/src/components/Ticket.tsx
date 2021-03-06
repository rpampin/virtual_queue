import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from "react-router-dom";
import {
    IonContent,
    IonLoading,
    IonButton
} from '@ionic/react';
import './Ticket.css';

interface TicketProps extends RouteComponentProps<{ queue: string; }> { }

interface VirtualTicket {
    id: string,
    number: number,
    queueName: string,
    creationDate: Date,
    secretCode: string
}

const Ticket: React.FC<TicketProps> = ({ history, match }) => {
    const [ticket, setTicket] = useState<VirtualTicket>();
    const [showLoading, setShowLoading] = useState(false);
    const queueCode = match.params.queue;

    useEffect(() => {
        const requestTicket = async () => {
            const options = {
                method: 'POST',
                body: JSON.stringify(queueCode),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }

            await fetch('http://localhost:5000/Client/get-ticket', options)
                .then(async (res) => {
                    if (res.ok) {
                        const tkt = await res.json();
                        console.log('Fetch OK: ' + tkt.number);
                        setTicket(tkt);
                        localStorage.setItem("ticket", JSON.stringify(tkt));
                    } else {
                        alert('ERROR');
                    }
                    setShowLoading(false);
                })
                .catch(function (err) {
                    alert('Fetch error:' + err.message);
                    setShowLoading(false);
                });
        }

        if (localStorage.getItem("ticket") === null) {
            requestTicket();
        } else {
            const tkt = localStorage.getItem("ticket");
            setTicket(JSON.parse(tkt || ""));
            setShowLoading(false);
        }
    }, [queueCode]);

    const cancelTicket = async () => {
        const options = {
            method: 'PUT',
            body: JSON.stringify(ticket?.id),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        await fetch('http://localhost:5000/Client/cancel', options);
        const nullTicket = {} as VirtualTicket;
        setTicket(nullTicket);
        localStorage.removeItem("ticket");
        // history.replace("/tab2");
        history.goBack();
    }

    return (
        <IonContent className="ticket">
            <IonLoading isOpen={showLoading} message={'Requesting ticket...'} />
            <div className="container">
                <div id="d-wrapper">
                    <div className="zig-zag-bottom zig-zag-top">
                        <h1>{ticket?.number}</h1>
                        <p>{ticket?.queueName}</p>
                        <p className="t-info">CODE: {ticket?.secretCode}</p>
                        <p className="t-info">{ticket?.creationDate}</p>
                        <p className="t-info"><strong>Estimated waiting time: </strong>30 min</p>
                    </div>
                </div>
                <IonButton color="danger" onClick={e => cancelTicket()}>Leave Queue</IonButton>
            </div>
        </IonContent>
    )
}

export default Ticket;