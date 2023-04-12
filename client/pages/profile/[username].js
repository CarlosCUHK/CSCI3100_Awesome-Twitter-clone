import Layout from "../../components/Layout";
import Navigate from "../../components/Navigate";
import Cover from "../../components/Cover";
import { useEffect, useState } from "react";
import LeftPane from "@/components/leftPane/leftPane";
import RightPane from "@/components/rightPane/rightPane";
import Button from "@/components/follow_button";
import { getUsername, checkLoginStatus, checkIsAdmin } from '../../helper/helper';
import FollowList from "../follow_list";
import { Router, useRouter } from 'next/router';
import React from 'react';
import useFetch from '../../hooks/fetch.hook';
import EditProfile from "../edit_profile";
import convertToBase64 from '../../helper/convert';


function Profile() {
  const [{ isLoading, apiData, serverError }] = useFetch();
  const router = useRouter();
  const [current_username, setUsername] = useState("Login");
  const [isMyProfile, setIsmyProfile] = useState(false)
  const [showEditCard, setShowEditCard] = useState(false);
  const [cover, setCover] = useState(null)
  const [editMode,setEditMode] = useState(false);
  const [isFollowing,setIsFollowing] = useState(false);
  getUsername().then(res => setUsername(res));
  const { username } = router.query;

  useEffect(() => {
    if (current_username === username) {
      setIsmyProfile(true)
    } else {
      setIsmyProfile(false)
    }
  }, [current_username, username])

  const handleEditClick = () => {
    setShowEditCard(true)
  };
  const handleClose = () => {
    setShowEditCard(false)
  };
  function updateUserImage(src) {
    setCover(src)
  }

  return (
    <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto z=60">
      <LeftPane />
      <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[350px] z=40">
        <div className={showEditCard ? "opacity-50 " : "max-w-2xl mx-auto border-l border-r border-twitterBorder min-h-screen "}>
          <div className="flex">
            <div className="w-1/4">
            </div>
          </div>
          <div className="border-b border-twitterBorder pb-10">
            <div className="px-5 pt-2">
              <Navigate title={apiData?.Nickname || username} />
            </div>

            <Cover src={cover||apiData?.cover || "https://cdn.discordapp.com/attachments/1089880136037437460/1095383978967564318/cHl.jpg"}
             editable={isMyProfile}
             onChange={src => updateUserImage(src)}
            />
            <div className="flex justify-between">
              <div className="ml-5 relative">
                <div className="absolute -top-14 border-4 rounded-full border-black overflow-hidden">
                  <div className="rounded-full overflow-hidden w-36">
                    <img src={apiData?.profile||"https://www.w3schools.com/howto/img_avatar.png"}></img>
                  </div>
                </div>
              </div>

              <div>
                {isMyProfile ?
                  <div>
                    <div className="flex pt-4 item-center mr-5">
                      <button onClick={()=>setShowEditCard(true) } className="bg-[#1d9bf0] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Edit Profile
                      </button>
                    </div>
                    {showEditCard && <EditProfile onClose={()=>setShowEditCard(false)} />}
                  </div>
                  :
                  <div className="flex  pt-4 ">
                    <div className="p-2 mr-3 hover:bg-gray-800 rounded-full border-2 border-twitterBorder items-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                    </div>
                    <div className="p-2 mr-3 hover:bg-gray-800 rounded-full border-2 border-twitterBorder items-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div className="pr-5">
                      <Button text="Follow" />
                    </div>
                  </div>
                }
              </div>


            </div>
            <div className="mt-10 px-7 ">
              <h1 className="pl-6 pb-3 font-bold text-xl leading-5">{apiData?.Nickname || username}</h1>
            </div>
            <div>
              <div className="text-gray-500 pl-5 pt-2 flex items-center pb-3">
                <div>
                  {apiData?.signature||"good good study, day day up"}
                </div>
              </div>
              <div className="text-white pl-5 ml-5 pt-2 flex items-center">
                <button onClick={() => router.push('/follow_list?followxx=following')} >
                  <div className="hover:underline">following</div>
                </button>
                <button onClick={() => router.push('/follow_list?followxx=follower')} className="pl-4">
                  <div className="hover:underline">follower</div>
                </button>
              </div>

            </div>
          </div>
          <div class="grid grid-cols-3  border-b border-twitterBorder">
            <div class="flex items-center justify-center text-lg hover:bg-gray-800 cursor-pointer pt-2 pb-2"><p class="text-center">Tweets</p></div>
            <div class="flex items-center justify-center text-lg hover:bg-gray-800 cursor-pointer"><p class="text-center">Replies</p></div>
            <div class="flex items-center justify-center text-lg hover:bg-gray-800 cursor-pointer"><p class="text-center">Likes</p></div>
          </div>
          <div className="flex">
            <div className="w-1/4">
            </div>
          </div>
        </div>
      </div>
      <RightPane />

    </main>
  );
}

export default Profile;