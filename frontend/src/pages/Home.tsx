import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import {
    IonPage,
    IonContent,
    IonIcon,
    IonButton,
    IonLabel,
    IonSelect,
    IonSelectOption
} from '@ionic/react';
import { ticket } from 'ionicons/icons';

interface HomeProps extends RouteComponentProps { }
interface Queue {
    id: string,
    name: string
}

const Home: React.FC<HomeProps> = ({ history }) => {
    const [data, setData] = useState<Queue[]>([]);
    const [queue, setQueue] = useState<Queue>();

    useEffect(() => {
        async function loadData() {
            const res = await fetch('http://localhost:5000/queue');
            const loadedData = await res.json();
            setData(loadedData);
        }

        loadData();
    }, []);

    const requestTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        history.push({
            pathname: '/ticket',
            state: { queueId: queue?.id }
        });
    }

    const queues = data || [];

    return (
        <IonPage>
            <IonContent className="container">
                <div className="container">
                    <form noValidate onSubmit={requestTicket}>
                        <IonLabel>Queue</IonLabel>
                        <IonSelect value={queues[0]} interface="action-sheet" name="queue" onIonChange={e => setQueue(e.detail.value)}>
                            {queues.map(q => (
                                <IonSelectOption key={q.id} value={q}>{q.name}</IonSelectOption>
                            ))}
                        </IonSelect>
                        <IonButton type="submit">
                            <IonIcon slot="start" icon={ticket} />
                            Request Ticket
                        </IonButton>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default withRouter(Home);