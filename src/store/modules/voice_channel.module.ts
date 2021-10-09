import Peer from 'simple-peer'
import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import VoiceChannelService from '@/services/voice_channel.service';


@Module({ namespaced: true })
class VoiceChannelModule extends VuexModule{

    public peers: Map<string, Peer.Instance> = new Map<string, Peer.Instance>();


    @Mutation
    public setPeers(peers: Map<string, Peer.Instance>): void {
        this.peers = peers;
    }


    @Action
    public initVoiceService(payloadAction:{htmlDivElement: HTMLDivElement, userID: string}): void{
        console.log("Afuera", payloadAction.htmlDivElement);
        
        VoiceChannelService.userStatus(payloadAction.userID, (channelID) => {
            console.log("Adentro", payloadAction.htmlDivElement);
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
                                this.createPeer(
                                    user.uid,
                                    user.socketID,
                                    stream,
                                    payloadAction.userID,
                                    payloadAction.htmlDivElement
                                )
                            ])
                        )
                    );
                });
                VoiceChannelService.listenReturningSignal(payloadAction.userID, (payloadSignal) => {
                    if(this.peers.has(payloadAction.userID)){
                        this.peers.get(payloadAction.userID)?.signal(payloadSignal.signal);
                    }
                });
            });
        }); 
    }

    createPeer(
        userID: string,
        socketID: string,
        stream: MediaStream,
        currentUserID: string,
        htmlDivElement: HTMLDivElement
    ): Peer.Instance {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            VoiceChannelService.sendingSignal(currentUserID,{
                signal: signal,
                socketID: socketID,
                uid: userID
            });
        });

        peer.on('stream', (stream) =>{
            const audio = document.createElement('audio');
            audio.srcObject = stream;
            htmlDivElement.appendChild(audio);

        });

        return peer;
    }

    addPeer(incomingSignal: Peer.SignalData, socketID: string, stream: MediaStream, currentUserID: string): Peer.Instance {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            VoiceChannelService.returningSignal(currentUserID, {
                signal: signal,
                socketID: socketID,
                uid: ''
            })
        })

        peer.signal(incomingSignal);

        return peer;
    }




}

export default VoiceChannelModule;