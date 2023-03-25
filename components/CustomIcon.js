import React from "react";
import { withTheme } from "@draftbit/ui";

import { AntDesign, Ionicons, EvilIcons } from "@expo/vector-icons/";

const CustomIcon = ({ name, ...otherProps }) => {
  const [IconLib, IconName] = name.split("/");
  return (
    <>
      {IconLib == "AntDesign" && <AntDesign name={IconName} {...otherProps} />}
      {IconLib == "Ionicons" && <Ionicons name={IconName} {...otherProps} />}
      {IconLib == "EvilIcons" && <EvilIcons name={IconName} {...otherProps} />}
    </>
  );
};

export default withTheme(CustomIcon);
