"use client";
import { Highlight } from "@/components/ui/animated/Highlight";
import { MoveUp } from "@/components/ui/animated/MoveUp";
import { Spotlight } from "@/components/Spotlight";
import Text from "@/components/ui/Text";
import { LampContainer } from "@/components/ui/animated/Lamp";
import Button from "@/components/ui/Button";
import ROUTES from "@/constants/routes";

export default function Hero() {
  return (
    <LampContainer className="min-h-[100dvh] h-full">
      <Spotlight />
      <MoveUp className="text-center">
        <Text variant="h1" size="6xl" className="font-bold">
          Task Manager Application
        </Text>
        <Text variant="p" size="4xl" className="mt-5">
          Made by <Highlight>Hazim Tulumovic</Highlight>
        </Text>
      </MoveUp>

      <Button href={ROUTES.DASHBOARD} variant="primary" className="mt-14">
        Let's start
      </Button>
    </LampContainer>
  );
}
