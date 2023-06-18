import React from "react";

import WorkspaceIcon from "@/components/Icons/Workspace";
// import StorageIcon from "@/components/Icons/Storage";
// import ClockIcon from "@/components/Icons/Clock";
// import StarIcon from "@/components/Icons/Star";
// import TrashIcon from "@/components/Icons/Trash";
// import FolderIcon from "@/components/Icons/Folder";
// import FileIcon from "@/components/Icons/File";

export interface LinkItemProps {
  id: string;
  icon: JSX.Element;
  text: string;
  href: string;
}

export interface LinkProps {
  [key: string]: LinkItemProps[];
}

const links: LinkProps = {
  Workspace: [
    {
      id: "overview-1",
      icon: <WorkspaceIcon />,
      text: "My Workspace",
      href: "/workspace/workspace",
    },
  ],
};

export default links;
