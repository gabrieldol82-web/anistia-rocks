import { DatabaseMembers } from "./database-members.js";
import fs from "fs";

const db = JSON.parse(fs.readFileSync("../db.json", "utf-8"));
const databaseMembers = new DatabaseMembers();

async function seed() {
  for (const member of db.members) {
    const key = member.name.split(" ")[0].toLowerCase(); 
    const details = db[key];

    await databaseMembers.create({
      name: member.name,
      role: member.role,
      image: member.image,
      member_since: details?.memberSince || null,
      bio: details?.bio || null,
      albums: details?.albums || [],
      artists: details?.artists || [],
      favorite_to_play: details?.favoriteToPlay || null
    });
  }

  console.log("✅ Seed dos members concluído!");
  process.exit();
}

seed();
