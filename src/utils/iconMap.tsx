import { ReactNode } from "react";
import {
  HiDeviceMobile, HiCode, HiDesktopComputer, HiColorSwatch,
  HiCube, HiSpeakerphone, HiLightningBolt, HiChat, HiLink,
} from "react-icons/hi";

const iconMap: Record<string, ReactNode> = {
  HiDeviceMobile: <HiDeviceMobile />,
  HiCode: <HiCode />,
  HiDesktopComputer: <HiDesktopComputer />,
  HiColorSwatch: <HiColorSwatch />,
  HiCube: <HiCube />,
  HiSpeakerphone: <HiSpeakerphone />,
  HiLightningBolt: <HiLightningBolt />,
  HiChat: <HiChat />,
  HiLink: <HiLink />,
};

export function getServiceIcon(iconName: string): ReactNode {
  return iconMap[iconName] || <HiCode />;
}
