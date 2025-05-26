"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  focus: string;
  avatarUrl: string;
}

export default function TeamMemberCard({
  name,
  role,
  description,
  focus,
  avatarUrl,
}: TeamMemberProps) {
  return (
    <Card className="p-6 hover:scale-[1.02] hover:shadow-lg transition-transform h-full">
      <CardContent className="p-0 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
            <Image
              src={avatarUrl}
              alt={`${name}'s avatar`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-primary">{role}</p>
          </div>
        </div>
        <p className="text-muted-foreground">{description}</p>
        <p className="text-sm border-l-2 border-primary pl-4 mt-4 bg-primary/5 py-2">
          {focus}
        </p>
      </CardContent>
    </Card>
  );
}
