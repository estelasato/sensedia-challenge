"use server";

import { updateTag } from "next/cache";

import {
  createUser,
  deleteUser,
  type CreateUserRequest,
} from "./userService";

export async function deleteUserAction(id: string) {
  await deleteUser(id);
  updateTag("users");
}

export async function createUserAction(payload: CreateUserRequest) {
  await createUser(payload);
  updateTag("users");
}
