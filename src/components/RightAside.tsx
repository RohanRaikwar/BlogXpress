"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  User,
} from "@nextui-org/react";
import React from "react";
import Icon from "./Icon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TSavedPost } from "@/lib/types";
import Link from "next/link";
import { useAppSelector } from "@/hooks/reduxHooks";

const RightAside = () => {
  const { authStatus } = useAppSelector((state) => state.auth);

  const { data } = useQuery(["posts", "saved"], {
    queryFn: async (): Promise<TSavedPost[]> => {
      const { data } = await axios.get("/api/posts/saved");
      return data;
    },
  });

  return (
    <aside className=" max-lg:hidden">
      {!authStatus ? (
        <div>
          <Card shadow="none" radius="sm" className="border">
            <CardHeader className="text-2xl font-bold">
              BlogXpress: Share Your Thoughts Instantly
            </CardHeader>
            <CardBody>
              Welcome to BlogXpress, a space where you can upload and express
              your latest ideas, insights, and thoughts freely.
            </CardBody>
            <CardFooter className="flex-col gap-4">
              <Button
                as={Link}
                href="/signup"
                variant="ghost"
                color="primary"
                radius="sm"
                fullWidth
              >
                Join Now
              </Button>
              <Button
                as={Link}
                href="/signin"
                variant="light"
                radius="sm"
                fullWidth
              >
                Log In
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div>
          <h4 className="text-xl font-medium pb-4 pt-1">My Reading List</h4>
          <div>
            {data &&
              data.length > 0 &&
              data.map((saved) => (
                <Card
                  key={saved.id}
                  radius="sm"
                  shadow="none"
                  className="border mb-2 p-2"
                >
                  <CardBody className="p-2">
                    <div className="flex">
                      <Link
                        className="font-semibold break-all hover:text-primary-600"
                        href={`/${saved.post.author.username}/${saved.post.path}`}
                      >
                        {saved.post.title}
                      </Link>
                    </div>
                  </CardBody>
                  <CardFooter className="p-2 flex justify-between">
                    <User
                      name={saved.post.author.name}
                      description={"@" + saved.post.author.username}
                      avatarProps={{
                        src: saved.post.author.avatar,
                      }}
                      as={Link}
                      href={`/${saved.post.author.username}`}
                    />
                    <div>
                      <Button isIconOnly variant="light">
                        <Icon name="bookmark" strokeWidth={1.25} fill="black" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      )}

      <Card shadow="none" className="pt-4">
        <CardHeader>
          BlogXpress: A Dynamic Platform for Your Thoughts
        </CardHeader>
        <CardBody>
          Empowering creators and innovators to share tech insights and ideas
          through a seamless and modern platform.
        </CardBody>
        <CardFooter>Made with passion. BlogXpress © 2025.</CardFooter>
      </Card>
    </aside>
  );
};

export default RightAside;
