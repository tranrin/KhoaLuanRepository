import React from "react";
import Cuisine from "./Cuisine";
import Home from "./Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Searched from "./Searched";
import NotFound from "./NotFound";
import Recipe from "./Recipe";
import { AnimatePresence } from "framer-motion";
import Profile from "./Profile";
import CreateRecipe from "./CreateRecipe";
//ko xài và không được cả import neu không xài
function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/cuisine/:type" element={<Cuisine></Cuisine>}></Route>
        <Route path="/searched/:search" element={<Searched></Searched>}></Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/recipe/:name" element={<Recipe />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipe/create" element={<CreateRecipe />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
