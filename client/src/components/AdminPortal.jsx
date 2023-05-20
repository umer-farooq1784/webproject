import React from 'react'
import Header from './Header';
import { NavLink ,Route, Routes} from 'react-router-dom';
import { StyleActive, StyleInactive } from '../utils/styles';
import { IoHome } from "react-icons/io5";
import Myalbums from "./myalbums";
import AllArtist from "./AllArtist";
import AdminHome from "./AdminHome";
import AllSongs from "./AllSongs";
import AllUsers from "./AllUsers";
import AddNewSong from './AddNewSong';

const AdminPortal = () =>
{
    return (
      <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      
        <Header />

        <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
          <NavLink to={"/adminPortal/home"}><IoHome className="text-2xl text-textColor" /></NavLink>
          <NavLink to={"/adminPortal/user"} className={({ isActive }) => isActive ? StyleActive : StyleInactive }> Users </NavLink>
          <NavLink to={"/adminPortal/songs"} className={({ isActive }) => isActive ? StyleActive : StyleInactive }> Songs </NavLink>
          <NavLink to={"/adminPortal/artist"} className={({ isActive }) => isActive ? StyleActive : StyleInactive }> Artist </NavLink>
          <NavLink to={"/adminPortal/albums"} className={({ isActive }) => isActive ? StyleActive : StyleInactive }> Albums </NavLink>
        </div>

        <div className="my-4 w-full p-4">
          <Routes>
            <Route path="/home" element={<AdminHome />} />
            <Route path="/user" element={<AllUsers />} />
            <Route path="/songs" element={<AllSongs />} />
            <Route path="/artist" element={<AllArtist />} />
            <Route path="/albums" element={<Myalbums />} />
            <Route path="/newSong" element={<AddNewSong />} />
          </Routes>
        </div>

       
      </div>

        

    )
}

export default AdminPortal;