import React, { useState, useEffect } from "react";
import TweetBox from "../TweetBox/TweetBox";
import Post from "../Post/Post";
import "./feed.css";
import FlipMove from "react-flip-move";
import {
    WalletMultiButton,
    WalletDisconnectButton
} from "@solana/wallet-adapter-react-ui";
import { Program, Provider, web3 } from "@project-serum/anchor";
import { Connection } from "@solana/web3.js";
import idl from "../../idl.json";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';


function Feed(props) {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [posts, setPosts]=useState([]);
    const [bool, setBool]= useState(false);
    useEffect(() => {
        // document.title = `You clicked ${count} times`;
                const baseAccount = web3.Keypair.generate();

        const network = "https://api.devnet.solana.com";
        const connection = new Connection(network, "processed");

        const provider = new Provider(connection, baseAccount, {
            preflightCommitment: "processed",
        });
        transaction(provider);
      },[publicKey, bool]);

      const transaction=async(provider)=>{
                const a = JSON.stringify(idl);
        const b = JSON.parse(a);
        const program = new Program(b, idl.metadata.address, provider);
        try {

            const tweetAccount = await program.account.tweet.all();
            // console.log(tweetAccount,"tweetAccount")
            // console.log(tweetAccount[tweetAccount.length-1].account.author.toBase58(),"tweetAccount pubkey")
            // console.log(publicKey.toBase58(),"publicKey")
            let tweets = [];

            for (let i = 0; i < tweetAccount.length; i++) {
                let tweet = {
                    'id': i,
                    'tweetText': tweetAccount[i].account.content.toString(),
                    'username': tweetAccount[i].account.topic.toString(),
                    // 'personal': false
                    'personal':( publicKey ? (tweetAccount && tweetAccount[i].account.author.toBase58() === publicKey.toBase58() ? true:false )  : false)
                };
                tweets.push(tweet);
            }
            // this.setState({
            //     posts: tweets
            // });
            // console.log('posts: ', this.state.posts);
            console.log('tweets: ', tweets);

            setPosts(tweets);

            console.log('tweetAccount: ', tweetAccount);
        }
        catch (err) {
            console.log("Transcation error: ", err);
        }
    }

// const fetchTweet=()=>{
//     setBool(!bool);
//     console.log("fetchTweet called");

// }
    // console.log("fetchTweet called bool", bool);

     
  return (
                <div className="feed">
                <div className="feed__header ">
                    <div className="appwallet" >
                        
                    {!publicKey ? 
                    (
                    <><WalletMultiButton /></> 
                    ):(
                        <div style={{marginTop:"10px"}}>
                        <WalletDisconnectButton />
                        </div>
                    )                      
                    }
                    </div>
                </div>
{!publicKey ? 
(<></>)
:
(<>
<TweetBox 
// fetchTweet={fetchTweet()}
/>
</>)
}
                

                <FlipMove>
                    {/* {this.state.posts.map((post) => ( */}
                    {posts.map((post) => (
                        <Post
                            key={post.id}
                            displayName={post.username}
                            text={post.tweetText}
                            personal={post.personal}
                        />

                    ))}
                </FlipMove>
            </div>
  )
}

export default Feed