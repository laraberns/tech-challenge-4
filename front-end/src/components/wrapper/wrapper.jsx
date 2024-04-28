import React, { useEffect, useMemo, useState } from "react";
import { useAppState } from "@/context/appProvider";
import FrameRegister from "../frames/register";
import FrameLogin from "../frames/login";
import FrameUserHome from "../frames/userHome";

export default function Wrapper() {
  const { stage } = useAppState();
  const [nextStageContent, setNextStageContent] = useState(null);

  const actionButton = () => {
    console.log("Action Button Clicked!");
  };

  const frames = useMemo(
    () => ({
      register: <FrameRegister nextAction={actionButton} />,
      login: <FrameLogin nextAction={actionButton} />,
      userHome: <FrameUserHome nextAction={actionButton} />,
    }),
    []
  );

  useEffect(() => {
    setNextStageContent(frames[stage]);
  }, [frames, stage]);

  return <> {nextStageContent} </>
}
