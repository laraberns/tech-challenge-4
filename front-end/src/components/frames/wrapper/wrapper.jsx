import React, { useEffect, useMemo, useState } from "react";
import { useAppState } from "@/context/appProvider";
import FrameRegister from "../register";
import FrameLogin from "../login";

export default function Wrapper() {
  const { stage } = useAppState();
  const [nextStageContent, setNextStageContent] = useState(null);

  const actionButton = () => {
    console.log("Action Button Clicked!");
  };

  // Definindo os frames usando useMemo para evitar recriação desnecessária
  const frames = useMemo(
    () => ({
      register: <FrameRegister nextAction={actionButton} />,
      login: <FrameLogin nextAction={actionButton} />,
    }),
    [actionButton]
  );

  useEffect(() => {
    setNextStageContent(frames[stage]);
  }, [frames, stage]);

  return <>{nextStageContent}</>;
}
