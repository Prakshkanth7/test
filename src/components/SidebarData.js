import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Products",
    path: "/",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Demo Script",
    path: "/demoscript",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Customers",
    path: "/customers",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },

  {
    title: "Sales Team",
    path: "/salesteam",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Demos",
    path: "/demos",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
