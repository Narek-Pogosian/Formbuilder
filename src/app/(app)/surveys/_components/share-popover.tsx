"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  TwitterShareButton,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  XIcon,
} from "react-share";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

function SharePopover({ id }: { id: string }) {
  const url = `${process.env.VERCEL_URL}/survey/${id}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-fit py-0">
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex gap-2">
        <CopyToClipboard url={url} />
        <FacebookShareButton url={url}>
          <span className="sr-only">Share on Facebook</span>
          <FacebookIcon className="size-16 rounded" />
        </FacebookShareButton>
        <LinkedinShareButton url={url}>
          <span className="sr-only">Share on Linkedin</span>
          <LinkedinIcon className="size-16 rounded" />
        </LinkedinShareButton>
        <TwitterShareButton url={url} title="Check out this survey!">
          <span className="sr-only">Share on Twitter</span>
          <XIcon className="size-16 rounded" />
        </TwitterShareButton>
      </PopoverContent>
    </Popover>
  );
}

export default SharePopover;

function CopyToClipboard({ url }: { url: string }) {
  const [hasCopied, setHasCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 1000);
  }

  return (
    <Button className="size-16 border-0" onClick={handleCopy}>
      <span className="sr-only">Copy to clipboard</span>
      {hasCopied ? <Check /> : <Copy />}
    </Button>
  );
}
