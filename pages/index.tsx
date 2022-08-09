
import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
// import {NFTCard} from "../component/nftCard"
// import dotenv


export const NFTCard = ({ nft }) => {

  return (
      <div className="w-1/4 flex flex-col ">
      <div className="rounded-md">
          <img className=" object-cover h-128 w-full rounded-md"  src={nft.media[0].gateway} ></img>
      </div>
      <div className="flex flex-col y-gap-2 w-full px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
          <div className="flex-grow">
              <h2 className="text-xl text-gray-800">{nft.title}</h2>
              <p className="text-gray-600 text-ellipsis w-44 overflow-hidden">Id: {nft.id.tokenId}</p>
              <p className="text-gray-600 text-ellipsis w-44 overflow-hidden" >{nft.contract.address}</p>
          </div>

          <div className="flex-grow mt-2">
              <p className="text-gray-600 h-24 overflow-hidden text-ellipsis ">{nft.description}</p>
          </div>
      </div>

  </div>
  )
}

const Home = () => {

  const [wallet, setWalletAddress] = useState("geniusyinka.eth")
  const [collection, setCollectionAddress] = useState("")
  const [NFTs, setNFTs] = useState([])
  const [fetchforCollection, setFetchForCollection] = useState(false)

  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching NFTs");
    const api_key = 'kkkMDXtLRZoxO72ouuuQbdKBwyq-y0Es'
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    var requestOptions = {
      method: 'GET'
    };

    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts or collection owned by address")
      const fetchURL = `${baseURL}?owner${wallet}&contracrAddresses%5B%5D=${collection}`
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    }

    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "kkkMDXtLRZoxO72ouuuQbdKBwyq"
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input 
        className=' bg-slate-100 w-1/4 p-3 rounded-md'
        onChange={(e) => { setWalletAddress(e.target.value) }} value={wallet} type={"text"} placeholder="Add your wallet address"></input>
        <input
        className='bg-slate-100 w-1/4 p-3 rounded-sm'
         onChange={(e) => { setCollectionAddress(e.target.value) }} value={collection} type={"text"} placeholder="Add the collection address"></input>
        <label className="text-gray-600 "><input onChange={(e) => { setFetchForCollection(e.target.checked) }} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
        <button className=" text-white bg-blue-700 px-4 py-2 mt-3 rounded-md w-1/5 hover:bg-sky-700"
          onClick={
            () => {
              if (fetchforCollection) {
                fetchNFTsForCollection()
              } else (fetchNFTs())
            }
          }
        >Let's go! </button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>

  )
}

export default Home
