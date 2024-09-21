import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      { id: 3, title: "Croatian", imageSrc: "/hr.svg" },
      { id: 2, title: "French", imageSrc: "/fr.svg" },
      { id: 1, title: "Spanish", imageSrc: "/es.svg" },
      { id: 4, title: "Italian", imageSrc: "/it.svg" },
      { id: 5, title: "United Kingdom", imageSrc: "/uk.svg" },
    ]);

    await db.insert(schema.units).values([
      {
        id: 5,
        courseId: 5,
        title: "Unit 1",
        description: "Learn the basic of English",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 6,
        unitId: 5, // Unit 1 learn the basic of English
        order: 1,
        title: "Nouns",
      },
      {
        id: 7,
        unitId: 5, // Unit 1 learn the basic of English
        order: 2,
        title: "Verbs",
      },
      {
        id: 8,
        unitId: 5, // Unit 1 learn the basic of English
        order: 3,
        title: "Verbs",
      },
      {
        id: 9,
        unitId: 5, // Unit 1 learn the basic of English
        order: 4,
        title: "Verbs",
      },
      {
        id: 10,
        unitId: 5, // Unit 1 learn the basic of English
        order: 5,
        title: "Verbs",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 6,
        lessonId: 6,
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the man"?',
      },
      {
        id: 7,
        lessonId: 6,
        type: "ASSIST",
        order: 2,
        question: '"The man"',
      },
      {
        id: 8,
        lessonId: 6,
        type: "ASSIST",
        order: 3,
        question: 'Which one of these is the "the robot"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 4,
        challengeId: 6,
        imageSrc: "/man.jfif",
        correct: true,
        text: "Man",
        audioSrc: "/uk_man.mp3",
      },
      {
        id: 5,
        challengeId: 6,
        imageSrc: "/woman.jfif",
        correct: false,
        text: "Woman",
        audioSrc: "/uk_woman.mp3",
      },
      {
        id: 6,
        challengeId: 6,
        imageSrc: "/robot.jfif",
        correct: false,
        text: "Robot",
        audioSrc: "/uk_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 7,
        challengeId: 7,
        imageSrc: "",
        correct: false,
        text: "Man",
        audioSrc: "/uk_man.mp3",
      },
      {
        id: 8,
        challengeId: 7,
        imageSrc: "",
        correct: true,
        text: "Woman",
        audioSrc: "/uk_woman.mp3",
      },
      {
        id: 9,
        challengeId: 7,
        imageSrc: "",
        correct: false,
        text: "Robot",
        audioSrc: "/uk_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 10,
        challengeId: 8,
        imageSrc: "/man.jfif",
        correct: false,
        text: "Man",
        audioSrc: "/uk_man.mp3",
      },
      {
        id: 11,
        challengeId: 8,
        imageSrc: "/woman.jfif",
        correct: false,
        text: "Woman",
        audioSrc: "/uk_woman.mp3",
      },
      {
        id: 12,
        challengeId: 8,
        imageSrc: "/robot.jfif",
        correct: true,
        text: "Robot",
        audioSrc: "/uk_robot.mp3",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
