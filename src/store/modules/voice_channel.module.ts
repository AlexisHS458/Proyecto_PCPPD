import Peer from 'simple-peer'
import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import VoiceChannelService from '@/services/voice_channel.service';


@Module({ namespaced: true })
class VoiceChannelModule extends VuexModule{

    /**
     * Referencia de los peers
     * Map['uid' => Peer]
     */
    public peers: Map<string, Peer.Instance> = new Map<string, Peer.Instance>();

    @Mutation
    public setPeers(peers: Map<string, Peer.Instance>): void {
        this.peers = peers;
    }

    @Mutation
    public addPeerToState(peer: Map<string, Peer.Instance>): void {
        peer.forEach((value,key) => {
            this.peers.set(key,value);
        });

    }

    @Action
    public initVoiceService(payloadAction:{htmlDivElement: HTMLDivElement, userID: string}): void {
        
        /**
         * Crea un nuevo peer como iniciador de la llamada
         * @param userSocketIDToSignal uid de la persona con la vamos a signalizar
         * @param callerID uid de la persona iniciadora de signalización
         * @param stream stream de datos
         * @param htmlDivElement 
         * @returns 
         */
        const createPeer =(
            userSocketIDToSignal: string,
            callerID: string, 
            stream: MediaStream, 
            htmlDivElement: HTMLDivElement
        ): Peer.Instance => {
            console.log("createPeer");

            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream,
            });

            peer.on("signal", signal => {
                VoiceChannelService.sendingSignal(callerID,{
                    signal: signal,
                    callerID: callerID,
                    userIDToSignal: userSocketIDToSignal
                });
            });
                
            // peer.on('track', (track,stream) =>{
            //     const audio = document.createElement('audio');
            //     audio.srcObject = stream;
            //     htmlDivElement.appendChild(audio);
            //     audio.play();
    
            // });
            
            return peer;
        }
        
        VoiceChannelService.userStatus(payloadAction.userID, (channelID) => {
            payloadAction.htmlDivElement.innerHTML = '';
            if(!channelID){
                return;
            }
            navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
                VoiceChannelService.usersInVoiceChannel(payloadAction.userID, channelID, (users) =>{
                    
                    this.context.commit(
                        "setPeers",
                        new Map<string, Peer.Instance>(
                            users.map((user) => [
                                user.uid,
                                createPeer(
                                   user.uid,
                                   payloadAction.userID,
                                   stream,
                                   payloadAction.htmlDivElement
                                )
                            ])
                        )
                    );
                    
                    VoiceChannelService.listenSignalSent(payloadAction.userID, channelID, (payloadSignal) => {
                        const peer = this.addPeer(
                            payloadSignal.signal,
                            payloadSignal.callerID,
                            stream,
                            channelID);
                        this.context.commit("addPeerToState", peer);
                    });


                    VoiceChannelService.listenReturningSignal(payloadAction.userID,channelID, (payloadSignal) => {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        if(payloadSignal.userIDToSignal){
                            const item = this.peers.get(payloadSignal.userIDToSignal);
                            item?.signal(payloadSignal.signal);
                        }    
                    });

                });
            });
        }); 
    }
    
    /**
     * 
     * @param incomingSignal signal en camino
     * @param callerID uid de la persona con quien estamos llamando
     * @param stream stream de datos
     * @param voiceChannelID uid del canal de voz de la llamada
     * @returns 
     */
    addPeer(incomingSignal: Peer.SignalData, callerID: string, stream: MediaStream, voiceChannelID: string): Peer.Instance {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            VoiceChannelService.returningSignal(voiceChannelID, {
                signal: signal,
                callerID: callerID
            })
        });

        peer.signal(incomingSignal);

        return peer;
    }

}

export default VoiceChannelModule;