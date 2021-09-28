import { db } from "@/utils/firebase";
import { Collection } from "@/utils/collections";
import { SDP } from "@/models/sdp";
import { Call } from "@/models/call";

/**
 * Servicio de comunicación por voz
 */
class RTCService{

    /**
     * Crea una oferta de llamada en el canal de voz especificado
     * @param workspaceID ID del espacio de trabajo
     * @param voiceChannelID  ID del canal de voz
     * @param rtcPeerConnection conexión RTC
     */
    async createAnOffer(
        workspaceID: string,
        voiceChannelID: string,
        rtcPeerConnection: RTCPeerConnection

    ): Promise<void> {
        const offerDescription = await rtcPeerConnection.createOffer();
        const offer = <SDP>{
            sdp: offerDescription.sdp,
            type: offerDescription.type
        };
        const callDoc = db.collection(Collection.WORK_SPACE).doc(workspaceID)
        .collection(Collection.VOICE_CHANNEL).doc(voiceChannelID);

        return await callDoc.set(offer);
    }

    /**
     * Suscripción para escuchar las respuestas remotas
     * @param workspaceID ID del espacio de trabajo
     * @param voiceChannelID  ID del canal de voz
     * @param rtcPeerConnection conexión RTC
     */
    listenForRemoteAnswer(
        workspaceID: string,
        voiceChannelID: string,
        rtcPeerConnection: RTCPeerConnection,
        onSnapshot: (answer: RTCSessionDescription) => void
    ): void {
        const callDoc = db.collection(Collection.WORK_SPACE).doc(workspaceID)
            .collection(Collection.VOICE_CHANNEL).doc(voiceChannelID);

        callDoc.onSnapshot((snapshot) => {
            const data = <Call>snapshot.data();
            if(!rtcPeerConnection.currentLocalDescription && data?.answer){
                onSnapshot(new RTCSessionDescription(data.answer));
            }
        });

    }

    /**
     * Responde a una oferta de la llamada.
     * @param workspaceID ID del espacio de trabajo
     * @param voiceChannelID  ID del canal de voz
     */
    async answerCall(
        workspaceID: string,
        voiceChannelID: string,
        rtcPeerConnection: RTCPeerConnection,
    ): Promise<void>{
        const callDoc = db.collection(Collection.WORK_SPACE).doc(workspaceID)
            .collection(Collection.VOICE_CHANNEL).doc(voiceChannelID);

        const answerCandidates = callDoc.collection(Collection.ANSWER_CANDIDATES);
        const offerCandidates = callDoc.collection(Collection.OFFER_CANDIDATES);

        rtcPeerConnection.onicecandidate = (event) =>{
            event.candidate && answerCandidates.add(event.candidate.toJSON());
        }

        const callData = <Call>(await callDoc.get()).data();

        await rtcPeerConnection.setRemoteDescription(
            new RTCSessionDescription(callData.offer)
        );

        const answerDescription = await rtcPeerConnection.createAnswer();
        await rtcPeerConnection.setLocalDescription(answerDescription);

        const answer = <SDP>{
            sdp: answerDescription.sdp,
            type: answerDescription.type
        }

        await callDoc.update({answer});

        offerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type === 'added'){
                    const data = change.doc.data();
                    rtcPeerConnection.addIceCandidate(
                        new RTCIceCandidate(data)
                    );
                }

            });
        });
    } 

}

export default new RTCService();