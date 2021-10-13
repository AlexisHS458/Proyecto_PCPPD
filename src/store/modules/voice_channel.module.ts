import Peer from 'simple-peer'
import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import VoiceChannelService from '@/services/voice_channel.service';


@Module({ namespaced: true })
class VoiceChannelModule extends VuexModule{

    public peers: Map<string, Peer.Instance> = new Map<string, Peer.Instance>();


    @Mutation
    public setPeers(peers: Map<string, Peer.Instance>): void {
        console.log("@Mutation setPeers()");
        this.peers = peers;
    }


    @Action
    public initVoiceService(payloadAction:{htmlDivElement: HTMLDivElement, userID: string}): void{
        console.log("initVoiceService");
        const createPeer =(
            userID: string, // ID de la persona que estamos creando un Peer
            callerID: string, // Nuestro ID(socket.id) como iniciador
            stream: MediaStream, // Nuestro stream de datos
            currentUserID: string, // UID Firebase
            htmlDivElement: HTMLDivElement
        ): Peer.Instance => {
            console.log("createPeer");

            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream,
            });

            console.log("peer");
            console.log(peer);
            

            peer.on("signal", signal => {
                console.log("on signal");
                VoiceChannelService.sendingSignal(currentUserID,{
                    signal: signal, // Signal que crea el peer
                    socketID: userID, 
                    uid: currentUserID 
                });
            });
    
            peer.on('track', (track,stream) =>{
                console.log("OnStream");
                const audio = document.createElement('audio');
                audio.srcObject = stream;
                htmlDivElement.appendChild(audio);
                audio.play();
    
            });
    
            return peer;
        }


        
        VoiceChannelService.userStatus(payloadAction.userID, (channelID) => {
            console.log("VoiceChannelService.userStatus");
            console.log("Adentro", payloadAction.htmlDivElement);
            payloadAction.htmlDivElement.innerHTML = '';
            if(!channelID){
                return;
            }
            navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
                console.log("getUserMedia");
                console.table(payloadAction.userID)
                console.table(channelID)
                VoiceChannelService.usersInVoiceChannel(payloadAction.userID, channelID,  (users) =>{
                    this.context.commit(
                        "setPeers",
                        new Map<string, Peer.Instance>(
                            users.map((user) => [
                                user.uid,
                                createPeer(
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