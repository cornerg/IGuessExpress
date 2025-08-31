import type {TicketData} from "../models/types.ts";
import ticketBase from "../assets/images/TicketFinalBlank.png";

function getInitials(name: string): string {
    const words = name.split(new RegExp(/[ _]/, "g"));
    let result = "";
    for (const word of words) {
        result = result + word.substring(0, 1).toUpperCase();
    }
    return result;
}

interface Props {
    data: TicketData;
}

export default function RenderedTicket({data}: Props) {
    return (
        <div id="ticket-element" className="w-[1300px] h-[652px] relative bg-white">
            <img src={ticketBase} alt="background for the ticket" className="absolute w-full h-full top-0 left-0 z-0"/>
            <div className="absolute column w-full h-full top-0 left-0 pt-[128px] pl-[48px] gap-[29px] z-1">
                <div className="row w-full justify-between items-center gap-[42px] pr-[48px] flex-nowrap">
                    <h1 className="min-w-[360px] w-max text-[52px] text-center text-black">
                        {data.name}
                    </h1>
                    <div className="row w-[216px] min-w-[216px] justify-end items-center">
                        {data.identities.slice(0,4).map((identity) => {
                            return (
                                <div
                                    key={identity.key}
                                    style={{backgroundImage: `url(${identity.flag})`}}
                                    className="w-12 h-12 rounded-sm bg-cover bg-center bg-no-repeat overflow-hidden border-1 border-[#CD936C]"
                                />
                            )
                        })}
                    </div>
                </div>

                <div className="row w-full h-[360px] gap-[42px] pr-[16px]">
                    <div
                        className="column w-[359px] h-[359px] justify-center items-center m-[1px] rounded-[30px] bg-cover bg-center bg-no-repeat"
                        style={data.photo ? {backgroundImage: `url(${data.photo})`} : undefined}
                    >
                        {(!data.photo) && (
                            <h1 className="text-8xl text-[#CD936C]">{getInitials(data.name)}</h1>
                        )}
                    </div>

                    <div className="column w-full h-full flex-1 gap-[24px] justify-between pt-[13px]">
                        <div className="row w-full gap-2">
                            {(typeof data.age === "string" && (data.age.trim()).length > 0) && (
                                <div className="column w-[102px] gap-2">
                                    <p className="serif text-[24px] text-[#CD936C]">Age</p>
                                    <p className="text-[36px] text-black">{data.age}</p>
                                </div>
                            )}

                            {(typeof data.pronouns === "string" && (data.pronouns.trim()).length > 0) && (
                                <div className="column w-[320px] gap-2">
                                    <p className="serif text-[24px] text-[#CD936C]">Pronouns</p>
                                    <p className="text-[36px] text-black">{data.pronouns}</p>
                                </div>
                            )}

                            {(typeof data.region === "string" && (data.region.trim()).length > 0) && (
                                <div className="column w-full h-max flex-1 gap-2">
                                    <p className="serif text-[24px] text-[#CD936C]">Region</p>
                                    <p className="text-[36px] text-black">{data.region}</p>
                                </div>
                            )}
                        </div>

                        {(typeof data.interests === "string" && (data.interests.trim()).length > 0) && (
                            <div className="column w-full h-max gap-2">
                                <p className="serif text-[24px] text-[#CD936C]">Interests</p>
                                <p className="text-[24px] text-black">{data.interests}</p>
                            </div>
                        )}

                        {(typeof data.about === "string" && (data.about.trim()).length > 0) && (
                            <div className="column w-full h-max gap-2">
                                <p className="serif text-[24px] text-[#CD936C]">About</p>
                                <p className="text-[24px] text-black">{data.about}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}