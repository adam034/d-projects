import { readFile, writeFile } from 'fs/promises';
import { ROOT_PATH } from './convert';
import * as path from 'node:path';

export async function authUser(
  userId: number
): Promise<{ id: number; role: string }[]> {
  const readData = path.join(ROOT_PATH, '/assets/users.json');
  const users: { id: number; role: string }[] = JSON.parse(
    await readFile(readData, 'utf-8')
  ).users;
  const allowedUsers = users.filter((u) => u.id === userId);
  return allowedUsers;
}
export async function registerUser(userId: number): Promise<boolean> {
  const readData = path.join(ROOT_PATH, '/assets/users.json');
  const users: { id: number; role: string }[] = JSON.parse(
    await readFile(readData, 'utf-8')
  ).users;
  const checkUserExist = users.some((s) => s.id === userId);

  if (checkUserExist) return false;
  users.push({
    id: userId,
    role: 'guest',
  });
  await writeFile(readData, JSON.stringify({ users: users }));
  return true;
}
