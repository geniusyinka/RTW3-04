export const NFTCard = ({ nft }) => {

    return (
        <div className="w-1/4 flex flex-col ">
        <div className="rounded-md w-52">
            <img className=" h-6" style={{height: '200px'}} src={nft.media[0].gateway} ></img>
        </div>
        <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
            <div className="flex-grow">
                <h2 className="text-xl text-gray-800">{nft.title}</h2>
                <p className="text-gray-600 text-ellipsis w-44 overflow-hidden">Id: {nft.id.tokenId}</p>
                <p className="text-gray-600 text-ellipsis w-44 overflow-hidden" >{nft.contract.address}</p>
            </div>

            <div className="flex-grow mt-2">
                <p className="text-gray-600">{nft.description}</p>
            </div>
        </div>

    </div>
    )
}