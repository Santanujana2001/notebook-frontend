import React from "react";
import Notes from './Notes';
function Home(props) {
  // console.log(props);
  return (
    <div>
      <Notes showAlert={props.showAlert}/>
    </div>
  );
}

export default Home;
