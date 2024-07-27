"use client";
import { cn } from '@/lib/utils';
import { Message } from '@/lib/validators/message';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

import { FC, HTMLAttributes, useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const [input, setInput] = useState<string>("");

  const queryClient = useQueryClient();
  const { mutate: sendMessage } = useMutation({
    mutationFn: async (message: Message) => {
      try {
        const response = await fetch('/api/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: [message] }),
        });
        return await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      console.log("success");
      // Add functionality to handle success case
    },
  });

  useEffect(() => {
    return () => {
      queryClient.cancelQueries();
    };
  }, [queryClient]);

  return (
    <div {...props} className={cn('border-t bg-zinc-300', className)}>
      <div className="relative mt-4 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          rows={2}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();

              const message: Message = {
                id: nanoid(),
                isUserMessage: true,
                text: input,
              };
              sendMessage(message);
            }
          }}
          maxRows={4}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
          disabled={false} // Add disabled prop
        />
      </div>
    </div>
  );
};

export default ChatInput;