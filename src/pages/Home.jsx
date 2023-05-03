import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import React, { useEffect } from 'react'
import {motion} from "framer-motion"
import ReactGA from 'react-ga';

function Home() {

  return (

      <motion.div
      animate={{opacity: 1}}
      initial = {{opacity: 0}}
      exit = {{opacity : 0 }}
      transaction = {{duration: 0.5}}
      >
        <Veggie></Veggie>
        <Popular></Popular>
      </motion.div>

  )
}

export default Home