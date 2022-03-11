import React from "react";
import ProductCardOne from "./card/ProductCardOne";
import InputElementOne from "./input/InputElementOne";

function navbar(): JSX.Element {
  return (
    <div>
      navbar
      <InputElementOne />
      <ProductCardOne
        discount="-36%"
        pName="Nirma"
        pDesc="Washing Prowder nirma doodh si safedi"
        price={2.56}
      />
    </div>
  );
}

export default navbar;
