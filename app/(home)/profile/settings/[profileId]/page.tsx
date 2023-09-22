"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/file-upload";

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

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { profileId } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [mounted, setMounted] = useState(false);

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
      await axios.patch(`/api/profile/${profileId}`, values);
      toast.success("Profile updated successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${profileId}`);

        form.reset({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          description: data.description,
          profileImage: data.profileImage,
        });

        setImageUrl(data.profileImage);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 container mt-10 max-w-2xl"
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

        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please upload your profile picture</FormLabel>
              <FormControl>
                <div className="flex gap-4">
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

                  <FileUpload
                    endpoint="imageUploader"
                    onChange={(url) => {
                      if (url) {
                        form.setValue("profileImage", url);
                        setImageUrl(url);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
