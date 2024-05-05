import React, { useEffect, useMemo, useState } from "react";
import { useAppState } from "@/context/appProvider";
import FrameRegister from "../frames/register";
import FrameLogin from "../frames/login";
import FrameUserReservations from "../frames/userReservations";
import FrameUserHome from "../frames/userHome";
import FrameUserSchedule from "../frames/userSchedule";
import FrameAdminHome from "../frames/adminHome";
import FrameAdminNewCourt from "../frames/adminNewCourt";

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
      userSchedule: <FrameUserSchedule nextAction={actionButton} />,
      userReservations: <FrameUserReservations nextAction={actionButton} />,
      userHome: <FrameUserHome nextAction={actionButton} />,
      adminHome: <FrameAdminHome nextAction={actionButton} />,
      adminNewCourt: <FrameAdminNewCourt nextAction={actionButton} />,
    }),
    []
  );

  useEffect(() => {
    setNextStageContent(frames[stage]);
  }, [frames, stage]);

  return <> {nextStageContent} </>
}
