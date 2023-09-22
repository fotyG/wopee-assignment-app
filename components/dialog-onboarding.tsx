"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "./ui/form";

import { Textarea } from "./ui/textarea";
import { FileUpload } from "./file-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Name is required" }).max(50),
  lastName: z.string().min(2, { message: "Surname is required" }).max(50),
  email: z
    .string()
    .email({ message: "E-mail is required and should be valid" }),
  description: z
    .string()
    .min(2, { message: "Description is required" })
    .max(1500),
  profileImage: z.string().url({ message: "Profile image is required" }),
});

export function DialogOnboarding() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      description: "",
      profileImage: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post("/api/profile", values);
      toast.success("Profile created successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete onboarding!</DialogTitle>
          <DialogDescription>
            Please make sure to complete your profile to continue!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Wick"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="love@dogs.lv"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tell us, why you are the best?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="First of all, I have really big muscles..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!imageUrl && (
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please upload your profile picture</FormLabel>
                    <FormControl>
                      <FileUpload
                        endpoint="imageUploader"
                        onChange={(url) => {
                          if (url) {
                            form.setValue("profileImage", url);
                            setImageUrl(url);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {imageUrl && (
              <div className="flex items-center justify-center">
                <Image
                  width={200}
                  height={200}
                  alt="profile pic"
                  src={imageUrl}
                  className="object-contain rounded-xl border border-slate-500 p-2 overflow-hidden mt-2"
                />
              </div>
            )}

            <DialogFooter>
              <Button
                type="submit"
                className="mt-2"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
