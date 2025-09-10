import React from 'react'
import back1 from "../assets/back1.png"

function Background() {
  return (
    <img
      src={back1}
      alt="background"
      className="w-[100%] h-[170%] float-left overflow-auto object-cover"
    />
  )
}

export default Background
