import { servers } from "@/utils/rtc";
import { db } from "@/utils/firebase";
import { Collection } from "@/utils/collections";
import { SDP } from "@/models/sdp";
import { Call } from "@/models/call";

/**
 * Servicio de comunicación por voz
 */
class RTCService{
    rtcPeerConnection: RTCPeerConnection;
    constructor(){
        this.rtcPeerConnection = new RTCPeerConnection(servers);
    }
   
    /**
     * Crea una oferta de llamada en el canal de voz especificado
     * @param workspaceID ID del espacio de trabajo
     * @param voiceChannelID  ID del canal de voz
     */
    async createAnOffer(workspaceID: string, voiceChannelID: string): Promise<void> {
        const offerDescription = await this.rtcPeerConnection.createOffer();
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
     */
    listenForRemoteAnswer(
        workspaceID: string,
        voiceChannelID: string,
    ): void {
        const callDoc = db.collection(Collection.WORK_SPACE).doc(workspaceID)
            .collection(Collection.VOICE_CHANNEL).doc(voiceChannelID);
        
        callDoc.onSnapshot((snapshot) => {
            const data = <Call>snapshot.data();
            if(!this.rtcPeerConnection.currentLocalDescription && data?.answer){
                const answerDescription = new RTCSessionDescription(data.answer);
                this.rtcPeerConnection.setRemoteDescription(answerDescription);
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
    ): Promise<void>{
        const callDoc = db.collection(Collection.WORK_SPACE).doc(workspaceID)
            .collection(Collection.VOICE_CHANNEL).doc(voiceChannelID);

        const answerCandidates = callDoc.collection(Collection.ANSWER_CANDIDATES);
        const offerCandidates = callDoc.collection(Collection.OFFER_CANDIDATES);

        this.rtcPeerConnection.onicecandidate = (event) =>{
            event.candidate && answerCandidates.add(event.candidate.toJSON());
        }

        const callData = <Call>(await callDoc.get()).data();

        await this.rtcPeerConnection.setRemoteDescription(
            new RTCSessionDescription(callData.offer)
        );

        const answerDescription = await this.rtcPeerConnection.createAnswer();
        await this.rtcPeerConnection.setLocalDescription(answerDescription);

        const answer = <SDP>{
            sdp: answerDescription.sdp,
            type: answerDescription.type
        }

        await callDoc.update({answer});

        offerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type === 'added'){
                    let data = change.doc.data();
                    this.rtcPeerConnection.addIceCandidate(
                        new RTCIceCandidate(data)
                    );
                }

            });
        });
    } 

    get getRTCPeerConnection(): RTCPeerConnection{
        return this.rtcPeerConnection;
    }
}

export default new RTCService();